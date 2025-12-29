import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { authenticateApi } from '@/lib/api-auth';

/**
 * API Route to handle file uploads for course thumbnails and resources.
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

        // 3. Prepare storage path
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const extension = path.extname(file.name);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${extension}`;
        const relativeDir = type === 'thumbnail' ? 'uploads/courses/thumbnails' : 'uploads/courses/resources';
        const absoluteDir = type === 'thumbnail'
            ? path.join(process.cwd(), 'public', relativeDir)
            : path.join(process.cwd(), relativeDir);

        // Ensure directory exists
        await mkdir(absoluteDir, { recursive: true });

        const filePath = path.join(absoluteDir, filename);

        // 4. Save file
        await writeFile(filePath, buffer);
        console.log(`[UPLOAD] File saved to ${filePath}`);

        // 5. Delete previous file if it exists and is local
        if (previousUrl && (previousUrl.startsWith('/uploads/') || previousUrl.startsWith('/api/courses/resources/'))) {
            try {
                let absolutePreviousPath;
                if (previousUrl.startsWith('/uploads/')) {
                    absolutePreviousPath = path.join(process.cwd(), 'public', previousUrl);
                } else {
                    const prevFilename = previousUrl.split('/').pop();
                    absolutePreviousPath = path.join(process.cwd(), 'uploads/courses/resources', prevFilename);
                }

                if (existsSync(absolutePreviousPath)) {
                    await unlink(absolutePreviousPath);
                    console.log(`[UPLOAD] Previous file deleted: ${absolutePreviousPath}`);
                }
            } catch (delError) {
                console.warn(`[UPLOAD_WARNING] Failed to delete previous file: ${previousUrl}`, delError.message);
                // Don't fail the upload just because deletion failed
            }
        }

        // 6. Return public URL / Secured API URL
        const publicUrl = type === 'thumbnail'
            ? `/${relativeDir}/${filename}`
            : `/api/courses/resources/${filename}`;

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            url: publicUrl
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
