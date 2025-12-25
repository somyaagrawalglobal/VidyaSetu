import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Missing token' }, { status: 400 });
        }

        await dbConnect();

        // Find user with this token and ensure it's not expired
        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired verification token' },
                { status: 400 }
            );
        }

        // Verify User
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        // Redirect to login with success message (or handle via UI page calls)
        // Since this is an API route often hit by "link click", it's better to redirect 
        // to a UI page that calls this API OR this API just returns JSON and the UI page calls it.
        // The plan said: GET /api/auth/verify-email
        // And page /verify-email?token=...
        // So usually the Page calls the API.

        return NextResponse.json(
            { message: 'Email verified successfully. You can now login.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Check Token Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
