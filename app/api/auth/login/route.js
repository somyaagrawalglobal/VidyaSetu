import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { updateUserSession } from '@/lib/session';


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: 'Invalid Input' },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' }, // Generic error for security
                { status: 401 }
            );
        }

        // Check Active/Restricted
        if (!user.isActive) {
            return NextResponse.json(
                { message: 'Your account is inactive. Please contact support.' },
                { status: 403 }
            );
        }
        if (user.isRestricted) {
            return NextResponse.json(
                { message: 'Your account has been restricted.' },
                { status: 403 }
            );
        }

        // Check Email Verification (User requirement: "is verifiled... show message accordingly")
        // Depending on strictness, we might block login or just warn. 
        // Usually, we block login if not verified.
        if (!user.isVerified) {
            return NextResponse.json(
                { message: 'Please verify your email address to login.' },
                { status: 403 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, roles: user.roles },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Enforce Single Device: Update Active Token
        await updateUserSession(user._id, token);

        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        // Set Cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
