
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Course from '@/models/Course';
import User from '@/models/User';
import Order from '@/models/Order'; // To check enrollment if needed
import Lesson from '@/models/Lesson';

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


export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { courseId } = await params;

        let course;
        if (mongoose.Types.ObjectId.isValid(courseId)) {
            course = await Course.findById(courseId).populate('instructor', 'firstName lastName headline bio').lean();
        } else {
            course = await Course.findOne({ slug: courseId }).populate('instructor', 'firstName lastName headline bio').lean();
        }

        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        // Fetch lessons separately and group them into modules
        const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 }).lean();
        console.log(`[API GET] Fetched ${lessons.length} lessons for course ${course._id}. Sample desc: ${lessons[0]?.description ? 'exists' : 'missing'}`);

        const moduleMap = {};
        lessons.forEach(lesson => {
            if (!moduleMap[lesson.moduleTitle]) {
                moduleMap[lesson.moduleTitle] = {
                    title: lesson.moduleTitle,
                    lessons: []
                };
            }
            moduleMap[lesson.moduleTitle].lessons.push({
                ...lesson,
                _id: lesson._id.toString()
            });
        });

        course.modules = Object.values(moduleMap);

        const currentUser = await authenticateApi(request);
        let isEnrolled = false;
        let isAdmin = false;
        let isInstructor = false;

        if (currentUser) {
            isAdmin = currentUser.roles.includes('Admin');
            const instructorId = (course.instructor?._id || course.instructor || "").toString();
            isInstructor = instructorId === currentUser._id.toString();

            const enrollment = await Order.findOne({ user: currentUser._id, course: course._id, status: 'completed' });
            if (enrollment) isEnrolled = true;
        }

        if (!isEnrolled && !isAdmin && !isInstructor) {
            course.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (!lesson.isFree) {
                        lesson.videoId = null;
                    }
                });
            });
        }

        return NextResponse.json({ success: true, course, isEnrolled, isAdmin, isInstructor });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await dbConnect();
        const user = await checkAuth(request, ['Admin', 'Instructor']);
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const { courseId } = await params;
        const body = await request.json();
        const { modules, ...courseData } = body;

        console.log(`[API] Updating course ${courseId}. Received ${modules?.length || 0} modules.`);

        // Ownership Check
        let existingCourse;
        if (mongoose.Types.ObjectId.isValid(courseId)) {
            existingCourse = await Course.findById(courseId);
        } else {
            existingCourse = await Course.findOne({ slug: courseId });
        }

        if (!existingCourse) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        const isAdmin = user.roles.includes('Admin');
        const isOwner = (existingCourse.instructor || "").toString() === user._id.toString();

        if (!isAdmin && !isOwner) {
            return NextResponse.json({ success: false, message: 'Forbidden: You do not own this course' }, { status: 403 });
        }

        // 1. Update Course Basic Info (Clean out sensitive fields)
        const { _id, instructor, createdAt, updatedAt, __v, ...updateCourseData } = courseData;
        const course = await Course.findByIdAndUpdate(existingCourse._id, updateCourseData, { new: true, runValidators: true }).lean();

        // 2. Sync Lessons
        if (modules) {
            const incomingLessonIds = [];
            const lessonsToUpdate = [];
            const lessonsToCreate = [];

            modules.forEach((module, mIndex) => {
                if (!module.lessons) return;
                module.lessons.forEach((lesson, lIndex) => {
                    console.log(`[API PUT] Processing lesson: ${lesson.title}, has _id: ${!!lesson._id}, _id value: ${lesson._id}`);
                    const lessonData = {
                        title: lesson.title,
                        videoId: lesson.videoId || '',
                        description: lesson.description || '',
                        resources: (lesson.resources || []).map(r => ({
                            title: r.title,
                            url: r.url,
                            type: r.type || 'External Link'
                        })),
                        isFree: lesson.isFree === true,
                        course: existingCourse._id,
                        moduleTitle: module.title,
                        order: (mIndex * 100) + lIndex
                    };

                    if (lesson._id && mongoose.Types.ObjectId.isValid(lesson._id)) {
                        const idString = lesson._id.toString();
                        incomingLessonIds.push(idString);
                        lessonsToUpdate.push({ _id: lesson._id, data: lessonData });
                        console.log(`[API PUT] Marked for UPDATE: ${idString}`);
                    } else {
                        lessonsToCreate.push(lessonData);
                        console.log(`[API PUT] Marked for CREATE (no valid _id)`);
                    }
                });
            });

            console.log(`[API PUT] Summary: ${lessonsToUpdate.length} to update, ${lessonsToCreate.length} to create, ${incomingLessonIds.length} incoming IDs`);

            // CRITICAL FIX: Only delete lessons that are truly orphaned (not in the incoming array)
            // Convert incoming IDs to strings for proper comparison
            const incomingIdStrings = incomingLessonIds.map(id => id.toString());
            const deleteResult = await Lesson.deleteMany({
                course: existingCourse._id,
                _id: { $nin: incomingIdStrings }
            });
            console.log(`[API PUT] Deleted ${deleteResult.deletedCount} orphaned lessons`);

            // Update existing
            if (lessonsToUpdate.length > 0) {

                console.log('[API PUT] Sample update data:', JSON.stringify(lessonsToUpdate[0]?.data, null, 2));
                for (const item of lessonsToUpdate) {
                    // CRITICAL FIX: Use findByIdAndUpdate instead of updateOne
                    const updated = await Lesson.findByIdAndUpdate(
                        item._id,
                        item.data,
                        { new: true, runValidators: true }
                    );
                    console.log(`[API PUT] Updated lesson ${item._id}, result:`, updated ? 'SUCCESS' : 'FAILED');
                    if (updated) {
                        console.log(`[API PUT] Updated lesson has description?`, !!updated.description);
                        console.log(`[API PUT] Updated lesson description value:`, updated.description || '(empty)');
                    }
                }
            }

            // Create new
            if (lessonsToCreate.length > 0) {
                console.log(`[API PUT] Creating ${lessonsToCreate.length} new lessons.`);
                console.log('[API PUT] Sample new lesson:', JSON.stringify(lessonsToCreate[0], null, 2));
                const saved = await Lesson.insertMany(lessonsToCreate);
                console.log('[API PUT] Saved count:', saved.length);
            }

            // CRITICAL: Verify the data was actually saved by re-querying
            const verifyLesson = await Lesson.findOne({ course: existingCourse._id }).lean();
            console.log('[API PUT] ===== DATABASE VERIFICATION =====');
            console.log('[API PUT] First lesson in DB has description?', !!verifyLesson?.description);
            console.log('[API PUT] First lesson description value:', verifyLesson?.description || '(empty)');
            console.log('[API PUT] First lesson resources count:', verifyLesson?.resources?.length || 0);
        }

        // 3. Re-fetch full course with lessons to return (The frontend needs this to sync IDs)
        const updatedLessons = await Lesson.find({ course: existingCourse._id }).sort({ order: 1 }).lean();
        const moduleMap = {};
        updatedLessons.forEach(l => {
            if (!moduleMap[l.moduleTitle]) moduleMap[l.moduleTitle] = { title: l.moduleTitle, lessons: [] };
            moduleMap[l.moduleTitle].lessons.push({ ...l, _id: l._id.toString() });
        });
        course.modules = Object.values(moduleMap);

        return NextResponse.json({ success: true, course });
    } catch (error) {
        console.error('[API] Course Update Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await dbConnect();
        const user = await checkAuth(request, ['Admin', 'Instructor']);
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const { courseId } = await params;

        // Ownership Check
        const existingCourse = await Course.findById(courseId);
        if (!existingCourse) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        const isAdmin = user.roles.includes('Admin');
        const isOwner = (existingCourse.instructor || "").toString() === user._id.toString();

        if (!isAdmin && !isOwner) {
            return NextResponse.json({ success: false, message: 'Forbidden: You do not own this course' }, { status: 403 });
        }

        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Course deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
