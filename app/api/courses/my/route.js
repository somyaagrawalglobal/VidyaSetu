import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(request) {
    try {
        const user = await authenticateApi(request);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Find all completed and active orders for this user
        const orders = await Order.find({
            user: user._id,
            status: 'completed',
            accessStatus: { $ne: 'blocked' }
        }).select('course');

        // Extract course IDs
        const courseIds = orders.map(order => order.course);

        // Fetch courses details (exclude soft-deleted)
        const courses = await Course.find({ _id: { $in: courseIds }, isDeleted: { $ne: true } })
            .populate('instructor', 'firstName lastName')
            .select('-modules.lessons.videoId')
            .lean();

        // Attach order ID to each course for invoice linking
        const coursesWithOrderId = courses.map(course => {
            const order = orders.find(o => o.course.toString() === course._id.toString());
            return {
                ...course,
                orderId: order?._id
            };
        });

        return NextResponse.json({ success: true, courses: coursesWithOrderId });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
