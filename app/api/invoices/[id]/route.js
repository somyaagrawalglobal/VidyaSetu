import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(req, { params }) {
    try {
        const user = await authenticateApi(req);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();

        // Find order and populate user/course
        const order = await Order.findById(id)
            .populate('user', 'firstName lastName email mobileNumber')
            .populate('course', 'title price description');

        if (!order) {
            return NextResponse.json({ success: false, message: 'Invoice not found' }, { status: 404 });
        }

        // Security: Only owner or Admin can view the invoice
        const isAdmin = user.roles.includes('Admin');
        const isOwner = order.user._id.toString() === user._id.toString();

        if (!isAdmin && !isOwner) {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        if (order.status !== 'completed' && order.status !== 'refunded') {
            return NextResponse.json({ success: false, message: 'Invoice not available for this transaction status' }, { status: 400 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
