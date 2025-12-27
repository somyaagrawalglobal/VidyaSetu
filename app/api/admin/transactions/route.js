import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
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

        const { orderId, action } = await req.json();
        await dbConnect();

        if (action === 'refund') {
            // Logic for triggering Razorpay Refund would go here
            // For now, we update the status locally
            const order = await Order.findById(orderId)
                .populate('user', 'firstName lastName email')
                .populate('course', 'title price');

            if (!order) return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });

            order.status = 'refunded';
            order.refundStatus = 'completed';
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
                        status: 'refunded'
                    });
                }
            } catch (emailError) {
                console.error('Failed to send refund email:', emailError);
                // Don't fail the refund if email fails
            }

            return NextResponse.json({ success: true, message: 'Refund processed successfully' });
        }

        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
