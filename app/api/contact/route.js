import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        // Basic validation
        const { fullName, email, phoneNumber, subject, message } = body;
        if (!fullName || !email || !phoneNumber || !subject || !message) {
            return NextResponse.json({
                success: false,
                message: 'All required fields must be provided',
            }, { status: 400 });
        }

        const inquiry = await Inquiry.create(body);

        return NextResponse.json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: inquiry,
        }, { status: 201 });
    } catch (error) {
        console.error('Inquiry Submission Error:', error);
        return NextResponse.json({
            success: false,
            message: error.message || 'Something went wrong while submitting your inquiry',
        }, { status: 500 });
    }
}
