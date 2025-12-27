import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { authenticateApi } from '@/lib/api-auth';

// Helper to check for Admin role
async function checkAdmin(request) {
    const user = await authenticateApi(request);
    if (!user || !user.roles.includes('Admin')) return null;
    return user;
}

export async function GET(request) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        await dbConnect();
        const users = await User.find({}).select('-passwordHash -activeToken').sort({ createdOn: -1 });

        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        const body = await request.json();
        const { userId, ...updates } = body;

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-passwordHash');

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
