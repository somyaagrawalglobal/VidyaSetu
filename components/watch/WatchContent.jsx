'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Info, MessageCircle, FileText, Download } from 'lucide-react';

export default function WatchContent({ activeLesson, course }) {
    const [activeTab, setActiveTab] = useState('overview');

    if (!activeLesson) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-700">Select a lesson to begin</h3>
                <p className="text-slate-500 mt-2 max-w-xs">Pick any lesson from the sidebar to start your learning journey.</p>
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
            <div className="bg-black w-full shadow-2xl z-10">
                <div className="max-w-[1200px] mx-auto">
                    <VideoPlayer videoId={activeLesson.videoId} />
                </div>
            </div>

            {/* Lesson Info & Tabs Section */}
            <div className="flex-1 pt-6 px-4 lg:px-8 pb-12 scrollbar-thin scrollbar-thumb-slate-200">
                <div className="max-w-[1000px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                        <div>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">Currently Watching</span>
                            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
                                {activeLesson.title}
                            </h1>
                        </div>
                        <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl transition-all self-start md:self-center text-sm border border-slate-200/50">
                            Mark as Complete
                        </button>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex items-center gap-1 border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative border-b-2 whitespace-nowrap ${isActive ? 'text-indigo-600 border-indigo-600 bg-indigo-50/30' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
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
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">About this lesson</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {course.description || "In this particular lesson, we delve into the core concepts and practical applications of the topic at hand. Follow along closely to master the foundational principles."}
                                </p>

                                <div className="mt-12 bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-bold mb-2">Stuck somewhere?</h4>
                                        <p className="text-indigo-100 text-sm mb-6 max-w-md">Our community and instructors are here to help. Head over to the Q&A section or join our Discord server.</p>
                                        <button className="bg-white text-indigo-900 font-black px-6 py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors shadow-lg shadow-black/20">
                                            Join Discord Community
                                        </button>
                                    </div>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'qna' && (
                            <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                                <MessageCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-800">No questions yet</h3>
                                <p className="text-slate-500 mt-2">Be the first to ask a question about this lesson.</p>
                                <button className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                                    Ask a Question
                                </button>
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Downloadable Assets</h3>
                                {[1, 2].map(i => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50 group hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-500 font-bold border border-slate-100">
                                                PDF
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">Lesson Resources_{i}.pdf</p>
                                                <p className="text-[11px] text-slate-400 font-medium">1.2 MB • Updated 2 days ago</p>
                                            </div>
                                        </div>
                                        <Download className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
