import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';
import Order from '@/models/Order';
import Course from '@/models/Course';
import { authenticateApi } from '@/lib/api-auth';

export async function POST(req, { params }) {
    try {
        const user = await authenticateApi(req);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { questionId } = await params;
        const { content } = await req.json();

        if (!content || content.trim().length === 0) {
            return NextResponse.json({ success: false, message: 'Reply content is required' }, { status: 400 });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return NextResponse.json({ success: false, message: 'Question not found' }, { status: 404 });
        }

        // Authorization Check: Admin, Instructor, or Enrolled Student
        const isAdmin = user.roles.includes('Admin');
        let isAuthorized = isAdmin;

        if (!isAuthorized) {
            // Check enrollment
            const enrollment = await Order.findOne({
                user: user._id,
                course: question.course,
                status: 'completed',
                accessStatus: { $ne: 'blocked' }
            });

            if (enrollment) {
                isAuthorized = true;
            } else {
                // Check if instructor
                const course = await Course.findById(question.course);
                if (course && course.instructor.toString() === user._id.toString()) {
                    isAuthorized = true;
                }
            }
        }

        if (!isAuthorized) {
            return NextResponse.json({ success: false, message: 'Access Denied' }, { status: 403 });
        }

        question.replies.push({
            user: user._id,
            content: content.trim()
        });

        await question.save();

        // Populate for UI update
        const updatedQuestion = await Question.findById(questionId)
            .populate('user', 'firstName lastName roles')
            .populate('replies.user', 'firstName lastName roles');

        return NextResponse.json({ success: true, question: updatedQuestion });
    } catch (error) {
        console.error('Q&A Reply Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
