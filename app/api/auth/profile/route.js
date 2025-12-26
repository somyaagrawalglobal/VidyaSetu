import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { validateSession } from '@/lib/session';
import { z } from 'zod';

const updateProfileSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    mobileNumber: z.string().min(10, 'Mobile Number is required'),
});

export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const userId = payload.userId;

        // Single Device Check
        const isValidSession = await validateSession(userId, token);
        if (!isValidSession) {
            return NextResponse.json({ message: 'Session expired' }, { status: 401 });
        }

        const body = await req.json();
        const result = updateProfileSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { message: 'Validation failed', errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { firstName, lastName, mobileNumber } = result.data;

        await dbConnect();

        // Update User
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, mobileNumber },
            { new: true, runValidators: true }
        ).select('-passwordHash -activeToken');

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(
            { message: 'Profile updated successfully', user: updatedUser },
            { status: 200 }
        );

    } catch (error) {
        console.error('Profile Update Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
