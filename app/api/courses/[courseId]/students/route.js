import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Course from '@/models/Course';
import User from '@/models/User';
import Order from '@/models/Order';
import Progress from '@/models/Progress';
import Lesson from '@/models/Lesson';
import { authenticateApi } from '@/lib/api-auth';

// Helper to check Auth & Role (Admin or Instructor of this course)
async function checkCourseAccess(request, courseId) {
    const user = await authenticateApi(request);
    if (!user) return null;

    await dbConnect();

    let course;
    if (mongoose.Types.ObjectId.isValid(courseId)) {
        course = await Course.findById(courseId);
    } else {
        course = await Course.findOne({ slug: courseId });
    }

    if (!course) return { error: 'Course not found', status: 404 };

    const isAdmin = user.roles.includes('Admin');
    const isOwner = (course.instructor || "").toString() === user._id.toString();

    if (!isAdmin && !isOwner) {
        return { error: 'Forbidden', status: 403 };
    }

    return { user, course };
}

export async function GET(request, { params }) {
    try {
        const { courseId } = await params;
        const auth = await checkCourseAccess(request, courseId);

        if (auth.error) {
            return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
        }

        const { course } = auth;

        // 1. Get all completed orders for this course
        const enrollments = await Order.find({
            course: course._id,
            status: 'completed'
        }).populate('user', 'firstName lastName email profileImage');

        // 2. Calculate Total Earnings
        const totalEarnings = enrollments.reduce((sum, order) => sum + (order.actualAmount || 0), 0);

        // 3. Get total lessons in course for progress calculation
        const totalLessons = await Lesson.countDocuments({ course: course._id });

        // 4. For each enrollment, get progress
        const studentData = await Promise.all(enrollments.map(async (order) => {
            const progress = await Progress.findOne({ user: order.user._id, course: course._id });
            const completedCount = progress ? progress.completedLessons.length : 0;
            const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

            return {
                orderId: order._id,
                studentId: order.user._id,
                name: `${order.user.firstName} ${order.user.lastName}`,
                email: order.user.email,
                profileImage: order.user.profileImage,
                enrolledDate: order.createdAt,
                progressPercent,
                accessStatus: order.accessStatus || 'active'
            };
        }));

        return NextResponse.json({
            success: true,
            students: studentData,
            courseTitle: course.title,
            totalEarnings
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { courseId } = await params;
        const auth = await checkCourseAccess(request, courseId);

        if (auth.error) {
            return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
        }

        const { course } = auth;
        const { orderId, accessStatus } = await request.json();

        if (!orderId || !['active', 'blocked'].includes(accessStatus)) {
            return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, course: course._id },
            { accessStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return NextResponse.json({ success: false, message: 'Enrollment not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: `Student ${accessStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully` });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
