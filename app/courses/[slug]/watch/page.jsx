'use client';

import { useState, useEffect, use } from 'react';
import { Lock } from 'lucide-react';
import WatchHeader from '@/components/watch/WatchHeader';
import WatchSidebar from '@/components/watch/WatchSidebar';
import WatchContent from '@/components/watch/WatchContent';

export default function WatchCoursePage({ params }) {
    const { slug } = use(params);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState(null);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${slug}`);
                const data = await res.json();

                if (data.success) {
                    if (!data.isEnrolled && !data.isAdmin) {
                        setError('You need to enroll in this course to watch it.');
                    }
                    setCourse(data.course);

                    // Set first lesson as active
                    if (data.course.modules.length > 0 && data.course.modules[0].lessons.length > 0) {
                        setActiveLesson(data.course.modules[0].lessons[0]);
                    }
                } else {
                    setError(data.message || 'Error loading course');
                }
            } catch (error) {
                setError('Failed to load course');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">Preparing your classroom...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Access Denied</h1>
            <p className="text-slate-400 max-w-md mb-8">{error}</p>
            <button
                onClick={() => window.history.back()}
                className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all uppercase text-xs tracking-widest"
            >
                Go Back
            </button>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-white overflow-hidden font-sans pt-20">
            <WatchHeader
                courseTitle={course.title}
                slug={slug}
                progress={0} // Hardcoded for now, potential future enhancement
            />

            <div className="flex-1 flex overflow-hidden relative">
                <WatchSidebar
                    modules={course.modules}
                    activeLesson={activeLesson}
                    onLessonSelect={setActiveLesson}
                />

                <WatchContent
                    activeLesson={activeLesson}
                    course={course}
                />
            </div>
        </div>
    );
}
