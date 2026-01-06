import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { validateSession } from '@/lib/session';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { del } from '@vercel/blob';

const deleteOldFile = async (fileUrl) => {
    if (!fileUrl) return;

    try {
        if (fileUrl.startsWith('http') && fileUrl.includes('public.blob.vercel-storage.com')) {
            // Delete from Vercel Blob
            await del(fileUrl);
        } else if (fileUrl.startsWith('/uploads/')) {
            // Delete from Local Storage
            const filePath = path.join(process.cwd(), 'public', fileUrl);
            await fs.unlink(filePath).catch(err => {
                if (err.code !== 'ENOENT') console.error('Failed to delete local file:', err);
            });
        }
    } catch (err) {
        console.error('Error deleting file:', err);
    }
};

const payoutDetailsSchema = z.object({
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    accountHolderName: z.string().optional(),
    ifscCode: z.string().optional(),
    upiId: z.string().optional(),
}).optional();

const updateProfileSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    mobileNumber: z.string().min(10, 'Mobile Number is required'),
    headline: z.string().optional(),
    bio: z.string().optional(),
    payoutDetails: payoutDetailsSchema,
    experience: z.string().optional().nullable(),
    currentRole: z.string().optional().nullable(),
    resume: z.string().optional().nullable(),
    verificationId: z.string().optional().nullable(),
    companyName: z.string().optional().nullable(),
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

        const {
            firstName, lastName, mobileNumber, headline, bio, payoutDetails,
            experience, currentRole, resume, verificationId, companyName
        } = result.data;

        await dbConnect();

        // 1. Get current user to check for old files
        const currentUser = await User.findById(userId);
        if (currentUser) {
            // 2. Delete old resume if replaced
            if (resume && currentUser.resume && resume !== currentUser.resume) {
                await deleteOldFile(currentUser.resume);
            }
            // 3. Delete old verification ID if replaced
            if (verificationId && currentUser.verificationId && verificationId !== currentUser.verificationId) {
                await deleteOldFile(currentUser.verificationId);
            }
        }

        // Update User
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                firstName, lastName, mobileNumber, headline, bio, payoutDetails,
                experience, currentRole, resume, verificationId, companyName
            },
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
