import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { authenticateApi } from '@/lib/api-auth';

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
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: 'completed',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                },
                { new: true }
            );

            // Here you might also update User.enrolledCourses if you keep denormalized data
            // For now, we rely on checking Orders for enrollment status (common pattern to avoid sync issues)

            return NextResponse.json({ success: true, message: "Payment Verified", orderId: order._id });
        } else {
            return NextResponse.json({ success: false, message: "Invalid Signature" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
