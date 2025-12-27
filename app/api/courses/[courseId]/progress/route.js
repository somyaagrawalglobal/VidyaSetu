import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Progress from '@/models/Progress';
import { authenticateApi } from '@/lib/api-auth';
import Course from '@/models/Course';

export async function GET(request, { params }) {
    try {
        await dbConnect();
        const { courseId } = await params;
        const user = await authenticateApi(request);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        let progress = await Progress.findOne({ user: user._id, course: courseId });

        if (!progress) {
            // Return empty progress if none exists yet
            return NextResponse.json({ success: true, completedLessons: [] });
        }

        return NextResponse.json({ success: true, completedLessons: progress.completedLessons });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        await dbConnect();
        const { courseId } = await params;
        const { lessonId } = await request.json();
        const user = await authenticateApi(request);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        let progress = await Progress.findOne({ user: user._id, course: courseId });

        if (!progress) {
            progress = new Progress({
                user: user._id,
                course: courseId,
                completedLessons: [lessonId]
            });
        } else {
            const index = progress.completedLessons.indexOf(lessonId);
            if (index === -1) {
                progress.completedLessons.push(lessonId);
            } else {
                progress.completedLessons.splice(index, 1); // Toggle feature
            }
            progress.lastAccessed = Date.now();
        }

        await progress.save();

        return NextResponse.json({ success: true, completedLessons: progress.completedLessons });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
