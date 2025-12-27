import Link from 'next/link';
import Image from 'next/image';
import { Clock, Zap, BookOpen, User, ArrowRight, BarChart, CheckCircle } from 'lucide-react';

export default function CourseCard({ course, enrolled = false }) {
    const formatPrice = (price) => {
        if (price === 0) return 'Free';
        if (typeof price === 'number') return `₹${price.toLocaleString('en-IN')}`;
        return price;
    };

    const price = formatPrice(course.price);
    const originalPrice = course.originalPrice ? formatPrice(course.originalPrice) : null;
    const hasDiscount = course.originalPrice && course.originalPrice > course.price;

    // Fallback for instructor name
    const instructorName = course.instructor
        ? `${course.instructor.firstName} ${course.instructor.lastName}`
        : 'Expert Instructor';

    const actionUrl = enrolled
        ? `/courses/${course.slug || course._id}/watch`
        : `/courses/${course.slug || course._id}`;

    const actionText = enrolled ? 'Watch' : 'Enroll';

    return (
        <div
            className="bg-white rounded-[1rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 flex flex-col group border border-slate-100/80 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(79,70,229,0.12)] h-full"
        >
            {/* --- 1. Top Graphic Section --- */}
            <div className="relative h-56 flex items-center justify-center overflow-hidden">
                {/* Course Image */}
                {course.thumbnail ? (
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-all duration-1000 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        No Image
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Level/Category Floating Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-wider shadow-sm border border-white/50">
                        {course.category || 'General'}
                    </span>
                    {course.level && (
                        <span className="px-3 py-1.5 bg-indigo-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {course.level}
                        </span>
                    )}
                </div>
            </div>

            {/* --- 2. Content Body --- */}
            <div className="p-7 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
                    <Link href={actionUrl}>
                        {course.title}
                    </Link>
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem] leading-relaxed">
                    {course.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-slate-50">
                    <div className="flex items-center text-slate-500">
                        <BookOpen className="w-4 h-4 mr-2 text-indigo-400" />
                        <span className="text-xs font-semibold">{course.modules?.length || 0} Modules</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                        <BarChart className="w-4 h-4 mr-2 text-indigo-400" />
                        <span className="text-xs font-semibold">{course.level || 'All Levels'}</span>
                    </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold text-xs border border-indigo-100">
                        {instructorName.charAt(0)}
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-0.5">Instructor</p>
                        <p className="text-sm font-bold text-slate-700">{instructorName}</p>
                    </div>
                </div>

                {/* --- 3. Footer Area --- */}
                <div className="flex justify-between items-center mt-auto">
                    <div className="flex flex-col">
                        {!enrolled ? (
                            <>
                                {hasDiscount && (
                                    <span className="text-xs text-slate-400 line-through font-medium mb-0.5">
                                        {originalPrice}
                                    </span>
                                )}
                                <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                                    {price}
                                </span>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                                <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                            </div>
                        )}
                    </div>

                    <Link
                        href={actionUrl}
                        className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-2xl transition-all duration-300 hover:bg-slate-900 group-hover:w-32 group-hover:rounded-full relative"
                    >
                        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-sm left-6">{actionText}</span>
                        <ArrowRight className="w-5 h-5 group-hover:ml-16 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
