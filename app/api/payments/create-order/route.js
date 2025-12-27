import { NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';
import { randomUUID } from 'crypto';

export async function POST(request) {
    try {
        const user = await authenticateApi(request);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { courseId, couponCode, userDetails } = await request.json();
        if (!courseId) {
            return NextResponse.json({ success: false, message: 'Course ID is required' }, { status: 400 });
        }

        await dbConnect();
        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        // Check if already enrolled
        const existingOrder = await Order.findOne({ user: user._id, course: courseId, status: 'completed' });
        if (existingOrder) {
            return NextResponse.json({ success: false, message: 'Already enrolled' }, { status: 400 });
        }

        let finalAmount = course.price;
        let discountAmount = 0;
        let appliedCoupon = null;

        if (couponCode) {
            const Coupon = (await import('@/models/Coupon')).default;
            appliedCoupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });

            if (appliedCoupon && new Date() <= appliedCoupon.expiryDate && appliedCoupon.currentUses < appliedCoupon.maxUses) {
                if (appliedCoupon.discountType === 'percentage') {
                    discountAmount = (course.price * appliedCoupon.discountValue) / 100;
                } else {
                    discountAmount = appliedCoupon.discountValue;
                }
                discountAmount = Math.min(discountAmount, course.price);
                finalAmount = course.price - discountAmount;
            }
        }

        // If course is free or becomes free after coupon, create completed order immediately
        if (finalAmount <= 0) {
            const order = await Order.create({
                user: user._id,
                course: course._id,
                amount: 0,
                discountAmount: course.price,
                actualAmount: course.price,
                currency: "INR",
                status: 'completed',
                razorpayOrderId: 'FREE_OR_COUPON_ENROLLMENT',
                couponCode: appliedCoupon?.code || null,
                userDetails: userDetails || null
            });

            if (appliedCoupon) {
                appliedCoupon.currentUses += 1;
                await appliedCoupon.save();
            }

            return NextResponse.json({ success: true, message: 'Enrolled successfully', isFree: true });
        }

        const options = {
            amount: Math.round(finalAmount * 100), // Amount in paise
            currency: "INR",
            receipt: `rcpt_${randomUUID().slice(0, 18)}`,
            notes: {
                courseId: course._id.toString(),
                userId: user._id.toString(),
                couponCode: appliedCoupon?.code || ""
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save initial order in DB with status pending
        const order = await Order.create({
            user: user._id,
            course: course._id,
            razorpayOrderId: razorpayOrder.id,
            amount: finalAmount,
            actualAmount: course.price,
            discountAmount: discountAmount,
            currency: "INR",
            status: 'pending',
            couponCode: appliedCoupon?.code || null,
            userDetails: userDetails || null
        });

        // Send pending email notification
        try {
            if (user && user.email) {
                const { sendPurchaseEmail } = await import('@/lib/email');
                await sendPurchaseEmail({
                    to: user.email,
                    userName: `${user.firstName} ${user.lastName}`,
                    courseName: course.title,
                    coursePrice: finalAmount,
                    orderId: razorpayOrder.id,
                    status: 'pending'
                });
            }
        } catch (emailError) {
            console.error('Failed to send pending purchase email:', emailError);
        }

        if (appliedCoupon) {
            appliedCoupon.currentUses += 1;
            await appliedCoupon.save();
        }

        return NextResponse.json({ success: true, order: razorpayOrder, dbOrderId: order._id, isFree: false });
    } catch (error) {
        console.error('RAZORPAY ORDER CREATION ERROR:', error);
        return NextResponse.json({ success: false, message: error.message, error: error }, { status: 500 });
    }
}
