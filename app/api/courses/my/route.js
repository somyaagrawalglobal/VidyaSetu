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

        // Find all completed orders for this user
        const orders = await Order.find({ user: user._id, status: 'completed' }).select('course');

        // Extract course IDs
        const courseIds = orders.map(order => order.course);

        // Fetch courses details
        const courses = await Course.find({ _id: { $in: courseIds } })
            .populate('instructor', 'firstName lastName')
            .select('-modules.lessons.videoId'); // Secure, don't send video IDs in list

        return NextResponse.json({ success: true, courses });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
