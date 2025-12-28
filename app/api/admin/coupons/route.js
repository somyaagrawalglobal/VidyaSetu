import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(req) {
    try {
        const user = await authenticateApi(req);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        // Filter out soft-deleted coupons
        const coupons = await Coupon.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, coupons });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Only admins can create coupons' }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        const coupon = await Coupon.create(data);

        return NextResponse.json({ success: true, coupon });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const user = await authenticateApi(req);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Coupon ID is required' }, { status: 400 });
        }

        await dbConnect();

        // Soft delete - set isDeleted flag and timestamp instead of removing
        const coupon = await Coupon.findByIdAndUpdate(
            id,
            { isDeleted: true, deletedAt: new Date(), isActive: false },
            { new: true }
        );

        if (!coupon) {
            return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
