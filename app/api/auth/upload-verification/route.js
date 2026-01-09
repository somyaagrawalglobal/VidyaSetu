import { NextResponse } from 'next/server';
import { put, del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const type = formData.get('type'); // 'resume', 'verification', or 'verificationId'
        const previousUrl = formData.get('previousUrl');

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        if (!['resume', 'verification', 'verificationId'].includes(type)) {
            return NextResponse.json({ success: false, message: 'Invalid upload type' }, { status: 400 });
        }

        // Limit file size (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ success: false, message: 'File too large (max 5MB)' }, { status: 400 });
        }

        const extension = file.name.split('.').pop();
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 9);
        const filename = `verifications/${type}-${timestamp}-${randomStr}.${extension}`;

        let url = '';
        const token = process.env.BLOB_READ_WRITE_TOKEN;

        if (token) {
            const blob = await put(filename, file, {
                access: 'public',
                addRandomSuffix: false,
                token: token
            });
            url = blob.url;

            // Delete previous from blob if exists
            if (previousUrl && previousUrl.includes('blob.vercel-storage.com')) {
                try {
                    await del(previousUrl, { token });
                } catch (e) {
                    console.warn('[UPLOAD_WARNING] Previous blob deletion failed', e.message);
                }
            }
        } else {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'verifications');
            await fs.mkdir(uploadDir, { recursive: true });
            const localFilePath = path.join(uploadDir, `${type}-${timestamp}-${randomStr}.${extension}`);
            await fs.writeFile(localFilePath, buffer);
            url = `/uploads/verifications/${type}-${timestamp}-${randomStr}.${extension}`;
        }

        // Cleanup: If there was a previous local file, delete it
        if (previousUrl && previousUrl.startsWith('/uploads/')) {
            try {
                const oldPath = path.join(process.cwd(), 'public', previousUrl);
                await fs.unlink(oldPath).catch(err => {
                    if (err.code !== 'ENOENT') throw err;
                });
            } catch (e) {
                console.warn('[UPLOAD_WARNING] Previous local file deletion failed', e.message);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully',
            url: url
        });

    } catch (error) {
        console.error('[PUBLIC_UPLOAD_ERROR]', error);
        return NextResponse.json({
            success: false,
            message: 'Upload failed',
            error: error.message
        }, { status: 500 });
    }
}
