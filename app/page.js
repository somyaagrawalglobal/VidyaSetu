"use client";

import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Zap,
    GraduationCap,
    Briefcase,
    CheckCircle,
    TrendingUp,
    Sparkles,
    User,
    Users,
    Building2,
    Trophy,
    ArrowUpRight,
    MessageCircle
} from "lucide-react";
import FeaturedProgramsSection from "@/components/FeatureProgram";
import PrimaryButton from "@/components/PrimaryButton";
import { useEffect } from "react"; // Import useEffect for potential AOS initialization

export default function Home() {

    // NOTE: If you are using an external library like AOS (Animate On Scroll),
    // you must initialize it here. The best way to disable AOS for mobile is within the init function.
    // However, since we cannot control the external AOS configuration here, we will remove 
    // the data-aos attributes from the JSX for maximum compatibility.

    // If using AOS, you should initialize it like this in your main entry point:
    /*
    useEffect(() => {
        // Assuming AOS library is available globally
        if (typeof window !== 'undefined' && typeof AOS !== 'undefined') {
            AOS.init({ 
                // Disables AOS for devices with screens narrower than 768px (standard Tailwind 'md')
                disable: 'phone', 
                once: true 
            }); 
        }
    }, []);
    */

    return (
        // Adjusted overall top padding for mobile (pt-20 is safer) and desktop (lg:pt-0)
        <main className="bg-white pt-20 lg:pt-0 selection:bg-indigo-100 selection:text-indigo-900">

            {/* 1. HERO SECTION: Clean & Impactful */}
            <section className="relative pb-16 pt-16 lg:pt-32 lg:pb-28 overflow-hidden bg-slate-50/30">
                {/* Background Blobs for Depth */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-indigo-50/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 lg:w-[500px] lg:h-[500px] bg-purple-50/40 rounded-full blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* Hero Content */}
                        <div className="lg:w-1/2 text-center lg:text-left z-10">
                            {/* Launch Pill */}
                            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6 transition-all duration-300 hover:bg-indigo-100">
                                <Sparkles className="w-3 h-3" />
                                <span>Launch Your Career</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-slate-900 mb-4 leading-[1.05] tracking-tight">
                                Learn Real <span className="text-slate-200">Skills.</span> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-black">
                                    Get Real Jobs.
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                                The gap between education and employment ends here. Master outcome-driven skills with guaranteed <span className="text-slate-900 font-bold">On-the-Job Training</span>.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/courses"
                                    className="h-14 px-10 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    Explore Courses
                                </Link>
                                <a
                                    href="#methodology"
                                    className="h-14 px-10 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <TrendingUp className="w-4 h-4 text-indigo-500" />
                                    How It Works
                                </a>
                            </div>
                        </div>

                        {/* Hero Interactive Element (Badge & Layout) */}
                        <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                            <div className="relative">
                                {/* Decorative "Placement Rate" Badge */}
                                <div className="absolute -top-12 -left-12 sm:-left-20 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-indigo-50 z-20 flex items-center gap-4 animate-bounce-slow">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
                                        <Briefcase className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Placement Rate</p>
                                        <p className="text-xl font-black text-slate-900">94% Hired</p>
                                    </div>
                                </div>

                                {/* Hero Visual Image */}
                                <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[450px] bg-gradient-to-br from-indigo-100 via-white to-purple-100 rounded-[3rem] shadow-inner relative overflow-hidden group">
                                    <Image
                                        src="/assets/images/hero-gen.png"
                                        alt="Career success visualization"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="opacity-90 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. THE BRIDGE METHOD: Step-by-Step Pathway */}
            <section id="methodology" className="bg-white py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                        The <span className="text-indigo-600 font-black">Bridge</span> Method
                    </h2>
                    <p className="text-slate-500 font-bold mb-16 tracking-tight uppercase text-xs text-balance">
                        Your structured timeline from novice to professional.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Step 1: Learn Skills */}
                        <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-indigo-100/40 hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-10 mx-auto transition-transform duration-500 group-hover:rotate-6">
                                <GraduationCap className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">1. Learn Skills</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Master tools via live mentorship and deep-dive modules tailored to industry needs.
                            </p>
                        </div>

                        {/* Step 2: Real Practice */}
                        <div className="p-10 rounded-[2.5rem] bg-indigo-50/20 border border-indigo-100/30 shadow-xl shadow-slate-100/50 hover:shadow-indigo-100/40 hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-10 mx-auto transition-transform duration-500 group-hover:-rotate-6">
                                <Users className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">2. Real Practice</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Join live projects and OJT simulations with senior devs. No dummy projects.
                            </p>
                        </div>

                        {/* Step 3: Get Hired */}
                        <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-indigo-100/40 hover:-translate-y-2 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-10 mx-auto transition-transform duration-500 group-hover:rotate-6">
                                <Briefcase className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">3. Get Hired</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Direct referrals to partner startups and internal roles. Your career starts here.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. FEATURED PROGRAMS (Existing Component) */}
            {/* Adjusted Vertical Padding for better rhythm */}
            <div className="py-16 md:py-24 bg-slate-50">
                <FeaturedProgramsSection />
            </div>

            {/* 6. WHY VIDYA-SETU? */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-12 tracking-tight">
                                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-black">Vidya-Setu?</span>
                            </h2>
                            <div className="space-y-10">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-indigo-100">
                                        <TrendingUp className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">Outcome-Driven Learning</h3>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
                                            We looked at what 100+ CTOs want and built our courses backward from there.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:-rotate-6 transition-all duration-300 shadow-sm border border-purple-100">
                                        <Zap className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">Trainer-First Marketplace</h3>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
                                            Learn from engineers who code by day and teach by night. No academic fluff.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 group">
                                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-all duration-300 shadow-sm border border-emerald-100">
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">Guaranteed Internships</h3>
                                        <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
                                            Theory is free. We sell experience. You will work on real products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual for Why Us */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100 border-8 border-white group">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Collaborative learning environment"
                                    width={700}
                                    height={500}
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-indigo-600 shadow-xl uppercase tracking-[0.2em]">Our Community</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOUNDER SECTION */}
            <section className="py-24 bg-slate-50/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#EEF2FF] rounded-[3rem] p-10 md:p-16 border border-indigo-100 shadow-2xl shadow-indigo-100/50 relative overflow-hidden group">

                        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 rotate-3 group-hover:rotate-0 transition-all duration-700">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Somya Agrawal - Founder"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                    Meet The Founder
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Somya Agrawal</h2>

                                <div className="relative">
                                    <div className="absolute -left-6 -top-2 opacity-10">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-indigo-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H3c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c1 0 1 .5 1 1v2c0 1.5-1.5 4-4 4zM14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-5c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c1 0 1 .5 1 1v2c0 1.5-1.5 4-4 4z"></path></svg>
                                    </div>
                                    <p className="text-base font-bold text-slate-700 leading-relaxed italic border-l-4 border-indigo-300 pl-6 py-2">
                                        "Led by vision-driven founder Somya Agrawal, Vidya-Setu is on a mission to make skill learning accessible and job-aligned. We believe that certificates are just paper—real experience is the currency of the modern job market."
                                    </p>
                                </div>

                                <div className="mt-10 flex items-center gap-4">
                                    <Link href="#" className="w-10 h-10 bg-white border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                                        <Building2 className="w-5 h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 bg-white border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
                                        <Users className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. LEVEL UP CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 font-black">Level Up?</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-bold mb-12 tracking-tight">
                        Join the ecosystem where skills meet opportunity.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/courses"
                            className="h-14 px-12 rounded-2xl bg-indigo-600 text-white font-black text-sm shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all duration-300 flex items-center justify-center"
                        >
                            Start Journey
                        </Link>
                        <a
                            href="#"
                            className="h-14 px-12 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <MessageCircle className="w-5 h-5 text-emerald-500" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}