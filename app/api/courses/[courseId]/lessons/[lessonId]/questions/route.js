import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';
import Order from '@/models/Order';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { courseId, lessonId } = await params;

        const questions = await Question.find({
            course: courseId,
            lesson: lessonId,
            isDeleted: false
        })
            .populate('user', 'firstName lastName roles')
            .populate('replies.user', 'firstName lastName roles')
            .sort({ createdOn: -1 });

        return NextResponse.json({ success: true, questions });
    } catch (error) {
        console.error('Q&A Fetch Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req, { params }) {
    try {
        const user = await authenticateApi(req);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { courseId, lessonId } = await params;
        const { content } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ success: false, message: 'Question content is required' }, { status: 400 });
        }

        // Authorization Check: Admin, Instructor, or Enrolled Student
        const isAdmin = user.roles.includes('Admin');
        let isAuthorized = isAdmin;

        if (!isAuthorized) {
            // Check enrollment
            const enrollment = await Order.findOne({
                user: user._id,
                course: courseId,
                status: 'completed',
                accessStatus: { $ne: 'blocked' }
            });

            if (enrollment) {
                isAuthorized = true;
            } else {
                // Check if instructor
                const course = await Course.findById(courseId);
                if (course && course.instructor.toString() === user._id.toString()) {
                    isAuthorized = true;
                }
            }
        }

        if (!isAuthorized) {
            return NextResponse.json({ success: false, message: 'Access Denied: You must be enrolled to ask questions' }, { status: 403 });
        }

        const newQuestion = await Question.create({
            user: user._id,
            course: courseId,
            lesson: lessonId,
            content: content.trim()
        });

        // Populate user for instant UI update
        const populatedQuestion = await Question.findById(newQuestion._id).populate('user', 'firstName lastName roles');

        return NextResponse.json({ success: true, question: populatedQuestion });
    } catch (error) {
        console.error('Q&A Post Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
