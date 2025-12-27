import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { validateSession } from '@/lib/session';
import Link from 'next/link';
import {
    BookOpen,
    PlusCircle,
    Users,
    GraduationCap,
    LayoutDashboard,
    Settings,
    ArrowRight,
    PlayCircle
} from 'lucide-react';

export default async function Dashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const isValid = await validateSession(payload.userId, token);
        if (!isValid) {
            redirect('/login?error=session_expired');
        }

        await dbConnect();
        const user = await User.findById(payload.userId).select('firstName lastName email roles');

        if (!user) {
            redirect('/login');
        }

        const isAdmin = user.roles.includes('Admin');
        const isInstructor = user.roles.includes('Instructor');
        const isStudent = user.roles.includes('Student');

        return (
            <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-7xl mx-auto">

                    {/* Welcome Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100">
                                <LayoutDashboard className="w-3 h-3" />
                                {isAdmin ? 'System Administrator' : (isInstructor ? 'Instructor Console' : 'Student Portal')}
                            </div>
                            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                                Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">{user.firstName}</span>!
                            </h1>
                            <p className="mt-2 text-slate-500 font-medium">Ready to continue your journey today?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* MAIN ACTION SECTION */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Role Specific Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {isStudent && (
                                    <Link href="/my-courses" className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <PlayCircle className="w-24 h-24 text-indigo-600" />
                                        </div>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">My Learning</h3>
                                                <p className="text-slate-500 text-sm mt-1">Continue where you left off in your enrolled courses.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-indigo-600 mt-2">
                                            View All Courses <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                )}

                                {(isInstructor || isAdmin) && (
                                    <Link href="/admin/courses" className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <BookOpen className="w-24 h-24 text-purple-600" />
                                        </div>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                                <BookOpen className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Course Management</h3>
                                                <p className="text-slate-500 text-sm mt-1">{isAdmin ? 'Manage all courses across the platform.' : 'Edit and update your created programs.'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-purple-600 mt-2">
                                            Manage Content <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                )}

                                {(isInstructor || isAdmin) && (
                                    <Link href="/admin/courses/add" className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <PlusCircle className="w-24 h-24 text-emerald-600" />
                                        </div>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <PlusCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Create Course</h3>
                                                <p className="text-slate-500 text-sm mt-1">Design and publish a new learning experience.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-emerald-600 mt-2">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link href="/admin/users" className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Users className="w-24 h-24 text-amber-600" />
                                        </div>
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">User Controls</h3>
                                                <p className="text-slate-500 text-sm mt-1">Manage platform users, roles, and permissions.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm font-bold text-amber-600 mt-2">
                                            Open Directory <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Recent Activity Placeholder */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                                    Platform Overview
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                        <p className="text-xl font-black text-slate-900">Active</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                                        <p className="text-sm font-bold text-slate-700 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Identity</p>
                                        <p className="text-sm font-bold text-slate-700">{user.roles.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR SECTION */}
                        <div className="space-y-8">
                            {/* Profile Card */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-black mb-6 shadow-xl shadow-indigo-200">
                                        {user.firstName.charAt(0)}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{user.firstName} {user.lastName}</h3>
                                    <p className="text-slate-500 text-sm font-medium mt-1">{user.email}</p>
                                    <Link href="/profile" className="mt-8 w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        <Settings className="w-4 h-4" />
                                        Manage Profile
                                    </Link>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                <h4 className="text-lg font-bold mb-3">Security Note</h4>
                                <p className="text-indigo-200 text-sm leading-relaxed">
                                    Your account is protected with single-device login. Accessing Vidya-Setu from another browser will invalidate this session.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    } catch (error) {
        redirect('/login');
    }
}
