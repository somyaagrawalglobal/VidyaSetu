'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import WatchHeader from '@/components/watch/WatchHeader';
import WatchSidebar from '@/components/watch/WatchSidebar';
import WatchContent from '@/components/watch/WatchContent';

export default function CoursePreview({ courseData, onClose }) {
    const [fullCourseData, setFullCourseData] = useState(courseData);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLesson, setActiveLesson] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchFullCourse = async () => {
            if (courseData?._id && (!courseData.modules || courseData.modules.length === 0)) {
                setIsLoading(true);
                try {
                    const res = await fetch(`/api/courses/${courseData._id}`);
                    const data = await res.json();
                    if (data.success) {
                        setFullCourseData(data.course);
                    }
                } catch (error) {
                    console.error('Failed to fetch full course for preview:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setFullCourseData(courseData);
            }
        };

        fetchFullCourse();
    }, [courseData]);

    useEffect(() => {
        if (fullCourseData && fullCourseData.modules && fullCourseData.modules.length > 0) {
            // Find first lesson to auto-select
            for (const module of fullCourseData.modules) {
                if (module.lessons && module.lessons.length > 0) {
                    setActiveLesson(module.lessons[0]);
                    break;
                }
            }
        }
    }, [fullCourseData]);

    if (!courseData) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-50 overflow-hidden font-sans">
            <WatchHeader
                courseTitle={fullCourseData?.title || courseData.title}
                slug="#"
                progress={0}
                onMenuToggle={() => setIsSidebarOpen(true)}
                isPreview={true}
                onBack={onClose}
            />

            <div className="flex-1 flex overflow-hidden relative">
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className="mt-6 text-slate-800 font-black uppercase tracking-[0.3em] text-[11px] animate-pulse">Assembling Preview</h2>
                        <p className="mt-2 text-slate-400 text-[10px] font-medium uppercase tracking-widest">Fetching full curriculum...</p>
                    </div>
                ) : (
                    <>
                        <WatchSidebar
                            modules={fullCourseData?.modules || []}
                            activeLesson={activeLesson}
                            onLessonSelect={setActiveLesson}
                            completedLessons={[]}
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                        />

                        <WatchContent
                            activeLesson={activeLesson}
                            course={fullCourseData || courseData}
                            isCompleted={false}
                            onToggleComplete={() => { }}
                            isPreview={true}
                        />
                    </>
                )}
            </div>

            {/* Preview Banner */}
            <div className="bg-slate-900/95 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] sm:tracking-[0.4em] py-2 sm:py-2.5 text-center shrink-0 z-[35] border-t border-white/5 flex items-center justify-center gap-4 px-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-white/40 hidden xs:inline">●</span>
                    <span className="truncate text-white/90 font-bold">Preview View</span>
                </div>
                <div className="h-3 w-px bg-white/10 hidden md:block" />
                <span className="truncate text-indigo-400 hidden md:inline font-bold">Advanced Editor Testing</span>
                <div className="h-3 w-px bg-white/10 hidden sm:block" />
                <span className="truncate text-white/60 font-bold">Non-Interactive Mode</span>
            </div>
        </div>
    );
}
