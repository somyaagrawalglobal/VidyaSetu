import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { validateSession } from '@/lib/session';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        // Single Device Check
        const isValid = await validateSession(payload.userId, token);
        if (!isValid) {
            // If invalid, we should ideally clear cookie, but we can't easily set headers in Server Component 
            // without Middleware cooperation or Client Component hooks.
            // For now, redirect to login which will overwrite logic.
            redirect('/login?error=session_expired');
        }

        await dbConnect();
        const user = await User.findById(payload.userId).select('firstName lastName email roles');

        if (!user) {
            redirect('/login');
        }

        return (
            <div className="min-h-screen bg-slate-50 pt-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="mt-6 bg-white shadow rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.firstName}!</h2>
                        <p className="mt-2 text-gray-600">You are logged in as <span className="font-medium text-indigo-600">{user.roles.join(', ')}</span>.</p>
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <p className="text-sm text-gray-500">This is a protected route. If you log in on another device, refreshing this page will log you out.</p>
                        </div>
                    </div>
                </div>
            </div>
        );

    } catch (error) {
        redirect('/login');
    }
}
