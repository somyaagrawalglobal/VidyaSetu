import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UploadSession from '@/models/UploadSession';
import { authenticateApi } from '@/lib/api-auth';

export async function GET(request) {
    try {
        const user = await authenticateApi(request);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ success: false, message: 'Missing session ID' }, { status: 400 });
        }

        await dbConnect();
        const session = await UploadSession.findOne({ uploadSessionId: sessionId });

        if (!session) {
            return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 });
        }

        // To get the status of a resumable upload from YouTube:
        // Send a PUT request with an empty body and Content-Range: bytes */fileSize
        const ytResponse = await fetch(session.youtubeUploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Range': `bytes */${session.fileSize}`
            }
        });

        if (ytResponse.status === 308) {
            const range = ytResponse.headers.get('Range');
            let uploadedBytes = 0;
            if (range) {
                uploadedBytes = parseInt(range.split('-')[1]) + 1;
            }

            session.uploadedBytes = uploadedBytes;
            await session.save();

            return NextResponse.json({
                success: true,
                uploadedBytes,
                fileSize: session.fileSize,
                status: 'uploading'
            });
        } else if (ytResponse.status === 200 || ytResponse.status === 201) {
            return NextResponse.json({
                success: true,
                status: 'completed',
                videoId: session.videoId
            });
        } else {
            return NextResponse.json({ success: false, message: 'YouTube session expired' }, { status: ytResponse.status });
        }

    } catch (error) {
        console.error('Status API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
