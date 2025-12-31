'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    Lock,
    PlayCircle,
    CheckCircle2,
    Clock,
    Award,
    Globe,
    AlertCircle,
    BarChart,
    User,
    Share2,
    Heart
} from 'lucide-react';

import VideoPlayerModal from '@/components/VideoPlayerModal';
import EnrollmentModal from '@/components/EnrollmentModal';
import Loader from '@/components/Loader';

const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.id = 'razorpay-checkout-js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        if (!document.getElementById('razorpay-checkout-js')) {
            document.body.appendChild(script);
        } else {
            resolve(true);
        }
    });
};

export default function CourseDetails({ params }) {
    const { slug } = use(params);
    const router = useRouter();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeModule, setActiveModule] = useState(0);
    const [previewModal, setPreviewModal] = useState({ isOpen: false, videoId: '', title: '' });
    const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

    const openPreview = (videoId, title) => {
        setPreviewModal({ isOpen: true, videoId, title });
    };

    useEffect(() => {
        loadRazorpay();
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/courses/${slug}`);
                const data = await res.json();
                if (data.success) {
                    setCourse(data.course);
                    setIsEnrolled(data.isEnrolled);
                    setIsAdmin(data.isAdmin);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    const handleBuyNow = () => {
        setIsEnrollModalOpen(true);
    };

    const handleEnrollSuccess = () => {
        setIsEnrolled(true);
        router.push(`/courses/${slug}/watch`);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Course link copied to clipboard!');
    };

    if (loading) return <Loader text="Unlocking course secrets..." />;

    if (!course) return (
        <div className="min-h-screen bg-slate-50 pt-24 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
            <p className="text-gray-600 mt-2">The course you are looking for does not exist or has been removed.</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Dark Hero Section */}
            <div className="bg-slate-900 text-white pt-38 pb-12 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left Column: Course Info */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Breadcrumbs / Category */}
                            <div className="flex items-center gap-2 text-indigo-300 text-sm font-medium tracking-wide">
                                <span className="uppercase text-xs font-bold bg-indigo-500/20 px-2 py-1 rounded border border-indigo-500/30">
                                    {course.category}
                                </span>
                                <span>&gt;</span>
                                <span className="truncate">{course.title}</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 mt-6">
                                <div className="flex items-center gap-1">
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded font-bold">4.8</span>
                                    <div className="flex text-yellow-400">★★★★★</div>
                                    <span className="text-indigo-300 ml-1 underline underline-offset-2">(1,240 ratings)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-indigo-400" />
                                    <span>Created by <span className="text-white font-medium underline decoration-indigo-500 underline-offset-4">{course.instructor?.firstName} {course.instructor?.lastName}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                    <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-white" />
                                    <span>{course.language || 'English'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 max-w-7xl relative">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-20">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 pt-10 space-y-12">

                        {/* What you'll learn */}
                        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll learn</h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
                                    course.learningOutcomes.map((outcome, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm">{outcome}</span>
                                        </div>
                                    ))
                                ) : (
                                    <>
                                        <div className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm">Master the core concepts of {course.category}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm">Build real-world projects</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm ml-1">
                                {course.requirements && course.requirements.length > 0 ? (
                                    course.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))
                                ) : (
                                    <li>No specific requirements. Basic computer knowledge is sufficient.</li>
                                )}
                            </ul>
                        </div>

                        {/* Course Content */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Content</h2>
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                <span>{course.modules.length} sections • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lectures</span>
                            </div>

                            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200">
                                {course.modules.map((module, mIndex) => (
                                    <div key={mIndex} className="bg-white">
                                        <button
                                            onClick={() => setActiveModule(activeModule === mIndex ? -1 : mIndex)}
                                            className="w-full flex items-center justify-between px-6 py-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 font-semibold text-gray-900">
                                                <span className={`transform transition-transform ${activeModule === mIndex ? 'rotate-180' : ''}`}>▼</span>
                                                {module.title}
                                            </div>
                                            <span className="text-sm text-gray-500">{module.lessons.length} lectures</span>
                                        </button>

                                        {activeModule === mIndex && (
                                            <div className="divide-y divide-gray-100 bg-white">
                                                {module.lessons.map((lesson, lIndex) => (
                                                    <div
                                                        key={lIndex}
                                                        className={`px-6 py-3 flex items-center justify-between group transition-colors ${lesson.isFree ? 'cursor-pointer hover:bg-indigo-50/30' : ''}`}
                                                        onClick={() => {
                                                            if (lesson.isFree && !isEnrolled) {
                                                                openPreview(lesson.videoId, lesson.title);
                                                            }
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-3 text-sm text-gray-700">
                                                            <PlayCircle className={`w-4 h-4 ${lesson.isFree ? 'text-indigo-500' : 'text-gray-400'}`} />
                                                            <span className={lesson.isFree ? 'text-indigo-900 font-medium' : ''}>{lesson.title}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {lesson.isFree && (
                                                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Preview</span>
                                                            )}
                                                            <span className="text-xs text-gray-400">
                                                                {lesson.duration > 0 ? `${Math.floor(lesson.duration / 60)}:00` : '10:00'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructor Bio */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructor</h2>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6">
                                <div className="h-20 w-20 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center text-slate-400">
                                    <User size={40} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-indigo-600 underline underline-offset-2 decoration-2 decoration-indigo-100">
                                        {course.instructor?.firstName} {course.instructor?.lastName}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4">{course.instructor?.headline || 'Senior Developer & Instructor'}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {course.instructor?.bio || 'Passionate educator with over 10 years of experience in the industry. Dedicated to helping students achieve their career goals through practical, hands-on learning.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="lg:col-span-1 relative">
                        <div className="lg:absolute lg:top-[-180px] lg:right-0 w-full bg-white rounded-2xl shadow-xl shadow-slate-200 border border-gray-100 overflow-hidden sticky top-24">
                            {/* Video/Thumbnail Area */}
                            <div
                                className="relative h-48 w-full group cursor-pointer overflow-hidden"
                                onClick={() => course.modules?.[0]?.lessons?.[0]?.videoId && openPreview(course.modules[0].lessons[0].videoId, "Course Preview")}
                            >
                                <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-8 h-8 text-white fill-current" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-0 w-full text-center text-white font-semibold text-sm drop-shadow-md">Preview this course</div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-3xl font-black text-gray-900">
                                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                                    </span>
                                    {course.originalPrice > course.price && (
                                        <>
                                            <span className="text-lg text-gray-400 line-through font-medium">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                                            <span className="text-sm font-bold text-red-500 ml-auto">{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF</span>
                                        </>
                                    )}
                                </div>

                                {isEnrolled || isAdmin ? (
                                    <button
                                        onClick={() => router.push(`/courses/${slug}/watch`)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-3.5 rounded-xl mb-3 shadow-lg shadow-emerald-200 transition-all transform active:scale-95"
                                    >
                                        Go to Course
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleBuyNow}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold py-3.5 rounded-xl mb-3 shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
                                    >
                                        {course.price === 0 ? 'Enroll Now' : 'Buy Now'}
                                    </button>
                                )}

                                <p className="text-center text-xs text-gray-500 mb-6">30-Day Money-Back Guarantee</p>

                                <div className="space-y-3 text-sm text-gray-600 font-medium">
                                    <h4 className="font-bold text-gray-900 mb-2">This course includes:</h4>
                                    {course.provides && course.provides.length > 0 ? (
                                        course.provides.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                                                <span>{item}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-indigo-500" />
                                                <span>Lifetime access</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Globe className="w-4 h-4 text-indigo-500" />
                                                <span>Access on mobile and TV</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Award className="w-4 h-4 text-indigo-500" />
                                                <span>Certificate of completion</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 flex justify-between gap-4">
                                    <button
                                        onClick={handleShare}
                                        className="flex-1 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                                    >
                                        Share
                                    </button>
                                    <button
                                        onClick={() => alert('Gift Course feature coming soon!')}
                                        className="flex-1 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                                    >
                                        Gift Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <EnrollmentModal
                isOpen={isEnrollModalOpen}
                onClose={() => setIsEnrollModalOpen(false)}
                course={course}
                onEnrollSuccess={handleEnrollSuccess}
            />

            <VideoPlayerModal
                isOpen={previewModal.isOpen}
                onClose={() => setPreviewModal(prev => ({ ...prev, isOpen: false }))}
                videoId={previewModal.videoId}
                title={previewModal.title}
            />
        </div>
    );
}