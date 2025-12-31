import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import { authenticateApi } from '@/lib/api-auth';
import fs from 'fs/promises';
import path from 'path';

/**
 * API Route to handle file uploads for course thumbnails and resources.
 * Uses Vercel Blob Storage for production (serverless-compatible).
 * Falls back to local filesystem for development if token is missing.
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

        if (!['thumbnail', 'resource', 'video'].includes(type)) {
            return NextResponse.json({ success: false, message: 'Invalid upload type' }, { status: 400 });
        }

        // 3. Prepare file metadata
        const extension = file.name.split('.').pop();
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 9);
        const filename = `${type}/${timestamp}-${randomStr}.${extension}`;

        let url = '';

        // 4. Upload Logic
        const token = process.env.BLOB_READ_WRITE_TOKEN;

        if (token) {
            // Production: Vercel Blob
            const blob = await put(filename, file, {
                access: 'public',
                addRandomSuffix: false,
                token: token
            });
            url = blob.url;
            console.log(`[UPLOAD] File uploaded to Vercel Blob: ${url}`);

            // Delete previous if it's a blob URL
            if (previousUrl && previousUrl.includes('blob.vercel-storage.com')) {
                try {
                    await del(previousUrl, { token });
                    console.log(`[UPLOAD] Previous blob deleted: ${previousUrl}`);
                } catch (e) {
                    console.warn('[UPLOAD_WARNING] Previous blob deletion failed', e.message);
                }
            }
        } else {
            // Development: Local Filesystem Fallback
            console.log('[UPLOAD] Local dev detected (No Blob Token). Using local fallback.');

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Ensure directory exists
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', type);
            await fs.mkdir(uploadDir, { recursive: true });

            const localFilePath = path.join(uploadDir, `${timestamp}-${randomStr}.${extension}`);
            await fs.writeFile(localFilePath, buffer);

            url = `/uploads/${type}/${timestamp}-${randomStr}.${extension}`;
            console.log(`[UPLOAD] File saved locally: ${url}`);
        }

        // Cleanup: If there was a previous local file, delete it regardless of current mode
        if (previousUrl && previousUrl.startsWith('/uploads/')) {
            try {
                const oldPath = path.join(process.cwd(), 'public', previousUrl);
                await fs.unlink(oldPath);
                console.log(`[UPLOAD] Previous local file deleted: ${oldPath}`);
            } catch (e) {
                console.warn('[UPLOAD_WARNING] Previous local file deletion failed', e.message);
            }
        }

        // 5. Return success result
        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            url: url
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
