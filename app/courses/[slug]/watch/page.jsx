'use client';

import { useState, useEffect, use } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { PlayCircle, Lock } from 'lucide-react';

export default function WatchCoursePage({ params }) {
    const { slug } = use(params);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState(null);
    const [error, setError] = useState(null);

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

    if (loading) return <div className="text-center p-10">Loading player...</div>;
    if (error) return <div className="text-center p-10 text-red-600 font-bold">{error}</div>;

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar with lessons */}
            <div className="w-80 border-r border-gray-800 flex flex-col overflow-hidden bg-gray-900">
                <div className="p-4 border-b border-gray-800">
                    <h2 className="font-bold text-lg truncate">{course.title}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {course.modules.map((module, mIndex) => (
                        <div key={mIndex}>
                            <div className="px-4 py-2 bg-gray-800 text-xs font-semibold text-gray-400 uppercase">
                                {module.title}
                            </div>
                            {module.lessons.map((lesson, lIndex) => (
                                <button
                                    key={lIndex}
                                    onClick={() => setActiveLesson(lesson)}
                                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-gray-800 transition ${activeLesson?._id === lesson._id ? 'bg-indigo-900 text-indigo-100' : 'text-gray-300'}`}
                                >
                                    <PlayCircle className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{lesson.title}</span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Video Area */}
            <div className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center p-8 bg-black">
                    <div className="w-full max-w-4xl">
                        {activeLesson ? (
                            <div>
                                <VideoPlayer videoId={activeLesson.videoId} />
                                <div className="mt-4">
                                    <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500">Select a lesson to start watching</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
