'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Trash2, Video, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import ListInput from '@/components/ListInput';
import Modal from '@/components/Modal';
import VideoUploader from '@/components/admin/VideoUploader';
import FileUploader from '@/components/admin/FileUploader';
import { AlertCircle, CheckCircle, XCircle, Send } from 'lucide-react';
import { useToast } from '@/components/ToastContext';

export default function EditCoursePage({ params }) {
    const { courseId } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null,
        showCancel: false
    });

    const openModal = (config) => setModalConfig({ ...config, isOpen: true });
    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        level: 'All Levels',
        language: 'English',
        thumbnail: '',
        modules: [],
        learningOutcomes: [],
        requirements: [],
        provides: [],
        published: false,
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [rejectionReasonInput, setRejectionReasonInput] = useState('');
    const [isStatusUpdating, setIsStatusUpdating] = useState(false);

    useEffect(() => {
        fetchCourse();
        fetchUser();
    }, [courseId]);

    useEffect(() => {
        if (formData.rejectionReason) {
            setRejectionReasonInput(formData.rejectionReason);
        }
    }, [formData.rejectionReason]);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) setCurrentUser(data.user);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    const fetchCourse = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}`);
            const data = await res.json();
            if (data.success) {
                console.log('[EDIT PAGE] Loaded course with', data.course.modules?.length, 'modules');
                if (data.course.modules?.length > 0 && data.course.modules[0].lessons?.length > 0) {
                    const firstLesson = data.course.modules[0].lessons[0];
                    console.log('[EDIT PAGE] First lesson _id:', firstLesson._id);
                    console.log('[EDIT PAGE] First lesson has description:', !!firstLesson.description);
                    console.log('[EDIT PAGE] First lesson description value:', firstLesson.description);
                }
                setFormData(data.course);
            } else {
                alert('Course not found');
                router.push('/admin/courses');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Modules state management helper
    const addModule = () => {
        setFormData({
            ...formData,
            modules: [...formData.modules, { title: 'New Module', lessons: [] }]
        });
    };

    const updateModuleTitle = (index, title) => {
        const newModules = [...formData.modules];
        newModules[index].title = title;
        setFormData({ ...formData, modules: newModules });
    };

    const addLesson = (moduleIndex) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].lessons.push({
            title: 'New Lesson',
            videoId: '',
            duration: 0,
            isFree: false,
            description: '',
            resources: []
        });
        setFormData({ ...formData, modules: newModules });
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        const newModules = structuredClone(formData.modules);
        newModules[moduleIndex].lessons[lessonIndex][field] = value;
        setFormData({ ...formData, modules: newModules });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Curriculum Validation
        if (!formData.modules || formData.modules.length === 0) {
            openModal({ title: 'Curriculum Required', message: 'Please add at least one section to your course.', type: 'warning', showCancel: false });
            setSaving(false);
            return;
        }

        const totalLessons = formData.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
        if (totalLessons === 0) {
            openModal({ title: 'Lessons Required', message: 'Your curriculum must have at least one lesson.', type: 'warning', showCancel: false });
            setSaving(false);
            return;
        }

        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Response:", data);

            if (!res.ok) throw new Error(data.error || 'Failed to update course');

            // IMPORTANT: Sync IDs and state back from server
            if (data.course) {
                console.log("Syncing state from server:", data.course);
                setFormData(data.course);
            }

            if (data.message && data.message.includes('notified')) {
                toast.success(data.message);
            }

            openModal({
                title: 'Success',
                message: data.message || 'Course updated successfully!',
                type: 'success',
                confirmText: 'Go to List',
                onConfirm: () => router.push('/admin/courses'),
                showCancel: false
            });
        } catch (error) {
            console.error("Submission error:", error);
            openModal({ title: 'Error', message: error.message, type: 'danger', showCancel: false });
        } finally {
            setSaving(false);
        }
    };

    const handleAdminStatusUpdate = async (status) => {
        if (status === 'rejected' && !rejectionReasonInput.trim()) {
            openModal({ title: 'Reason Required', message: 'Please provide a reason for rejection.', type: 'warning', showCancel: false });
            return;
        }

        setIsStatusUpdating(true);
        console.log(`[ADMIN ACTION] Attempting to ${status} course ${courseId}...`);
        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    approvalStatus: status,
                    rejectionReason: status === 'rejected' ? rejectionReasonInput : null
                }),
            });

            const data = await res.json();
            console.log(`[ADMIN ACTION] Server response:`, data);

            if (data.success) {
                // Use the full course object from server if available, else update local
                if (data.course) {
                    setFormData(data.course);
                } else {
                    setFormData(prev => ({
                        ...prev,
                        approvalStatus: status,
                        rejectionReason: status === 'rejected' ? rejectionReasonInput : null
                    }));
                }

                if (data.message) {
                    toast.success(data.message);
                }

                openModal({
                    title: status === 'approved' ? 'Course Approved' : 'Course Rejected',
                    message: data.message || `The course has been successfully ${status}.`,
                    type: status === 'approved' ? 'success' : 'info',
                    showCancel: false
                });
            } else {
                throw new Error(data.message || data.error || 'Failed to update status');
            }
        } catch (error) {
            console.error("[ADMIN ACTION] Error:", error);
            openModal({ title: 'Error', message: error.message, type: 'danger', showCancel: false });
        } finally {
            setIsStatusUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 pt-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/courses" className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Edit Course</h1>
                            <div className="flex items-center gap-2">
                                <p className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">Course Configuration</p>
                                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${formData.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                    formData.approvalStatus === 'rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                        'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                                    {formData.approvalStatus || 'pending'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Approval Section */}
                {currentUser?.roles.includes('Admin') && (
                    <div className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-5 mb-8 relative overflow-hidden group hover:border-indigo-200 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                            <AlertCircle className="w-16 h-16 text-indigo-900" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <AlertCircle className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                        Admin Review Portal
                                    </h2>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 italic">Visibility & Compliance Check</span>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                                <div className="lg:col-span-12 xl:col-span-8">
                                    <textarea
                                        placeholder="Provide specific feedback if rejecting (e.g., 'Lesson 3 needs better audio', 'Incorrect category selected')..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 text-sm min-h-[80px] resize-none"
                                        value={rejectionReasonInput}
                                        onChange={(e) => setRejectionReasonInput(e.target.value)}
                                    />
                                </div>
                                <div className="lg:col-span-12 xl:col-span-4 flex flex-col sm:flex-row xl:flex-col gap-3 h-full justify-between">
                                    {formData.approvalStatus !== 'approved' && (
                                        <button
                                            type="button"
                                            disabled={isStatusUpdating}
                                            onClick={() => handleAdminStatusUpdate('approved')}
                                            className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md shadow-emerald-200 active:scale-95"
                                        >
                                            {isStatusUpdating ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    APPROVING...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-4 h-4" />
                                                    APPROVE COURSE
                                                </>
                                            )}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        disabled={isStatusUpdating}
                                        onClick={() => handleAdminStatusUpdate('rejected')}
                                        className={`flex-1 px-6 py-3 disabled:opacity-50 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 active:scale-95 ${formData.approvalStatus === 'rejected'
                                            ? 'bg-amber-500 text-white shadow-md shadow-amber-100 hover:bg-amber-600'
                                            : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                                            }`}
                                    >
                                        {isStatusUpdating ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                PROCESSING...
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-4 h-4" />
                                                {formData.approvalStatus === 'rejected' ? 'UPDATE FEEDBACK' : 'REJECT WITH REASON'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rejection Reason display for Instructor */}
                {formData.approvalStatus === 'rejected' && formData.rejectionReason && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-red-900 font-bold mb-1">Course Rejected</h3>
                            <p className="text-red-700 text-sm leading-relaxed">
                                <span className="font-semibold">Reason:</span> {formData.rejectionReason}
                            </p>
                            <p className="text-red-500 text-xs mt-3 italic">
                                Please address the issues mentioned above and resave the course. It will be returned to 'Pending' status automatically.
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-500" />
                                Basic Details
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="md:col-span-3">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Full Stack Web Development"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-1 pt-8">
                                    <label className="relative inline-flex items-center cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                                            {formData.published ? 'Published' : 'Draft'}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                <textarea
                                    required
                                    placeholder="Write a compelling description..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 min-h-[120px]"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                        <input
                                            type="number"
                                            required
                                            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (₹)</label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Design"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                                    <select
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    >
                                        <option value="All Levels">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Thumbnail</label>
                                <FileUploader
                                    type="thumbnail"
                                    initialUrl={formData.thumbnail}
                                    onUploadSuccess={(url) => setFormData({ ...formData, thumbnail: url })}
                                    accept="image/*"
                                />
                                {formData.thumbnail && (
                                    <p className="mt-2 text-xs text-slate-400 break-all font-mono bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        URL: {formData.thumbnail}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <ListInput
                                    label="What you'll learn"
                                    items={formData.learningOutcomes || []}
                                    onChange={(items) => setFormData(prev => ({ ...prev, learningOutcomes: items }))}
                                    placeholder="Add learning outcome..."
                                />
                                <ListInput
                                    label="Requirements"
                                    items={formData.requirements || []}
                                    onChange={(items) => setFormData(prev => ({ ...prev, requirements: items }))}
                                    placeholder="Add requirement..."
                                />
                                <ListInput
                                    label="This course includes"
                                    items={formData.provides || []}
                                    onChange={(items) => setFormData(prev => ({ ...prev, provides: items }))}
                                    placeholder="Add inclusion (e.g. Lifetime access)..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Modules & Lessons */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-xl font-bold text-gray-900">Curriculum</h2>
                            <button
                                type="button"
                                onClick={addModule}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-indigo-200 hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4" /> Add Section
                            </button>
                        </div>

                        {formData.modules.map((module, mIndex) => (
                            <div key={mIndex} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Section Title (e.g. Introduction)"
                                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-semibold text-gray-800"
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{module.lessons.length} Lessons</span>
                                        <button
                                            type="button"
                                            onClick={() => addLesson(mIndex)}
                                            className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            + Add Lesson
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newModules = [...formData.modules];
                                                newModules.splice(mIndex, 1);
                                                setFormData({ ...formData, modules: newModules });
                                            }}
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 space-y-3 bg-white">
                                    {module.lessons.length === 0 && (
                                        <div className="text-center py-6 text-gray-400 text-sm italic border-2 border-dashed border-gray-100 rounded-xl">
                                            No lessons in this section yet.
                                        </div>
                                    )}
                                    {module.lessons.map((lesson, lIndex) => (
                                        <div key={lIndex} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/10 transition-colors group">
                                            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                                                <Video className="w-4 h-4" />
                                            </div>

                                            <div className="flex-1 space-y-4 w-full">
                                                <div className="space-y-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Lesson Title"
                                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-bold"
                                                        value={lesson.title}
                                                        onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                                    />

                                                    <VideoUploader
                                                        courseId={courseId}
                                                        initialVideoId={lesson.videoId}
                                                        onVideoReady={(vid) => updateLesson(mIndex, lIndex, 'videoId', vid)}
                                                    />
                                                </div>

                                                <textarea
                                                    placeholder="Lesson Description (Optional)"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm min-h-[80px]"
                                                    value={lesson.description || ''}
                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'description', e.target.value)}
                                                />

                                                {/* Resources Sub-section */}
                                                <div className="pl-4 border-l-2 border-indigo-50 space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resources (Notes, DPP, etc.)</h5>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newModules = structuredClone(formData.modules);
                                                                const resources = newModules[mIndex].lessons[lIndex].resources || [];
                                                                newModules[mIndex].lessons[lIndex].resources = [...resources, { title: '', url: '', type: 'PDF' }];
                                                                setFormData({ ...formData, modules: newModules });
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-700 text-[10px] font-bold uppercase tracking-wider"
                                                        >
                                                            + Add Resource
                                                        </button>
                                                    </div>

                                                    {(lesson.resources || []).map((res, rIndex) => (
                                                        <div key={rIndex} className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                                                            <input
                                                                type="text"
                                                                placeholder="Resource Name (e.g. Notes)"
                                                                className="md:col-span-3 px-2 py-1.5 border border-gray-200 rounded-md text-xs"
                                                                value={res.title}
                                                                onChange={(e) => {
                                                                    const newModules = structuredClone(formData.modules);
                                                                    newModules[mIndex].lessons[lIndex].resources[rIndex].title = e.target.value;
                                                                    setFormData({ ...formData, modules: newModules });
                                                                }}
                                                            />
                                                            <div className="md:col-span-3">
                                                                <FileUploader
                                                                    type="resource"
                                                                    initialUrl={res.url}
                                                                    onUploadSuccess={(url) => {
                                                                        const newModules = structuredClone(formData.modules);
                                                                        newModules[mIndex].lessons[lIndex].resources[rIndex].url = url;
                                                                        setFormData({ ...formData, modules: newModules });
                                                                    }}
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newModules = structuredClone(formData.modules);
                                                                    newModules[mIndex].lessons[lIndex].resources.splice(rIndex, 1);
                                                                    setFormData({ ...formData, modules: newModules });
                                                                }}
                                                                className="text-red-400 hover:text-red-500 p-1 flex justify-center"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto justify-end self-start">
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${lesson.isFree ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'}`}>
                                                        {lesson.isFree && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={lesson.isFree}
                                                        onChange={(e) => updateLesson(mIndex, lIndex, 'isFree', e.target.checked)}
                                                    />
                                                    <span className="text-sm font-medium text-gray-600">Free</span>
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newModules = [...formData.modules];
                                                        newModules[mIndex].lessons.splice(lIndex, 1);
                                                        setFormData({ ...formData, modules: newModules });
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 pb-12">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    UPDATING COURSE...
                                </>
                            ) : (
                                'UPDATE COURSE'
                            )}
                        </button>
                    </div>
                </form>
                <Modal
                    isOpen={modalConfig.isOpen}
                    onClose={closeModal}
                    title={modalConfig.title}
                    message={modalConfig.message}
                    type={modalConfig.type}
                    onConfirm={modalConfig.onConfirm}
                    confirmText={modalConfig.confirmText}
                    showCancel={modalConfig.showCancel}
                />
            </div>
        </div>
    );
}
