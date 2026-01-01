"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, ShieldCheck, Sparkles, Star } from "lucide-react";

const formatPrice = (price) => {
    if (price === 0) return 'Free';
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

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
};

export default function FeaturedProgramsSection() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('/api/courses?published=true&limit=3');
                const data = await response.json();
                if (data.success) {
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

    if (loading) return null; // Silent loading
    if (courses.length === 0) return null;

    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                            </span>
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Elite Curriculums</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pathways.</span>
                        </h2>
                        <p className="text-slate-500 mt-6 text-lg max-w-xl font-light leading-relaxed">
                            Rigorous, industry-verified programs designed to accelerate your seniority.
                        </p>
                    </motion.div>

                    <Link
                        href="/courses"
                        className="group flex items-center gap-2 text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors pb-1 border-b-2 border-transparent hover:border-indigo-100"
                    >
                        View Full Catalog <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {courses.map((program, index) => {
                        const price = formatPrice(program.price);

                        return (
                            <motion.div key={program._id || index} variants={cardVariants} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}>
                                <Link
                                    href={`/courses/${program.slug}`}
                                    className="group flex flex-col bg-slate-50 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10 border border-slate-100 h-full"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={program.thumbnail}
                                            alt={program.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500"></div>

                                        {/* Badge Overlay */}
                                        <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wide">Verified</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                                                {program.category || 'Engineering'}
                                            </span>
                                            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" /> 4.9
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
                                            {program.title}
                                        </h3>

                                        {/* Meta Row */}
                                        <div className="flex items-center gap-5 text-sm font-medium text-slate-500 mb-8">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-slate-400" />
                                                <span>{program.duration || '8 Weeks'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-slate-400" />
                                                <span>{program.modules?.length || 12} Modules</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400 font-medium mb-0.5">Full Access</p>
                                                <p className="text-lg font-bold text-slate-900">{price}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md hover:scale-110">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}