import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';
import { authenticateApi } from '@/lib/api-auth';
import { sendCourseApprovalNotification } from '@/lib/email';

export async function POST(request, { params }) {
    try {
        await dbConnect();
        const user = await authenticateApi(request);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { courseId } = await params;
        const course = await Course.findById(courseId);

        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        // Ownership & Status Check
        const isOwner = course.instructor.toString() === user._id.toString();
        const isAdmin = user.roles.includes('Admin');

        if (!isOwner && !isAdmin) {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        if (course.approvalStatus !== 'pending') {
            return NextResponse.json({
                success: false,
                message: `This course is currently ${course.approvalStatus}. Notification can only be sent for pending courses.`
            }, { status: 400 });
        }

        // Notify Admins
        const admins = await User.find({ roles: { $in: ['Admin'] }, isDeleted: { $ne: true } });

        if (admins.length === 0) {
            return NextResponse.json({ success: false, message: 'No administrators found to notify' }, { status: 500 });
        }

        let sentCount = 0;
        for (const admin of admins) {
            try {
                await sendCourseApprovalNotification({
                    to: admin.email,
                    adminName: admin.firstName,
                    instructorName: `${user.firstName} ${user.lastName}`,
                    courseTitle: course.title,
                    courseId: course._id.toString()
                });
                sentCount++;
            } catch (err) {
                console.error(`[NOTIFY ADMIN] Failed for ${admin.email}:`, err.message);
            }
        }

        if (sentCount === 0) {
            return NextResponse.json({ success: false, message: 'Failed to send notifications' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: `Notification sent to ${sentCount} administrator(s).`
        });

    } catch (error) {
        console.error('[NOTIFY ADMIN API] Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
