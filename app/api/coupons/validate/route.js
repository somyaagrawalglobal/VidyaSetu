import { authenticateApi } from '@/lib/api-auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function POST(req) {
    try {
        await dbConnect();
        const { code, amount, courseId } = await req.json();

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

        // 1. Verify Course Applicability
        if (coupon.applicableCourses && coupon.applicableCourses.length > 0) {
            if (!courseId || !coupon.applicableCourses.map(id => id.toString()).includes(courseId)) {
                return NextResponse.json({ success: false, message: 'This coupon is not valid for this course.' }, { status: 400 });
            }
        }

        // 2. Verify User Applicability
        if (coupon.applicableUsers && coupon.applicableUsers.length > 0) {
            const user = await authenticateApi(req);
            if (!user) {
                return NextResponse.json({ success: false, message: 'Please login to use this exclusive coupon.' }, { status: 401 });
            }
            if (!coupon.applicableUsers.map(id => id.toString()).includes(user._id.toString())) {
                return NextResponse.json({ success: false, message: 'This coupon is not valid for your account.' }, { status: 403 });
            }
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
