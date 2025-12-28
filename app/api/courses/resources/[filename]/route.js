
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import dbConnect from '@/lib/db';
import Lesson from '@/models/Lesson';
import Order from '@/models/Order';
import { authenticateApi } from '@/lib/api-auth';

/**
 * API Route to serve secured course resources.
 * Method: GET
 * URL: /api/courses/resources/[filename]
 */
export async function GET(request, { params }) {
    try {
        const { filename } = await params;
        const user = await authenticateApi(request);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // 1. Find the lesson containing this resource
        // We search for resources that have the URL we're currently requesting
        const resourceUrl = `/api/courses/resources/${filename}`;
        const legacyResourceUrl = `/uploads/courses/resources/${filename}`;

        const lesson = await Lesson.findOne({
            $or: [
                { 'resources.url': resourceUrl },
                { 'resources.url': legacyResourceUrl }
            ]
        });

        if (!lesson) {
            // Check if user is Admin, maybe it's a floating file or legacy
            if (!user.roles.includes('Admin')) {
                return NextResponse.json({ success: false, message: 'Resource not found or access denied' }, { status: 404 });
            }
        }

        // 2. Authorization Check
        const isAdmin = user.roles.includes('Admin');
        let isAuthorized = isAdmin;

        if (!isAuthorized && lesson) {
            // Check if user is the instructor of the course
            // (Note: Lesson model doesn't have instructor, we'd need to populate course)
            const courseId = lesson.course;

            // Check enrollment
            const enrollment = await Order.findOne({
                user: user._id,
                course: courseId,
                status: 'completed',
                accessStatus: { $ne: 'blocked' }
            });

            if (enrollment) {
                isAuthorized = true;
            } else {
                // Check if instructor (requires fetching course)
                const Course = (await import('@/models/Course')).default;
                const course = await Course.findById(courseId);
                if (course && course.instructor.toString() === user._id.toString()) {
                    isAuthorized = true;
                }
            }
        }

        if (!isAuthorized) {
            return NextResponse.json({ success: false, message: 'Access Denied: You are not enrolled in this course' }, { status: 403 });
        }

        // 3. Serve the file
        const filePath = path.join(process.cwd(), 'uploads/courses/resources', filename);

        if (!existsSync(filePath)) {
            // Check public as fallback for legacy files (optional, but good for transition)
            const publicPath = path.join(process.cwd(), 'public/uploads/courses/resources', filename);
            if (existsSync(publicPath)) {
                const fileBuffer = await readFile(publicPath);
                return new NextResponse(fileBuffer, {
                    headers: {
                        'Content-Type': getContentType(filename),
                        'Content-Disposition': 'inline',
                    },
                });
            }
            return NextResponse.json({ success: false, message: 'File not found on server' }, { status: 404 });
        }

        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': getContentType(filename),
                'Content-Disposition': 'inline',
            },
        });

    } catch (error) {
        console.error('[RESOURCE_SERVE_ERROR]', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const map = {
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.txt': 'text/plain',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.ppt': 'application/vnd.ms-powerpoint',
        '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    };
    return map[ext] || 'application/octet-stream';
}
