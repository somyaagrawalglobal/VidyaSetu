'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Trash2, Video, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import ListInput from '@/components/ListInput';
import Modal from '@/components/Modal';

export default function AddCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
        published: true,
    });

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
            isFree: false
        });
        setFormData({ ...formData, modules: newModules });
    };

    const updateLesson = (moduleIndex, lessonIndex, field, value) => {
        const newModules = [...formData.modules];
        newModules[moduleIndex].lessons[lessonIndex][field] = value;
        setFormData({ ...formData, modules: newModules });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to create course');

            openModal({
                title: 'Success',
                message: 'Course created successfully!',
                type: 'success',
                confirmText: 'Go to List',
                onConfirm: () => router.push('/admin/courses'),
                showCancel: false
            });
        } catch (error) {
            openModal({ title: 'Error', message: error.message, type: 'danger', showCancel: false });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/courses" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Add New Course</h1>
                            <p className="text-slate-500 text-sm">Fill in the details to create a new learning path.</p>
                        </div>
                    </div>
                </div>

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
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://..."
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <ListInput
                                    label="What you'll learn"
                                    items={formData.learningOutcomes}
                                    onChange={(items) => setFormData(prev => ({ ...prev, learningOutcomes: items }))}
                                    placeholder="Add learning outcome..."
                                />
                                <ListInput
                                    label="Requirements"
                                    items={formData.requirements}
                                    onChange={(items) => setFormData(prev => ({ ...prev, requirements: items }))}
                                    placeholder="Add requirement..."
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

                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Lesson Title"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                                    value={lesson.title}
                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm font-mono text-gray-600"
                                                    value={lesson.videoId}
                                                    onChange={(e) => updateLesson(mIndex, lIndex, 'videoId', e.target.value)}
                                                />
                                            </div>

                                            <div className="flex items-center gap-4 mt-2 md:mt-0 w-full md:w-auto justify-end">
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
                            disabled={loading}
                            className="w-full bg-slate-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                        >
                            {loading ? 'Creating Course...' : 'Create Course'}
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
