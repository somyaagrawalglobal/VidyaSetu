
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Course from '@/models/Course';
import User from '@/models/User';
import Order from '@/models/Order'; // To check enrollment if needed

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
            course = await Course.findById(courseId).populate('instructor', 'firstName lastName headline bio');
        } else {
            course = await Course.findOne({ slug: courseId }).populate('instructor', 'firstName lastName headline bio');
        }

        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        // Hide video IDs unless enrolled?
        // For now, return full details, but frontend will only show player if enrolled.
        // Or we should strip videoId if not enrolled to prevent leeching.

        const currentUser = await authenticateApi(request); // Use our helper
        let isEnrolled = false;
        let isAdmin = false;

        if (currentUser) {
            isAdmin = currentUser.roles.includes('Admin');
            // Check enrollment
            // Assuming we check the Order collection for a successful order
            const enrollment = await Order.findOne({ user: currentUser._id, course: course._id, status: 'completed' });
            if (enrollment) isEnrolled = true;
        }

        if (!isEnrolled && !isAdmin) {
            // Strip out video IDs from lessons to protect content
            course.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (!lesson.isFree) {
                        lesson.videoId = null;
                    }
                });
            });
        }

        return NextResponse.json({ success: true, course, isEnrolled, isAdmin });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const user = await checkAuth(request, ['Admin', 'Instructor']);
        if (!user) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const { courseId } = await params;
        const body = await request.json();

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

        const course = await Course.findByIdAndUpdate(courseId, body, { new: true, runValidators: true });

        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, course });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
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
