import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function authenticateApi(request) {
    let token = request.cookies.get('token')?.value;

    if (!token) {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    if (!token) return null;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        await dbConnect();
        const user = await User.findById(payload.userId).select('roles activeToken email firstName lastName');

        // Optional: Check if token matches active token (single session enforcement)
        if (user && user.activeToken && user.activeToken !== token) {
            return null; // Token invalidated
        }

        return user;
    } catch (error) {
        return null; // Invalid token
    }
}
