'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Info, MessageCircle, FileText, Download, CheckCircle2 } from 'lucide-react';

export default function WatchContent({ activeLesson, course, isCompleted, onToggleComplete }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!activeLesson) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <FileText className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">Select a lesson to begin</h3>
                <p className="text-slate-500 mt-2 max-w-sm">Pick any lesson from the sidebar to start your learning journey.</p>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Info },
        { id: 'qna', label: 'Q&A', icon: MessageCircle },
        { id: 'resources', label: 'Resources', icon: Download },
    ];

    return (
        <main className="flex-1 flex flex-col min-h-full bg-white">
            {/* Video Player Section */}
            <div className="bg-black w-full shadow-lg">
                <div className="max-w-[1400px] mx-auto">
                    <VideoPlayer videoId={activeLesson.videoId} />
                </div>
            </div>

            {/* Lesson Info & Tabs Section */}
            <div className="flex-1 px-4 lg:px-8 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300">
                <div className="max-w-[1400px] mx-auto">
                    {/* Lesson Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 mb-6 border-b border-slate-200">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight mb-2">
                                {activeLesson.title}
                            </h1>
                            <span className="text-sm text-slate-500">Currently Watching</span>
                        </div>
                        <button
                            onClick={onToggleComplete}
                            className={`flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg transition-all self-start md:self-center text-sm border shadow-sm ${isCompleted
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                                }`}
                        >
                            {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                            {isCompleted ? 'Completed' : 'Mark as Complete'}
                        </button>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors relative ${isActive
                                            ? 'text-indigo-600 border-b-2 border-indigo-600'
                                            : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="prose prose-slate max-w-none">
                        {activeTab === 'overview' && (
                            <div>
                                <div className="bg-slate-50 rounded-xl p-6 mb-6 border border-slate-200">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3 mt-0">About this lesson</h3>
                                    <div className="text-slate-700 leading-relaxed space-y-3">
                                        {activeLesson.description ? (
                                            activeLesson.description.split('\n').map((para, i) => (
                                                <p key={i} className="m-0">{para}</p>
                                            ))
                                        ) : (
                                            <p className="italic text-slate-500 m-0">No description provided for this lesson.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg">
                                    <h4 className="text-lg font-semibold mb-2">Need Help?</h4>
                                    <p className="text-indigo-100 text-sm mb-4">
                                        Our community and instructors are here to help. Ask questions in the Q&A section or join our Discord.
                                    </p>
                                    <button className="bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-indigo-50 transition-colors">
                                        Join Discord
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'qna' && (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-800 mt-0">No questions yet</h3>
                                <p className="text-slate-500 mt-2">Be the first to ask a question about this lesson.</p>
                                <button className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors">
                                    Ask a Question
                                </button>
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Downloadable Resources</h3>
                                {activeLesson.resources && activeLesson.resources.length > 0 ? (
                                    <div className="space-y-3">
                                        {activeLesson.resources.map((resource, index) => (
                                            <a
                                                key={index}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-pointer no-underline group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 m-0">{resource.title}</p>
                                                        <p className="text-xs text-slate-500 m-0 uppercase tracking-wide">{resource.type || 'Resource'}</p>
                                                    </div>
                                                </div>
                                                <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500">No resources available for this lesson.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
