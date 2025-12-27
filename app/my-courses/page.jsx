'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import CourseCard from '@/components/CourseCard';

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

    if (loading) return <div className="p-8 text-center bg-slate-50 min-h-screen">Loading your courses...</div>;

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Enrolled Courses</h1>

                {courses.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-lg shadow">
                        <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                        <a href="/courses" className="text-indigo-600 font-bold hover:underline">Browse Courses</a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map(course => (
                            <CourseCard key={course._id} course={course} enrolled={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
