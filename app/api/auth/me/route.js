import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Verify Token
        const { payload } = await jwtVerify(token, secret);

        // Optional: Fetch fresh user data from DB to ensure they aren't banned/deleted since token issue
        await dbConnect();
        const user = await User.findById(payload.userId).select('-passwordHash');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 401 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });

    } catch (error) {
        console.error('Me Error:', error);
        return NextResponse.json(
            { message: 'Invalid Token' },
            { status: 401 }
        );
    }
}
