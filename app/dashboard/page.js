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
    PlayCircle,
    Tag,
    CreditCard
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
            <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-7xl mx-auto">

                    {/* Welcome Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4" data-aos="fade-in">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-3 border border-indigo-100/50">
                                <LayoutDashboard className="w-3.5 h-3.5" />
                                {isAdmin ? 'System Administrator' : (isInstructor ? 'Instructor Console' : 'Student Portal')}
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                Welcome back, <span className="text-indigo-600">{user.firstName}</span>
                            </h1>
                            <p className="mt-1 text-slate-500 font-medium text-sm">
                                Manage your learning experience and track your progress.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                        {/* MAIN ACTION SECTION */}
                        <div className="lg:col-span-3 space-y-6">

                            {/* Role Specific Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {isStudent && (
                                    <Link href="/my-courses" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="50">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-indigo-50 w-fit rounded-lg text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">My Learning</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Access your enrolled courses and resume learning.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                                                Continue <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {(isInstructor || isAdmin) && (
                                    <Link href="/admin/courses" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-purple-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-purple-50 w-fit rounded-lg text-purple-600 mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">Courses</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Manage and update your shared course content.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                                                Manage <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {(isInstructor || isAdmin) && (
                                    <Link href="/admin/courses/add" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="150">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-emerald-50 w-fit rounded-lg text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <PlusCircle className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">Create Course</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Launch a new program and reach more students.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                                                Launch <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link href="/admin/users" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-amber-50 w-fit rounded-lg text-amber-600 mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">User Management</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Administer platform users and permissions.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                                                Administer <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link href="/admin/coupons" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="250">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-indigo-50 w-fit rounded-lg text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                                <Tag className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">Coupons</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Create and manage course discount offers.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                                                Manage <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {isAdmin && (
                                    <Link href="/admin/transactions" className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all duration-300 relative overflow-hidden" data-aos="fade-up" data-aos-delay="300">
                                        <div className="flex flex-col h-full">
                                            <div className="p-2.5 bg-emerald-50 w-fit rounded-lg text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-base font-bold text-slate-800 mb-1">Transactions</h3>
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4">Track payments and manage student refunds.</p>
                                            <div className="mt-auto flex items-center text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                                                Track <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Account Info Section */}
                            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm" data-aos="fade-up" data-aos-delay="250">
                                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                    Account Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Last Status</p>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                            <p className="text-sm font-bold text-slate-700">Online & Active</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Primary Email</p>
                                        <p className="text-sm font-bold text-slate-700 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Assigned Roles</p>
                                        <p className="text-sm font-bold text-slate-700">{user.roles.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SIDEBAR SECTION */}
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm" data-aos="fade-left">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl font-bold mb-4 border border-slate-200">
                                        {user.firstName.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{user.firstName} {user.lastName}</h3>
                                    <p className="text-slate-500 text-xs font-medium mt-0.5">{user.email}</p>

                                    <div className="w-full h-px bg-slate-100 my-6"></div>

                                    <Link href="/profile" className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        <Settings className="w-3.5 h-3.5" />
                                        Profile Settings
                                    </Link>
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className="bg-slate-800 rounded-xl p-6 text-white overflow-hidden shadow-sm" data-aos="fade-left" data-aos-delay="100">
                                <h4 className="text-xs font-bold mb-2 uppercase tracking-wider text-indigo-300">Security Notification</h4>
                                <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                    Your session is restricted to a single device. Signing in from another location will terminate this activity.
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
