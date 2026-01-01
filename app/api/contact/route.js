import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
    try {
        const { fullName, email, topic, message } = await req.json();

        // ✅ Strong Validation
        if (!fullName || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Required fields missing.' },
                { status: 400 }
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format.' },
                { status: 400 }
            );
        }

        // ✅ Connect DB
        await connectDB();

        // ✅ Save Contact
        const newContact = await Contact.create({
            fullName,
            email,
            topic,
            message
        });

        // ✅ Mail Transport (App Password)
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Admin Email
        const adminMail = transporter.sendMail({
            from: `"VidyaSetu Contact" <${process.env.EMAIL_USER}>`,
            to: 'info@vidya-setu.com',
            subject: `New Inquiry: ${topic || 'General'} | ${fullName}`,
            html: `
                <h2>New Contact Request</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Topic:</strong> ${topic}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr/>
                <small>ID: ${newContact._id}</small>
            `,
        });

        // User Email
        const userMail = transporter.sendMail({
            from: `"VidyaSetu Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'We received your inquiry',
            html: `
                <p>Hello <strong>${fullName}</strong>,</p>
                <p>Thanks for contacting VidyaSetu. Our team will respond shortly.</p>
                <p><strong>Topic:</strong> ${topic}</p>
                <br/>
                <p>— VidyaSetu Team</p>
            `,
        });

        // ✅ Email failure won’t break API
        Promise.allSettled([adminMail, userMail]);

        return NextResponse.json(
            { success: true, message: 'Message submitted successfully.' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}
