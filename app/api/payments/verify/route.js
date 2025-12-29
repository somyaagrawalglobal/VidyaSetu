import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';
import { sendPurchaseEmail } from '@/lib/email';
import Counter from '@/models/Counter';

export async function POST(request) {
    try {
        const user = await authenticateApi(request);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Payment Successful
            await dbConnect();

            // Generate Invoice Number Atomically
            const year = new Date().getFullYear();
            const counter = await Counter.findOneAndUpdate(
                { id: `invoice_${year}` },
                { $inc: { seq: 1 } },
                { upsert: true, new: true }
            );

            const invoiceNumber = `VS-${year}-${counter.seq.toString().padStart(4, '0')}`;
            const invoiceDate = new Date();

            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: 'completed',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    invoiceNumber,
                    invoiceDate
                },
                { new: true }
            ).populate('course', 'title slug price');

            // Send success email notification
            try {
                if (user && user.email && order?.course) {
                    await sendPurchaseEmail({
                        to: user.email,
                        userName: `${user.firstName} ${user.lastName}`,
                        courseName: order.course.title,
                        coursePrice: order.amount,
                        orderId: order.razorpayOrderId,
                        status: 'completed',
                        courseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${order.course.slug}/watch`
                    });
                }
            } catch (emailError) {
                console.error('Failed to send purchase email:', emailError);
                // Don't fail the payment verification if email fails
            }

            return NextResponse.json({ success: true, message: "Payment Verified", orderId: order._id });
        } else {
            // Payment verification failed - send failed email
            await dbConnect();
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: 'failed' },
                { new: true }
            ).populate('course', 'title price');

            if (order) {
                try {
                    if (user && user.email && order?.course) {
                        await sendPurchaseEmail({
                            to: user.email,
                            userName: `${user.firstName} ${user.lastName}`,
                            courseName: order.course.title,
                            coursePrice: order.amount,
                            orderId: order.razorpayOrderId,
                            status: 'failed'
                        });
                    }
                } catch (emailError) {
                    console.error('Failed to send failed payment email:', emailError);
                }
            }

            console.error('RAZORPAY VERIFICATION FAILED: Invalid Signature', {
                razorpay_order_id,
                razorpay_payment_id
            });
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
        }
    } catch (error) {
        console.error('PAYMENT VERIFICATION SYSTEM ERROR:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
