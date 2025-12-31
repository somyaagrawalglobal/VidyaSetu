'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import Loader from '@/components/Loader';

export default function MyCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            // We can create a dedicated endpoint for enrolled courses, 
            // OR filtering existing courses API if it supports it, 
            // OR fetching User Orders and then Courses.

            // I'll assume we add a 'enrolled=true' query param to our courses API 
            // to return only enrolled courses for the current user.
            // But currently GET /api/courses returns ALL published courses.
            // It's better to make a new endpoint or update the existing one.

            // Let's Fetch all courses and valid enrollment on client? NO, bad for performance.
            // Let's create a new lightweight API route for this on the fly: /api/courses/enrolled
            // OR just put logic here assuming I can't easily make new backend files right now 
            // (but I CAN, so I should).

            // Actually, let's just make a new file /app/api/courses/my/route.js

            const res = await fetch('/api/courses/my');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setCourses(data.courses);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader text="Fetching your courses..." />;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Improved Header Section */}
                <div className="mb-8 md:mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-600" />
                        <span className="text-[10px] md:text-xs font-semibold text-indigo-600 uppercase tracking-wider">Learning Dashboard</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3 md:mb-4 leading-tight">
                        My <span className="text-indigo-600">Enrolled</span> Courses
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
                        Continue your journey to excellence. Access all your learning materials and track your progress in one place.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center bg-white p-8 md:p-16 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 animate-fade-in">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-slate-300" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-500 text-sm md:text-base mb-8 max-w-md mx-auto px-2">You haven't enrolled in any courses yet. Start your learning journey today by browsing our featured programs.</p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-indigo-600 text-white text-sm md:text-base font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                        >
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {courses.map(course => (
                            <CourseCard key={course._id} course={course} enrolled={true} />
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out both;
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out both;
                }
            `}</style>
        </div>
    );
}
