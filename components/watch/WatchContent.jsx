'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { Info, MessageCircle, FileText, BookOpen, CheckCircle2, Eye, ExternalLink } from 'lucide-react';
import ResourceModal from './ResourceModal';

export default function WatchContent({ activeLesson, course, isCompleted, onToggleComplete }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedResource, setSelectedResource] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Q&A State
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    // Reset preview when lesson changes
    useEffect(() => {
        setSelectedResource(null);
        setIsModalOpen(false);
    }, [activeLesson?._id]);

    const handleViewResource = (resource) => {
        setSelectedResource(resource);
        setIsModalOpen(true);
    };

    // Fetch questions when lesson changes or activeTab becomes 'qna'
    useEffect(() => {
        if (activeTab === 'qna' && activeLesson?._id) {
            fetchQuestions();
        }
    }, [activeTab, activeLesson?._id]);

    const fetchQuestions = async () => {
        try {
            const res = await fetch(`/api/courses/${course._id}/lessons/${activeLesson._id}/questions`);
            const data = await res.json();
            if (data.success) {
                setQuestions(data.questions);
            }
        } catch (error) {
            console.error('Failed to fetch questions');
        }
    };

    const handlePostQuestion = async () => {
        if (!newQuestion.trim()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/courses/${course._id}/lessons/${activeLesson._id}/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newQuestion })
            });
            const data = await res.json();
            if (data.success) {
                setQuestions([data.question, ...questions]);
                setNewQuestion('');
            }
        } catch (error) {
            console.error('Failed to post question');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePostReply = async (questionId) => {
        if (!replyContent.trim()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/questions/${questionId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: replyContent })
            });
            const data = await res.json();
            if (data.success) {
                setQuestions(questions.map(q => q._id === questionId ? data.question : q));
                setReplyContent('');
                setReplyingTo(null);
            }
        } catch (error) {
            console.error('Failed to post reply');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTimeAgo = (date) => {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return new Date(date).toLocaleDateString();
    };

    const RoleBadge = ({ roles }) => {
        if (!roles || (roles.includes('Student') && roles.length === 1)) return null;
        const isStaff = roles.includes('Admin') || roles.includes('Instructor');
        const label = roles.includes('Admin') ? 'Admin' : roles.includes('Instructor') ? 'Instructor' : roles[0];

        return (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-tighter ${isStaff
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                {label}
            </span>
        );
    };

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
        { id: 'resources', label: 'Resources', icon: BookOpen },
    ];

    return (
        <main className="flex-1 flex flex-col md:overflow-y-auto  min-h-full bg-white">
            {/* Video Player Section */}
            <div className="bg-black w-full shadow-lg">
                <div className="max-w-[1400px] mx-auto">
                    <VideoPlayer videoId={activeLesson.videoId} />
                </div>
            </div>

            {/* Lesson Info & Tabs Section */}
            <div className="flex-1 px-4 lg:px-8 py-6 overflow-y-auto md:overflow-y-visible scrollbar-none">
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
                    <div className="flex items-center gap-1 border-b border-slate-200 mb-6 overflow-x-auto scrollbar-none">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm font-semibold transition-colors relative whitespace-nowrap ${isActive
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
                            <div className="space-y-10 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Ask Question Form */}
                                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm ring-1 ring-slate-900/5">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs">
                                            ?
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                value={newQuestion}
                                                onChange={(e) => setNewQuestion(e.target.value)}
                                                placeholder="Have a doubt? Ask the community..."
                                                className="w-full text-sm p-4 border border-slate-100 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all resize-none h-28 leading-relaxed placeholder:text-slate-400"
                                            />
                                            <div className="flex justify-end mt-4">
                                                <button
                                                    disabled={isSubmitting || !newQuestion.trim()}
                                                    onClick={handlePostQuestion}
                                                    className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm"
                                                >
                                                    {isSubmitting ? 'POSTING...' : 'POST QUESTION'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Questions List */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-900 px-1 mb-6">Community Discussions</h4>
                                    {questions.length === 0 ? (
                                        <div className="text-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                                <MessageCircle className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h5 className="text-base font-bold text-slate-800 mb-1 leading-none">Silence is Golden</h5>
                                            <p className="text-slate-500 text-sm max-w-[240px] mx-auto leading-relaxed">But questions are silver. Be the first to start the conversation.</p>
                                        </div>
                                    ) : (
                                        questions.map((q) => (
                                            <div key={q._id} className="group border-b border-slate-100 last:border-0 pb-10 mb-8 transition-all">
                                                <div className="flex gap-5">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shadow-sm group-hover:border-slate-300 transition-colors">
                                                            {q.user?.firstName?.[0]}{q.user?.lastName?.[0]}
                                                        </div>
                                                        {(q.replies && q.replies.length > 0 || replyingTo === q._id) && (
                                                            <div className="flex-1 w-[2px] bg-slate-100 my-2 rounded-full" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-bold text-slate-900 leading-none">
                                                                    {q.user?.firstName} {q.user?.lastName}
                                                                </span>
                                                                <RoleBadge roles={q.user?.roles} />
                                                            </div>
                                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                                                                {formatTimeAgo(q.createdOn)}
                                                            </span>
                                                        </div>
                                                        <p className="text-[15px] text-slate-700 leading-relaxed mb-4 font-medium">
                                                            {q.content}
                                                        </p>

                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => setReplyingTo(replyingTo === q._id ? null : q._id)}
                                                                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded transition-all ${replyingTo === q._id
                                                                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                                                                    : 'text-indigo-600 hover:bg-indigo-50'
                                                                    }`}
                                                            >
                                                                {replyingTo === q._id ? 'CANCEL' : 'REPLY'}
                                                            </button>
                                                        </div>

                                                        {/* Reply Form */}
                                                        {replyingTo === q._id && (
                                                            <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-xl ring-1 ring-slate-900/5 animate-in zoom-in-95 duration-200 origin-top">
                                                                <textarea
                                                                    autoFocus
                                                                    value={replyContent}
                                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                                    placeholder="Write a professional reply..."
                                                                    className="w-full text-sm p-3 border border-slate-100 rounded-lg bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all resize-none h-24"
                                                                />
                                                                <div className="flex justify-end mt-3">
                                                                    <button
                                                                        disabled={isSubmitting || !replyContent.trim()}
                                                                        onClick={() => handlePostReply(q._id)}
                                                                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-[11px] hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
                                                                    >
                                                                        {isSubmitting ? 'SENDING...' : 'REPLY TO THREAD'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Replies List */}
                                                        {q.replies && q.replies.length > 0 && (
                                                            <div className="mt-6 space-y-6 relative">
                                                                {q.replies.map((reply, idx) => (
                                                                    <div key={reply._id} className="flex gap-4 group/reply">
                                                                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px] uppercase shadow-sm">
                                                                            {reply.user?.firstName?.[0]}{reply.user?.lastName?.[0]}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center justify-between mb-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="text-[13px] font-bold text-slate-800">
                                                                                        {reply.user?.firstName} {reply.user?.lastName}
                                                                                    </span>
                                                                                    <RoleBadge roles={reply.user?.roles} />
                                                                                </div>
                                                                                <span className="text-[9px] font-medium text-slate-400 uppercase">
                                                                                    {formatTimeAgo(reply.createdOn)}
                                                                                </span>
                                                                            </div>
                                                                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg group-hover/reply:bg-slate-50 transition-colors">
                                                                                {reply.content}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 mt-0">Lesson Resources</h3>

                                {activeLesson.resources && activeLesson.resources.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-3">
                                        {activeLesson.resources.map((resource, index) => (
                                            <div
                                                key={index}
                                                className="group relative flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[0.5rem] hover:border-indigo-200 transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.1)] hover:-translate-y-0.5"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-violet-50/0 group-hover:from-indigo-50/50 group-hover:to-violet-50/50 rounded-[0.5rem] transition-all duration-300 " />

                                                <div
                                                    className="relative flex items-center gap-5 flex-1 cursor-pointer"
                                                    onClick={() => handleViewResource(resource)}
                                                >
                                                    <div className="w-14 h-14 bg-slate-50 group-hover:bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-all duration-300 shadow-sm group-hover:shadow-md ring-1 ring-slate-100 group-hover:ring-indigo-100">
                                                        <FileText className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[15px] font-black text-slate-800 m-0 group-hover:text-indigo-700 transition-colors">
                                                            {resource.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            <span className="text-[10px] text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded-full font-black uppercase tracking-widest border border-indigo-100">
                                                                {'Resource'}
                                                            </span>
                                                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Secured Resource</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 pr-2 cursor-pointer">
                                                    <span className="text-[10px] font-black text-indigo-600 tracking-widest">VIEW RESOURCE</span>
                                                    <Eye className="w-4 h-4 text-indigo-600" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-slate-500 font-medium">No resources available for this lesson.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Area (Tabs) - Right Side End */}
            </div>

            {/* Resource Modal Popup */}
            <ResourceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                resource={selectedResource}
            />
        </main>
    );
}
