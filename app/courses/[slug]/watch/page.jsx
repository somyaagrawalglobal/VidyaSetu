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
    const [completedLessons, setCompletedLessons] = useState([]);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchCourseAndProgress = async () => {
            try {
                // Fetch course
                const courseRes = await fetch(`/api/courses/${slug}`);
                const courseData = await courseRes.json();

                if (courseData.success) {
                    if (!courseData.isEnrolled && !courseData.isAdmin) {
                        setError('You need to enroll in this course to watch it.');
                    }
                    setCourse(courseData.course);

                    // Set first lesson as active
                    if (courseData.course.modules.length > 0 && courseData.course.modules[0].lessons.length > 0) {
                        setActiveLesson(courseData.course.modules[0].lessons[0]);
                    }

                    // Fetch progress
                    const progressRes = await fetch(`/api/courses/${courseData.course._id}/progress`);
                    const progressData = await progressRes.json();
                    if (progressData.success) {
                        setCompletedLessons(progressData.completedLessons || []);
                    }
                } else {
                    setError(courseData.message || 'Error loading course');
                }
            } catch (error) {
                setError('Failed to load course details');
            } finally {
                setLoading(false);
            }
        };
        fetchCourseAndProgress();
    }, [slug]);

    const handleToggleLesson = async (lessonId) => {
        try {
            const res = await fetch(`/api/courses/${course._id}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lessonId })
            });
            const data = await res.json();
            if (data.success) {
                setCompletedLessons(data.completedLessons);
            }
        } catch (error) {
            console.error("Error toggling lesson progress:", error);
        }
    };

    const calculateProgressPercentage = () => {
        if (!course) return 0;
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        if (totalLessons === 0) return 0;
        return Math.round((completedLessons.length / totalLessons) * 100);
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-300 font-semibold text-sm">Preparing your classroom...</p>
        </div>
    );


    if (error) return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
            <p className="text-slate-400 max-w-md mb-8">{error}</p>
            <button
                onClick={() => window.history.back()}
                className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
                Go Back
            </button>
        </div>
    );

    const progressPercentage = calculateProgressPercentage();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 overflow-hidden font-sans pt-16">
            <WatchHeader
                courseTitle={course.title}
                slug={slug}
                progress={progressPercentage}
            />

            <div className="flex-1 flex overflow-hidden relative">
                <WatchSidebar
                    modules={course.modules}
                    activeLesson={activeLesson}
                    onLessonSelect={setActiveLesson}
                    completedLessons={completedLessons}
                />

                <WatchContent
                    activeLesson={activeLesson}
                    course={course}
                    isCompleted={completedLessons.includes(activeLesson?._id)}
                    onToggleComplete={() => handleToggleLesson(activeLesson?._id)}
                />
            </div>
        </div>
    );
}
