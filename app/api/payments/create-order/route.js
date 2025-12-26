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

        const { courseId } = await request.json();
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

        // If course is free, create completed order immediately
        if (course.price === 0) {
            const order = await Order.create({
                user: user._id,
                course: course._id,
                amount: 0,
                currency: "INR",
                status: 'completed',
                razorpayOrderId: 'FREE_ENROLLMENT'
            });
            return NextResponse.json({ success: true, message: 'Enrolled successfully', isFree: true });
        }

        const options = {
            amount: course.price * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${randomUUID()}`,
            notes: {
                courseId: course._id.toString(),
                userId: user._id.toString()
            }
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Save initial order in DB with status pending
        const order = await Order.create({
            user: user._id,
            course: course._id,
            razorpayOrderId: razorpayOrder.id,
            amount: course.price,
            currency: "INR",
            status: 'pending'
        });

        return NextResponse.json({ success: true, order: razorpayOrder, dbOrderId: order._id, isFree: false });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
