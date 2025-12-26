import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';
import { z } from 'zod';

const forgotInfoSchema = z.object({
    email: z.string().email(),
});

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const validation = forgotInfoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: 'Invalid Email' },
                { status: 400 }
            );
        }
        const { email } = validation.data;

        const user = await User.findOne({ email });
        if (!user) {
            // Security: Don't reveal if user exists
            return NextResponse.json(
                { message: 'If an account exists with this email, a reset link has been sent.' },
                { status: 200 }
            );
        }

        // Generate Token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        user.forgotPasswordToken = resetToken;
        user.forgotPasswordTokenExpiry = resetTokenExpiry;
        await user.save();

        // Send Email
        try {
            await sendPasswordResetEmail(email, resetToken);
        } catch (error) {
            console.error('Email send failed:', error);
            return NextResponse.json(
                { message: 'Failed to send email' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'If an account exists with this email, a reset link has been sent.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Forgot PW Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
