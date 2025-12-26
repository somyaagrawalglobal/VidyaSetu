'use client';

import { useState } from 'react';
import { PlayCircle, CheckCircle, ChevronDown, ChevronRight, Lock, FileText } from 'lucide-react';

export default function WatchSidebar({ modules, activeLesson, onLessonSelect }) {
    const [expandedModules, setExpandedModules] = useState([0]); // First module expanded by default

    const toggleModule = (index) => {
        setExpandedModules(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    return (
        <aside className="w-80 lg:w-96 bg-slate-50 border-r border-slate-200 flex flex-col h-full overflow-hidden shrink-0">
            <div className="p-4 border-b border-slate-200 bg-white">
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                    Course Curriculum
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                {modules.map((module, mIndex) => {
                    const isExpanded = expandedModules.includes(mIndex);

                    return (
                        <div key={mIndex} className="border-b border-slate-100 last:border-0">
                            <button
                                onClick={() => toggleModule(mIndex)}
                                className="w-full px-4 py-4 flex items-start gap-3 bg-white hover:bg-slate-50 transition-colors text-left group"
                            >
                                <div className="mt-1 text-slate-400 group-hover:text-indigo-500 transition-colors">
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-700 text-sm leading-tight">
                                        Module {mIndex + 1}: {module.title}
                                    </h3>
                                    <p className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                                        <span>{module.lessons.length} Lessons</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span>{Math.floor(Math.random() * 60 + 20)}m total</span>
                                    </p>
                                </div>
                            </button>

                            {isExpanded && (
                                <div className="bg-slate-50 pb-2">
                                    {module.lessons.map((lesson, lIndex) => {
                                        const isActive = activeLesson?._id === lesson._id;
                                        const isLocked = !lesson.isFree && false; // Future logic for locking

                                        return (
                                            <button
                                                key={lIndex}
                                                onClick={() => onLessonSelect(lesson)}
                                                className={`w-full px-4 py-3 flex items-start gap-3 group transition-all relative ${isActive ? 'bg-indigo-50/50' : 'hover:bg-slate-100'}`}
                                            >
                                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />}

                                                <div className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                    {lesson.isCompleted ? (
                                                        <CheckCircle className="w-4 h-4 fill-green-50" />
                                                    ) : (
                                                        <PlayCircle className={`w-4 h-4 ${isActive ? 'fill-indigo-50' : ''}`} />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 text-left">
                                                    <span className={`text-sm block leading-tight ${isActive ? 'font-bold text-indigo-700' : 'text-slate-600 font-medium'}`}>
                                                        {lesson.title}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                            <FileText className="w-3 h-3" />
                                                            <span>Video • {lesson.duration || '10:00'}</span>
                                                        </div>
                                                        {lesson.isFree && (
                                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 rounded uppercase tracking-wider">Free</span>
                                                        )}
                                                    </div>
                                                </div>

                                                {isLocked && <Lock className="w-3 h-3 text-slate-300 ml-auto" />}
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
    );
}
