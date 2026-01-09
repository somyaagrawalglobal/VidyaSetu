import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(req, { params }) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();
        const order = await Order.findById(id)
            .populate('user', 'firstName lastName email mobileNumber headline bio createdOn')
            .populate('course', 'title price slug thumbnail description');

        if (!order) {
            return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const updates = await req.json();
        await dbConnect();

        const order = await Order.findByIdAndUpdate(id, updates, { new: true });

        if (!order) {
            return NextResponse.json({ success: false, message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, order, message: 'Transaction updated successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
