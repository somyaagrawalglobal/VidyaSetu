import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import User from '@/models/User';
import Order from '@/models/Order';
import Progress from '@/models/Progress';
import Lesson from '@/models/Lesson';
import { authenticateApi } from '@/lib/api-auth';

// Helper to check if Admin
async function checkAdmin(request) {
    const user = await authenticateApi(request);
    if (!user || !user.roles.includes('Admin')) return null;
    return user;
}

export async function GET(request, { params }) {
    try {
        const admin = await checkAdmin(request);
        if (!admin) return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });

        const { userId } = await params;
        await dbConnect();

        const user = await User.findById(userId).select('firstName lastName email profileImage');
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // Get all completed orders for this user
        const enrollments = await Order.find({
            user: userId,
            status: 'completed'
        }).populate('course', 'title thumbnail');

        // Calculate progress for each enrollment
        const enrollmentData = await Promise.all(enrollments.map(async (order) => {
            const courseId = order.course._id;

            // Total lessons in course
            const totalLessons = await Lesson.countDocuments({ course: courseId });

            // User progress
            const progress = await Progress.findOne({ user: userId, course: courseId });
            const completedCount = progress ? progress.completedLessons.length : 0;
            const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

            return {
                orderId: order._id,
                courseId: courseId,
                courseTitle: order.course.title,
                courseThumbnail: order.course.thumbnail,
                enrolledDate: order.createdAt,
                progressPercent,
                accessStatus: order.accessStatus || 'active'
            };
        }));

        return NextResponse.json({
            success: true,
            enrollments: enrollmentData,
            user: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
