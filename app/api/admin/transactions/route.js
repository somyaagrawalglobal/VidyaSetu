import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import razorpay from '@/lib/razorpay';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';
import { sendPurchaseEmail } from '@/lib/email';

export async function GET(req) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const orders = await Order.find()
            .populate('user', 'firstName lastName email')
            .populate('course', 'title price')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { orderId, action, refundMethod, refundNote } = await req.json();
        await dbConnect();

        if (action === 'refund') {
            const order = await Order.findById(orderId)
                .populate('user', 'firstName lastName email')
                .populate('course', 'title price');

            if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

            if (refundMethod === 'razorpay') {
                if (!order.razorpayPaymentId) {
                    return NextResponse.json({ success: false, message: 'No Razorpay payment ID found for this order' }, { status: 400 });
                }

                try {
                    const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
                        amount: Math.round(order.amount * 100), // Full refund in paise
                        notes: {
                            reason: refundNote || "Admin initiated refund",
                            orderId: order._id.toString(),
                            razorpayOrderId: order.razorpayOrderId
                        }
                    });

                    order.razorpayRefundId = refund.id;
                    order.refundMethod = 'razorpay';
                } catch (rzpError) {
                    console.error('Razorpay Refund Error Detail:', rzpError);

                    // Extract the most helpful error message
                    const errorMessage = rzpError.description || rzpError.message || rzpError.error?.description || 'Razorpay refund failed';

                    return NextResponse.json({
                        success: false,
                        message: errorMessage
                    }, { status: 500 });
                }
            } else if (refundMethod === 'manual') {
                order.refundMethod = 'manual';
            } else {
                return NextResponse.json({ success: false, message: 'Invalid refund method' }, { status: 400 });
            }

            order.status = 'refunded';
            order.refundStatus = 'completed';
            order.refundNote = refundNote || "";
            await order.save();

            // Send refund email notification
            try {
                if (order.user && order.course) {
                    await sendPurchaseEmail({
                        to: order.user.email,
                        userName: `${order.user.firstName} ${order.user.lastName}`,
                        courseName: order.course.title,
                        coursePrice: order.amount,
                        orderId: order.razorpayOrderId,
                        status: 'refunded',
                        refundMethod: order.refundMethod
                    });
                }
            } catch (emailError) {
                console.error('Failed to send refund email:', emailError);
            }

            return NextResponse.json({ success: true, message: `Refund processed successfully via ${order.refundMethod}` });
        }

        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
