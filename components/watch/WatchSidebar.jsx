'use client';

import { useState } from 'react';
import { PlayCircle, CheckCircle, ChevronDown, ChevronRight, Lock, FileText } from 'lucide-react';

export default function WatchSidebar({ modules, activeLesson, onLessonSelect, completedLessons = [], isOpen, onClose }) {
    const [expandedModules, setExpandedModules] = useState([0]); // First module expanded by default

    const toggleModule = (index) => {
        setExpandedModules(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleLessonSelect = (lesson) => {
        onLessonSelect(lesson);
        if (onClose) onClose(); // Close drawer on mobile
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden shrink-0 shadow-2xl lg:shadow-sm lg:static transition-transform duration-300 transform 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <h2 className="font-bold text-slate-900 text-sm">
                        Course Curriculum
                    </h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1.5 hover:bg-slate-200 rounded-md text-slate-500 transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 -rotate-90" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                    {modules.map((module, mIndex) => {
                        const isExpanded = expandedModules.includes(mIndex);
                        const completedInModule = module.lessons.filter(l => completedLessons.includes(l._id)).length;
                        const progressPercent = (completedInModule / module.lessons.length) * 100;

                        return (
                            <div key={mIndex} className="border-b border-slate-100 last:border-0">
                                <button
                                    onClick={() => toggleModule(mIndex)}
                                    className="w-full px-5 py-4 flex items-start gap-3 bg-white hover:bg-slate-50 transition-colors text-left group"
                                >
                                    <div className="mt-0.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-2">
                                            Module {mIndex + 1}: {module.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                                <span className="text-indigo-600 font-semibold">{completedInModule}/{module.lessons.length}</span>
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <span>{module.lessons.length} Lessons</span>
                                            </span>
                                        </div>
                                        {/* Module Progress Bar */}
                                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-500 transition-all duration-500"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="bg-slate-50/50">
                                        {module.lessons.map((lesson, lIndex) => {
                                            const isActive = activeLesson?._id === lesson._id;
                                            const isCompleted = completedLessons.includes(lesson._id);

                                            return (
                                                <button
                                                    key={lIndex}
                                                    onClick={() => handleLessonSelect(lesson)}
                                                    className={`w-full px-5 py-3 flex items-start gap-3 group transition-colors relative ${isActive
                                                        ? 'bg-indigo-50 border-l-2 border-indigo-600'
                                                        : 'hover:bg-slate-100 border-l-2 border-transparent'
                                                        }`}
                                                >
                                                    <div className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? 'text-indigo-600' : (isCompleted ? 'text-emerald-500' : 'text-slate-400')
                                                        }`}>
                                                        {isCompleted ? (
                                                            <CheckCircle className="w-4 h-4 fill-emerald-50" />
                                                        ) : (
                                                            <PlayCircle className={`w-4 h-4 ${isActive ? 'fill-indigo-50' : ''}`} />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0 text-left">
                                                        <span className={`text-sm block leading-tight ${isActive ? 'font-semibold text-indigo-900' : 'text-slate-700 font-medium'
                                                            }`}>
                                                            {lesson.title}
                                                        </span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                                                                <FileText className="w-3 h-3" />
                                                                <span>Video • {lesson.duration || '10:00'}</span>
                                                            </div>
                                                            {lesson.isFree && (
                                                                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">Free</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}
