import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import UploadSession from '@/models/UploadSession';
import { authenticateApi } from '@/lib/api-auth';

export async function POST(request) {
    try {
        const user = await authenticateApi(request);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const sessionId = request.headers.get('Upload-Session-Id');
        const contentRange = request.headers.get('Content-Range');

        if (!sessionId || !contentRange) {
            return NextResponse.json({ success: false, message: 'Missing session headers' }, { status: 400 });
        }

        await dbConnect();
        const session = await UploadSession.findOne({ uploadSessionId: sessionId });

        if (!session) {
            return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 });
        }

        // Forward binary data to YouTube
        const chunk = await request.arrayBuffer();

        const ytResponse = await fetch(session.youtubeUploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Range': contentRange,
                'Content-Length': chunk.byteLength
            },
            body: chunk
        });

        if (ytResponse.status === 308) {
            // Success: Chunk accepted, upload incomplete
            const range = ytResponse.headers.get('Range');
            let uploadedBytes = 0;
            if (range) {
                uploadedBytes = parseInt(range.split('-')[1]) + 1;
            }

            session.uploadedBytes = uploadedBytes;
            session.status = 'uploading';
            await session.save();

            return NextResponse.json({ success: true, uploadedBytes, status: 'incomplete' });
        } else if (ytResponse.status === 200 || ytResponse.status === 201) {
            // Success: Upload complete
            const data = await ytResponse.json();
            const videoId = data.id;

            session.uploadedBytes = session.fileSize;
            session.status = 'completed';
            session.videoId = videoId;
            await session.save();

            return NextResponse.json({ success: true, videoId, status: 'completed' });
        } else {
            const error = await ytResponse.text();
            console.error('YouTube Chunk Error:', error);
            session.status = 'failed';
            await session.save();
            return NextResponse.json({ success: false, message: 'YouTube rejected this chunk' }, { status: ytResponse.status });
        }

    } catch (error) {
        console.error('Chunk API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
