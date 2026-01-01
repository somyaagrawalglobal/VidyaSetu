'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    BookOpen,
    PlusCircle,
    Users,
    GraduationCap,
    LayoutDashboard,
    Settings,
    ArrowRight,
    Tag,
    CreditCard,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/AuthProvider';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [authLoading, user, router]);

    const isLoading = authLoading || !user;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const isAdmin = user?.roles?.includes('Admin');
    const isInstructor = user?.roles?.includes('Instructor');
    const isStudent = user?.roles?.includes('Student');

    // --- Animation Configurations ---
    const smoothEase = [0.25, 0.1, 0.25, 1.0];
    const popEase = [0.34, 1.56, 0.64, 1]; // Bouncy pop effect

    // 1. Container - orchestrates the flow
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Faster stagger for snappier feel
                delayChildren: 0.1
            }
        }
    };

    // 2. Header - Slides in from left
    const headerVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: smoothEase }
        }
    };

    // 3. Grid Cards - Pop/Scale in
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, ease: popEase }
        }
    };

    // 4. Sidebar Content - Slides in from right
    const sidebarVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: smoothEase }
        }
    };

    // 5. Account Info - Fades up gently
    const infoVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: smoothEase }
        }
    };

    // Hover effect for cards
    const hoverAnimation = !isMobile ? {
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(79, 70, 229, 0.15)",
        transition: { duration: 0.3, ease: 'easeOut' }
    } : {};

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <motion.div
                className="max-w-7xl mx-auto"
                initial={isMobile ? false : "hidden"}
                animate={isMobile ? false : "visible"}
                variants={containerVariants}
            >

                {/* Welcome Header */}
                <motion.div variants={headerVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
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
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* MAIN ACTION SECTION */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Role Specific Quick Actions - Animated Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {isStudent && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/my-courses" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}

                            {(isInstructor || isAdmin) && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/admin/courses" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-purple-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}

                            {(isInstructor || isAdmin) && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/admin/courses/add" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}

                            {isAdmin && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/admin/users" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-amber-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}

                            {isAdmin && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/admin/coupons" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}

                            {isAdmin && (
                                <motion.div variants={cardVariants} whileHover={hoverAnimation}>
                                    <Link href="/admin/transactions" className="block h-full group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all duration-300 relative overflow-hidden">
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
                                </motion.div>
                            )}
                        </div>

                        {/* Account Info Section */}
                        <motion.div variants={infoVariants} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
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
                                    <p className="text-sm font-bold text-slate-700 truncate">{user.roles?.join(', ')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* SIDEBAR SECTION */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <motion.div variants={sidebarVariants} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl font-bold mb-4 border border-slate-200">
                                    {user.firstName?.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">{user.firstName} {user.lastName}</h3>
                                <p className="text-slate-500 text-xs font-medium mt-0.5">{user.email}</p>

                                <div className="w-full h-px bg-slate-100 my-6"></div>

                                <Link href="/profile" className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                    <Settings className="w-3.5 h-3.5" />
                                    Profile Settings
                                </Link>
                            </div>
                        </motion.div>

                        {/* Security Notice */}
                        <motion.div variants={sidebarVariants} className="bg-slate-800 rounded-xl p-6 text-white overflow-hidden shadow-sm">
                            <h4 className="text-xs font-bold mb-2 uppercase tracking-wider text-indigo-300">Security Notification</h4>
                            <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                                Your session is restricted to a single device. Signing in from another location will terminate this activity.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
