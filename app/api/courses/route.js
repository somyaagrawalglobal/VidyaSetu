import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';
import Order from '@/models/Order';
import { validateSession } from '@/lib/session';

import { authenticateApi } from '@/lib/api-auth';

// Helper to check Auth & Role
async function checkAuth(request, allowedRoles = []) {
    const user = await authenticateApi(request);
    if (!user) return null;

    if (allowedRoles.length > 0) {
        const hasRole = user.roles.some(role => allowedRoles.includes(role));
        if (!hasRole) return null; // Forbidden
    }

    return user;
}

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const publishedOnly = searchParams.get('published') !== 'false';

        const user = await authenticateApi(request);

        let query = publishedOnly ? { published: true } : {};

        // If not publishedOnly, it's likely an admin/instructor list view
        if (!publishedOnly) {
            if (!user) {
                return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
            }

            const isAdmin = user.roles.includes('Admin');
            const isInstructor = user.roles.includes('Instructor');

            if (!isAdmin && isInstructor) {
                // Instructors only see their own courses
                query.instructor = user._id;
            } else if (!isAdmin) {
                // Students or others shouldn't see unpublished courses unless they are instructors
                return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
            }
        }

        const courses = await Course.find(query)
            .populate('instructor', 'firstName lastName headline bio')
            .select('-modules.lessons.videoId')
            .sort({ createdAt: -1 });

        // Transform to plain objects for property assignment
        const coursesWithStatus = courses.map(course => course.toObject());

        // Check enrollments if user is logged in
        if (user) {
            const enrollments = await Order.find({
                user: user._id,
                status: 'completed'
            }).select('course');

            const enrolledCourseIds = new Set(enrollments.map(e => e.course.toString()));

            coursesWithStatus.forEach(course => {
                course.isEnrolled = enrolledCourseIds.has(course._id.toString());
            });
        }

        return NextResponse.json({ success: true, courses: coursesWithStatus });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = await checkAuth(request, ['Admin', 'Instructor']);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized or Forbidden' }, { status: 403 });
        }

        const body = await request.json();

        // Auto-generate slug if not provided/ensure unique
        if (!body.slug) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const course = await Course.create({
            ...body,
            instructor: user._id,
        });

        return NextResponse.json({ success: true, course }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
