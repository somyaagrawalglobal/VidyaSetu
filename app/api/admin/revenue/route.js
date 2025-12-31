import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import Order from '@/models/Order';
import User from '@/models/User';
import Payout from '@/models/Payout';
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
            // Ensure ID comparison works by using the string representation if needed, 
            // though Mongoose handles this, being explicit doesn't hurt.
            query.instructor = user._id;
        }

        const courses = await Course.find(query)
            .populate('instructor', 'firstName lastName email payoutDetails')
            .sort({ createdAt: -1 })
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
                instructorPayoutDetails: course.instructor?.payoutDetails || null,
                totalRevenue: totalEarnings,
                platformShare: totalEarnings * 0.4,
                instructorShare: totalEarnings * 0.6,
                enrollmentCount: enrollments.length,
                payoutStatus: course.payoutStatus || 'Pending',
                payoutTransactionId: course.payoutTransactionId || null
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

export async function POST(request) {
    try {
        const user = await authenticateApi(request);
        if (!user || !user.roles.includes('Admin')) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { courseId, transactionId, action } = await request.json();

        if (!courseId || !transactionId) {
            return NextResponse.json({ success: false, message: 'Missing course ID or transaction ID' }, { status: 400 });
        }

        const course = await Course.findOne({ _id: courseId });
        if (!course) {
            return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
        }

        // 1. Calculate the amount for records
        const enrollments = await Order.find({ course: courseId, status: 'completed' }).select('actualAmount').lean();
        const totalEarnings = enrollments.reduce((sum, order) => sum + (order.actualAmount || 0), 0);
        const instructorShare = totalEarnings * 0.6;

        // 2. Create the Payout record (History/Audit)
        const payoutEntry = await Payout.create({
            instructor: course.instructor,
            courses: [courseId],
            amount: instructorShare,
            transactionId: transactionId,
            status: 'Paid',
            payoutDate: new Date()
        });

        if (!payoutEntry) {
            throw new Error('Failed to create payout record');
        }

        // 3. Update the Course status (Immediate view)
        course.payoutStatus = 'Paid';
        course.payoutTransactionId = transactionId;
        await course.save();

        return NextResponse.json({ success: true, message: 'Payout recorded successfully' });
    } catch (error) {
        console.error('Payout Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
