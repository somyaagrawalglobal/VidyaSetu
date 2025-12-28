import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';
import { authenticateApi } from '@/lib/api-auth';

// Helper to check for Admin role
async function checkAdmin(request) {
    const user = await authenticateApi(request);
    if (!user || !user.roles.includes('Admin')) return null;
    return user;
}

export async function GET(request, { params }) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        await dbConnect();
        const { id } = await params;

        const coupon = await Coupon.findById(id).populate('applicableCourses', 'title').populate('applicableUsers', 'email');
        if (!coupon) {
            return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, coupon });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const existingCoupon = await Coupon.findById(id);
        if (!existingCoupon) {
            return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 });
        }

        if (existingCoupon.currentUses > 0) {
            // Strict Validation: Allow only Status, Expiry, MaxUses changes
            // Block Code, Discount, Scope changes
            const forbiddenKeys = ['code', 'discountType', 'discountValue', 'applicableCourses', 'applicableUsers'];
            const hasForbiddenUpdates = forbiddenKeys.some(key => {
                // Check if key is in body and different from existing
                // Simple equality check for primitives, json check for arrays
                if (key in body) {
                    if (Array.isArray(body[key])) {
                        return JSON.stringify(body[key].sort()) !== JSON.stringify(existingCoupon[key].map(i => i.toString()).sort());
                    }
                    return body[key] !== existingCoupon[key];
                }
                return false;
            });

            if (hasForbiddenUpdates) {
                return NextResponse.json({ success: false, message: 'Cannot edit core details of a used coupon. You can only update Status or Expiry.' }, { status: 400 });
            }
        }

        const updatedCoupon = await Coupon.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!updatedCoupon) {
            return NextResponse.json({ success: false, message: 'Coupon not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, coupon: updatedCoupon });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
