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
        // Standard vertical padding: py-16 on mobile, py-24 on desktop
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
            {/* *RESPONSIVE FIX*: Ensure standard horizontal padding on small screens (px-4) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header and CTA */}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 sm:mb-16 text-center sm:text-left">
                    <div className="w-full sm:w-auto mb-8 sm:mb-0">
                        {/* Center pill on mobile, left on larger screens */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-4 border border-indigo-100/50 shadow-sm mx-auto sm:mx-0">
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            Our Best-Sellers
                        </div>
                        {/* Responsive Heading Size: 3xl on mobile, 4xl on desktop */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                            Featured <span className="text-indigo-600">Programs</span>
                        </h2>
                        {/* Responsive Subtitle: max-w-none on mobile for centered text */}
                        <p className="text-sm text-slate-500 mt-4 font-medium max-w-full sm:max-w-xl mx-auto sm:mx-0 leading-relaxed">
                            Industry-aligned certification programs designed by experts to make you job-ready in weeks.
                        </p>
                    </div>

                    {/* CTA Link */}
                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:text-indigo-800 transition-all border-b-2 border-transparent hover:border-indigo-600 pb-1 flex-shrink-0"
                    >
                        Explore All Paths <ArrowRight className="w-4 h-4 transition-transform group-hover:md:translate-x-1" />
                    </Link>
                </div>

                {/* Course Cards Grid - Key Responsiveness */}
                {/* *RESPONSIVE FIX*: Grid ensures 1 column on mobile, 2 on medium, 3 on large */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {courses.map((program, index) => {
                        const price = formatPrice(program.price);
                        const originalPrice = program.originalPrice ? formatPrice(program.originalPrice) : null;
                        // Use a dummy discount badge if not available, for consistency
                        const discountBadge = program.discount || "50% OFF";

                        return (
                            <div
                                key={program._id || index}
                                // Card Hover Effect: subtle lift and stronger shadow restricted to md: and up
                                className="bg-white rounded-xl overflow-hidden shadow-md md:hover:shadow-2xl md:hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-slate-200 md:hover:border-indigo-300 h-full relative"
                            // Removed data-aos and data-aos-delay
                            >
                                {/* --- 1. Top Graphic Header Section --- */}
                                {/* Ensure image container is reasonably sized on mobile */}
                                <div className="relative h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={program.thumbnail} // Use the course's thumbnail or the default set in useEffect
                                        alt={program.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:md:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>

                                    {discountBadge && (
                                        <div className="absolute top-4 left-4 py-1 px-3 bg-indigo-600 text-white font-bold text-[10px] uppercase rounded shadow-lg z-20">
                                            {discountBadge}
                                        </div>
                                    )}
                                </div>

                                {/* --- 2. Content Body Section --- */}
                                {/* *RESPONSIVE FIX*: Using flex-1 to push the footer to the bottom and ensure uniform card height */}
                                <div className="p-4 sm:p-5 flex flex-col flex-1">
                                    {/* Topic Badge & Career Track */}
                                    {/* Adjusted font size for better mobile fit */}
                                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                                        <span className="inline-block px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50 rounded-md">
                                            {program.category || 'Professional Skills'}
                                        </span>
                                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-emerald-600">
                                            <Zap className="w-3 h-3" /> Career Track
                                        </div>
                                    </div>

                                    {/* Title - Restricted hover color change to md: and up */}
                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] group-hover:md:text-indigo-600 transition-colors duration-200">
                                        <Link href={`/courses/${program.slug}`}>
                                            {program.title}
                                        </Link>
                                    </h3>

                                    {/* Description - smaller text on mobile for better fit */}
                                    <p className="text-slate-500 text-xs sm:text-sm mb-6 line-clamp-3 min-h-[3rem] sm:min-h-[3.75rem] font-medium leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Meta Data Line */}
                                    <div className="flex items-center justify-between py-3 border-y border-slate-50 mb-6">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {/* Adjusted font size for meta data */}
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                                                <span>{program.duration || '8 Weeks'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                <User className="w-3.5 h-3.5 text-indigo-500" />
                                                <span>{program.modules?.length || 5} Lessons</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- 3. Footer/CTA Area --- */}
                                    <div className="flex justify-between items-center mt-auto">
                                        <div className="flex flex-col">
                                            {originalPrice && (
                                                <span className="text-xs text-slate-400 line-through mb-0.5">
                                                    {originalPrice}
                                                </span>
                                            )}
                                            {/* Price is prominent */}
                                            <span className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                                                {price}
                                            </span>
                                        </div>

                                        {/* CTA Button with Smooth Hover - Restricted hover/active animations to md: and up */}
                                        {/* Slightly smaller button on mobile (text-xs) */}
                                        <Link
                                            href={`/courses/${program.slug}`}
                                            className="inline-flex items-center gap-2 bg-slate-800 text-white font-bold py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg text-xs transition-all duration-200 md:hover:bg-indigo-600 shadow-lg shadow-slate-800/10 md:active:scale-95 group/btn"
                                        >
                                            View Details
                                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:md:translate-x-1 transition-transform duration-200" />
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