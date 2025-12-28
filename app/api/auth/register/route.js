import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Role from '@/models/Role';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';
import { z } from 'zod';



const registerSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email address'),
    mobileNumber: z.string().min(10, 'Valid mobile number is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['Student', 'Instructor']).default('Student'),
});

export async function POST(req) {
    try {
        await dbConnect();


        // 2. Default Admin Creation logic: 
        // Handled by instrumentation hook on startup.

        // Let's stick to just registering the CURRENT user for now. 
        // BUT, I will add a separate check to see if the table is empty, if so, make the FIRST user an Admin? 
        // User said: "admin can not be registred". So I should NOT allow registering as admin via this API.
        // I will use a separate seed script or just assume admin is created manually/via seed. 
        // However, I'll add a check: If email is "admin@vidyasetu.com" (example), maybe block it?
        // For now, standard registration = Student.

        const body = await req.json();

        // 3. Validation
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: 'Validation Error', errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { firstName, lastName, email, mobileNumber, password, role } = validation.data;

        // 4. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // 5. Hash Password
        const passwordHash = await bcrypt.hash(password, 10);

        // 6. Generate Verification Token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // 7. Create User
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            mobileNumber,
            passwordHash,
            roles: [role], // Use selected role
            verificationToken,
            verificationTokenExpiry,
            isVerified: false,
            isActive: true,
        });

        // 8. Send Verification Email
        try {
            await sendVerificationEmail(email, verificationToken);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            // We still return success for registration, but maybe warn?
        }

        return NextResponse.json(
            { message: 'Registration successful. Please check your email to verify your account.' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
