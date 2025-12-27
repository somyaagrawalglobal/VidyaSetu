import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';
import Order from '@/models/Order';
import Lesson from '@/models/Lesson';
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
        await dbConnect();
        const user = await checkAuth(request, ['Admin', 'Instructor']);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized or Forbidden' }, { status: 403 });
        }

        const body = await request.json();
        const { modules, ...courseData } = body;

        console.log(`[API POST] Received request for course: ${courseData.title}. Modules: ${modules?.length || 0}`);

        // Auto-generate slug if not provided/ensure unique
        if (!courseData.slug) {
            courseData.slug = courseData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const course = await Course.create({
            ...courseData,
            instructor: user._id,
        });

        // Save lessons if any
        if (modules && modules.length > 0) {
            const lessonsToCreate = [];
            modules.forEach((module, mIndex) => {
                if (!module.lessons) return;
                module.lessons.forEach((lesson, lIndex) => {
                    lessonsToCreate.push({
                        title: lesson.title,
                        description: lesson.description || '',
                        videoId: lesson.videoId || '',
                        duration: lesson.duration || 0,
                        isFree: lesson.isFree === true,
                        resources: (lesson.resources || []).map(r => ({
                            title: r.title,
                            url: r.url,
                            type: r.type || 'External Link'
                        })),
                        course: course._id,
                        moduleTitle: module.title,
                        order: (mIndex * 100) + lIndex
                    });
                });
            });

            if (lessonsToCreate.length > 0) {
                console.log(`[API POST] Creating ${lessonsToCreate.length} lessons.`);
                console.log('[API POST] Sample lesson to save:', JSON.stringify(lessonsToCreate[0], null, 2));
                const savedLessons = await Lesson.insertMany(lessonsToCreate);
                console.log('[API POST] Saved lessons count:', savedLessons.length);
                if (savedLessons[0]) {
                    console.log('[API POST] First saved lesson has description?', !!savedLessons[0].description);
                }
            }
        }

        // Re-fetch full curriculum to return for frontend sync
        const courseObj = course.toObject();
        const createdLessons = await Lesson.find({ course: course._id }).sort({ order: 1 }).lean();
        const moduleMap = {};
        createdLessons.forEach(l => {
            if (!moduleMap[l.moduleTitle]) moduleMap[l.moduleTitle] = { title: l.moduleTitle, lessons: [] };
            moduleMap[l.moduleTitle].lessons.push({ ...l, _id: l._id.toString() });
        });
        courseObj.modules = Object.values(moduleMap);

        return NextResponse.json({ success: true, course: courseObj }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
