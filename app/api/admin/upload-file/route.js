import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { authenticateApi } from '@/lib/api-auth';

/**
 * API Route to handle file uploads for course thumbnails and resources.
 * Uses Vercel Blob Storage for production (serverless-compatible).
 * Method: POST
 * Body: FormData with 'file' and 'type' ('thumbnail' | 'resource')
 */
export async function POST(request) {
    try {
        // 1. Authenticate user
        const user = await authenticateApi(request);
        if (!user || (!user.roles.includes('Admin') && !user.roles.includes('Instructor'))) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // 2. Parse FormData
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type'); // 'thumbnail' or 'resource'
        const previousUrl = formData.get('previousUrl');

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        if (!['thumbnail', 'resource'].includes(type)) {
            return NextResponse.json({ success: false, message: 'Invalid upload type' }, { status: 400 });
        }

        // 3. Prepare file metadata
        const extension = file.name.split('.').pop();
        const filename = `${type}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension}`;

        // 4. Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: type === 'thumbnail' ? 'public' : 'public', // Both public for now
            addRandomSuffix: false,
        });

        console.log(`[UPLOAD] File uploaded to Vercel Blob: ${blob.url}`);

        // 5. Delete previous file if it exists and is a blob URL
        if (previousUrl && previousUrl.includes('blob.vercel-storage.com')) {
            try {
                await del(previousUrl);
                console.log(`[UPLOAD] Previous blob deleted: ${previousUrl}`);
            } catch (delError) {
                console.warn(`[UPLOAD_WARNING] Failed to delete previous blob: ${previousUrl}`, delError.message);
                // Don't fail the upload just because deletion failed
            }
        }

        // 6. Return blob URL
        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            url: blob.url
        });

    } catch (error) {
        console.error('[UPLOAD_ERROR]', error);
        return NextResponse.json({
            success: false,
            message: 'Upload failed',
            error: error.message
        }, { status: 500 });
    }
}
