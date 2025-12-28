import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function POST(req) {
    try {
        await dbConnect();
        const { code, amount } = await req.json();

        if (!code) {
            return NextResponse.json({ success: false, message: 'Coupon code is required' }, { status: 400 });
        }

        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return NextResponse.json({ success: false, message: 'Invalid coupon code' }, { status: 404 });
        }

        if (new Date() > coupon.expiryDate) {
            return NextResponse.json({ success: false, message: 'Coupon has expired' }, { status: 400 });
        }

        if (coupon.currentUses >= coupon.maxUses) {
            return NextResponse.json({ success: false, message: 'Coupon usage limit reached' }, { status: 400 });
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = (amount * coupon.discountValue) / 100;
        } else {
            discount = coupon.discountValue;
        }

        // Ensure discount doesn't exceed amount
        discount = Math.min(discount, amount);

        return NextResponse.json({
            success: true,
            discount,
            finalAmount: amount - discount,
            code: coupon.code,
        });

    } catch (error) {
        console.error('Coupon Validation Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
