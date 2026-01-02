import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UploadSession from '@/models/UploadSession';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';
import { initResumableUpload } from '@/lib/youtube';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const user = await authenticateApi(request);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { courseId, title, fileSize, mimeType, fileName } = body;

        if (!title || !fileSize) {
            return NextResponse.json({ success: false, message: 'Missing required fields (title, fileSize)' }, { status: 400 });
        }

        await dbConnect();

        // Verify course ownership if Instructor (and if course exists)
        if (courseId && user.roles.includes('Instructor') && !user.roles.includes('Admin')) {
            const course = await Course.findById(courseId);
            if (!course || course.instructor.toString() !== user._id.toString()) {
                return NextResponse.json({ success: false, message: 'Forbidden: You do not own this course' }, { status: 403 });
            }
        }

        // Initialize YT Session
        const youtubeUploadUrl = await initResumableUpload({
            title,
            fileSize,
            mimeType,
            description: `Course Video for ${courseId}`
        });

        const uploadSessionId = crypto.randomUUID();

        const session = await UploadSession.create({
            uploadSessionId,
            courseId,
            userId: user._id,
            youtubeUploadUrl,
            fileSize,
            fileName,
            mimeType,
            status: 'pending'
        });

        return NextResponse.json({
            success: true,
            uploadSessionId,
            uploadedBytes: 0,
            chunkSize: 3145728 // 3MB (Safe for Vercel 4.5MB limit)
        });

    } catch (error) {
        console.error('Upload Init Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
