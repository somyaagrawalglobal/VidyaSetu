"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Zap, DollarSign, BookOpen, User, Loader2, Sparkles } from "lucide-react";
// Assuming ProgramBadge is a separate component and properly styled for responsiveness
import ProgramBadge from "./ProgramBadge";
import Loader from "./Loader";

const formatPrice = (price) => {
    if (price === 0) return 'Free';
    // Use Intl.NumberFormat for better currency formatting
    if (typeof price === 'number') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }
    return price || 'Price Varies';
};


export default function FeaturedProgramsSection() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                // Fetching only 3 courses for the "Featured" section
                const response = await fetch('/api/courses?published=true&limit=3');
                const data = await response.json();
                if (data.success) {
                    // Using the uploaded image for placeholders if the course data doesn't provide one
                    const defaultImagePath = "/assets/images/redesigned-hero-image.png";
                    const coursesWithThumbnails = data.courses.slice(0, 3).map(course => ({
                        ...course,
                        thumbnail: course.thumbnail || defaultImagePath
                    }));
                    setCourses(coursesWithThumbnails);
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
        return <Loader text="Loading programs..." />;
    }

    // Only render if there are courses to show
    if (courses.length === 0) return null;

    return (
        <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle decorative element to match homepage */}
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-indigo-100/20 rounded-full blur-[80px] pointer-events-none opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section: Aligned with Homepage Framework Section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 lg:mb-12 gap-6 text-center md:text-left">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-indigo-100 shadow-sm mx-auto md:mx-0">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            Industry Favorite
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                            Featured <span className="text-indigo-600 italic">Programs</span>
                        </h2>
                        <p className="text-sm lg:text-base text-slate-500 mt-3 font-medium leading-relaxed">
                            Upskill with certification tracks designed to accelerate your growth.
                        </p>
                    </div>

                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-[0.2em] hover:text-indigo-800 transition-all border-b-2 border-transparent hover:border-indigo-600 pb-1"
                    >
                        Explore All Paths <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Animated Grid Wrapper */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 animate-slide-in-bottom">
                    {courses.map((program, index) => {
                        const price = formatPrice(program.price);
                        const originalPrice = program.originalPrice ? formatPrice(program.originalPrice) : null;
                        const discountBadge = program.discount || "50% OFF";

                        return (
                            <div
                                key={program._id || index}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-slate-200 hover:border-indigo-200 h-full relative"
                            >
                                {/* Top Graphic Header Section */}
                                <div className="relative h-48 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={program.thumbnail}
                                        alt={program.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

                                    {discountBadge && (
                                        <div className="absolute top-4 left-4 py-1 px-3 bg-indigo-600 text-white font-bold text-[10px] uppercase rounded-lg shadow-lg z-20">
                                            {discountBadge}
                                        </div>
                                    )}
                                </div>

                                {/* Content Body Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="mb-4 flex items-center gap-2 flex-wrap">
                                        <span className="inline-block px-2 py-0.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-md">
                                            {program.category || 'Professional Skills'}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                                            <Zap className="w-3 h-3" /> Industry Standard
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-black text-slate-800 leading-tight mb-3 line-clamp-2 min-h-[3rem] group-hover:text-indigo-600 transition-colors">
                                        <Link href={`/courses/${program.slug}`}>
                                            {program.title}
                                        </Link>
                                    </h3>

                                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 min-h-[2.5rem] font-medium leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div className="flex items-center justify-between py-4 border-y border-slate-50 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                                {program.duration || '8 Weeks'}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                                                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                                                {program.modules?.length || 5} Modules
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="flex flex-col">
                                            {originalPrice && (
                                                <span className="text-[10px] text-slate-400 line-through mb-0.5">
                                                    {originalPrice}
                                                </span>
                                            )}
                                            <span className="text-xl font-black text-slate-800 tracking-tight">
                                                {price}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/courses/${program.slug}`}
                                            className="inline-flex items-center gap-2 bg-slate-900 text-white font-black py-2.5 px-5 rounded-xl text-xs transition-all hover:bg-indigo-600 shadow-lg shadow-slate-900/10 active:scale-95 group/btn"
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
