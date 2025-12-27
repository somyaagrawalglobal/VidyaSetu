"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Zap, DollarSign, BookOpen, User, Loader2 } from "lucide-react";
import ProgramBadge from "./ProgramBadge";

const formatPrice = (price) => {
    if (price === 0) return 'Free';
    if (typeof price === 'number') return `₹${price}`;
    return price || 'Price Varies';
};


export default function FeaturedProgramsSection() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('/api/courses?published=true');
                const data = await response.json();
                if (data.success) {
                    setCourses(data.courses.slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (courses.length === 0) return null;

    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header and CTA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16">
                    <div className="text-left mb-6 sm:mb-0" data-aos="fade-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-4 border border-indigo-100/50">
                            Our Best-Sellers
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                            Featured <span className="text-indigo-600">Programs</span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-3 font-medium max-w-lg leading-relaxed">
                            Industry-aligned certification programs designed by experts to make you job-ready in weeks.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:text-indigo-800 transition-all border-b-2 border-transparent hover:border-indigo-600 pb-1"
                        data-aos="fade-left"
                    >
                        Explore All Path <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((program, index) => {
                        const price = formatPrice(program.price);
                        const originalPrice = program.originalPrice ? formatPrice(program.originalPrice) : null;
                        const discountBadge = program.discount || "50% OFF";

                        return (
                            <div
                                key={program._id || index}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group border border-slate-200 hover:border-indigo-200 h-full relative"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* --- 1. Top Graphic Header Section --- */}
                                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={program.image || '/assets/images/course-placeholder.jpg'}
                                        alt={program.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

                                    {discountBadge && (
                                        <div className="absolute top-4 left-4 py-1 px-3 bg-indigo-600 text-white font-bold text-[10px] uppercase rounded shadow-sm z-20">
                                            {discountBadge}
                                        </div>
                                    )}
                                </div>

                                {/* --- 2. Content Body Section --- */}
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Topic Badge */}
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="inline-block px-2.5 py-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-md">
                                            {program.category || 'Professional Skills'}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                            <Zap className="w-3 h-3" /> Career Track
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-bold text-slate-800 leading-snug mb-3 line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition-colors">
                                        <Link href={`/courses/${program.slug}`}>
                                            {program.title}
                                        </Link>
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-500 text-[13px] mb-6 line-clamp-2 min-h-[2.5rem] font-medium leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Meta Data Line */}
                                    <div className="flex items-center justify-between py-3 border-y border-slate-50 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                                <span>{program.duration || '8 Weeks'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                                <User className="w-3.5 h-3.5 text-indigo-500" />
                                                <span>{program.modules?.length || 5} Lessons</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- 3. Footer/CTA Area --- */}
                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="flex flex-col">
                                            {originalPrice && (
                                                <span className="text-[10px] text-slate-400 line-through mb-0.5">
                                                    {originalPrice}
                                                </span>
                                            )}
                                            <span className="text-xl font-bold text-slate-800 tracking-tight">
                                                {price}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/courses/${program.slug}`}
                                            className="inline-flex items-center gap-2 bg-slate-800 text-white font-bold py-2.5 px-5 rounded-lg text-xs transition-all hover:bg-indigo-600 shadow-sm active:scale-95 group/btn"
                                        >
                                            View Details
                                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
