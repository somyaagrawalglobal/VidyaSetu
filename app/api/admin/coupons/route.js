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
        const coupons = await Coupon.find().sort({ createdAt: -1 });

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

        await dbConnect();
        await Coupon.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: 'Coupon deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
