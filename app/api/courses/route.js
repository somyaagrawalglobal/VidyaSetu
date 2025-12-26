import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';
import { validateSession } from '@/lib/session';

import { authenticateApi } from '@/lib/api-auth';

// Helper to check Auth & Role
async function checkAuth(request, allowedRoles = []) {
    const user = await authenticateApi(request);
    if (!user) return null;

    if (allowedRoles.length > 0) {
        const hasRole = user.roles.some(role => allowedRoles.includes(role));
        if (!hasRole) return null; // Forbidden
    }

    return user;
}

export async function GET(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const publishedOnly = searchParams.get('published') !== 'false';

        const query = publishedOnly ? { published: true } : {};

        const courses = await Course.find(query)
            .populate('instructor', 'firstName lastName headline bio')
            .select('-modules.lessons.videoId') // Hide video IDs in list if needed, or keep them.
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, courses });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const user = await checkAuth(request, ['Admin']);
        if (!user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Auto-generate slug if not provided/ensure unique
        if (!body.slug) {
            body.slug = body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }

        const course = await Course.create({
            ...body,
            instructor: user._id,
        });

        return NextResponse.json({ success: true, course }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
