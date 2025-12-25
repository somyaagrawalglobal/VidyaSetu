import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const resetSchema = z.object({
    token: z.string().min(1),
    password: z.string().min(6),
});

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const validation = resetSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: 'Invalid Input' },
                { status: 400 }
            );
        }

        const { token, password } = validation.data;

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired reset token' },
                { status: 400 }
            );
        }

        // Hash new password
        const passwordHash = await bcrypt.hash(password, 10);

        // Update User
        user.passwordHash = passwordHash;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { message: 'Password reset successful. You can now login.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Reset PW Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
