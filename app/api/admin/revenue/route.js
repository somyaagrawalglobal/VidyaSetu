import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import Order from '@/models/Order';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(request) {
    try {
        const user = await authenticateApi(request);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const isAdmin = user.roles.includes('Admin');

        // 1. Fetch courses (All for Admin, only owned for Instructor)
        const query = { isDeleted: false };
        if (!isAdmin) {
            query.instructor = user._id;
        }

        const courses = await Course.find(query)
            .populate('instructor', 'firstName lastName email')
            .lean();

        // 2. Calculate earnings for each course
        const revenueData = await Promise.all(courses.map(async (course) => {
            const enrollments = await Order.find({
                course: course._id,
                status: 'completed'
            }).select('actualAmount').lean();

            const totalEarnings = enrollments.reduce((sum, order) => sum + (order.actualAmount || 0), 0);

            return {
                _id: course._id,
                title: course.title,
                instructorName: course.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : 'N/A',
                instructorEmail: course.instructor ? course.instructor.email : 'N/A',
                totalRevenue: totalEarnings,
                platformShare: totalEarnings * 0.4,
                instructorShare: totalEarnings * 0.6,
                enrollmentCount: enrollments.length,
                payoutStatus: course.payoutStatus || 'Pending' // Simulation for now
            };
        }));

        return NextResponse.json({
            success: true,
            revenueData
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
