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
    Target,
    MessageCircle,
    BookOpen,
    Award
} from "lucide-react";
import FeaturedProgramsSection from "@/components/FeatureProgram";

export default function Home() {
    return (
        <main className="bg-white pt-20 lg:pt-0">

            {/* 1. HERO SECTION */}
            <section className="relative pb-16 pt-24 md:pt-32 lg:pt-40 overflow-hidden bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* Hero Content */}
                        <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
                            {/* Launch Pill */}
                            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                                <span className="text-xs font-medium text-indigo-600">Launch Your Career</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-5 leading-tight">
                                Learn Real <span className="text-gray-400">Skills.</span>
                                <br />
                                <span className="text-indigo-600">Get Real Jobs.</span>
                            </h1>

                            {/* Description */}
                            <p className="text-sm md:text-base text-gray-600 mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                The gap between education and employment ends here. Master outcome-driven skills with guaranteed <span className="font-semibold text-gray-900">On-the-Job Training</span>.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <Link
                                    href="/courses"
                                    className="group inline-flex items-center justify-center px-7 py-3 rounded-full bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                                >
                                    Explore Courses
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="#methodology"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 shadow-sm"
                                >
                                    <Target className="w-4 h-4" />
                                    How It Works
                                </a>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="lg:w-1/2 relative animate-fade-in-right">
                            {/* Stats Badge */}
                            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-white rounded-2xl shadow-lg p-4 z-10 flex items-center gap-3 animate-bounce-slow hover:scale-110 transition-transform duration-300">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry Ready</p>
                                    <p className="text-lg font-bold text-gray-900">OJT Projects</p>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative w-full max-w-lg mx-auto aspect-[4/3] bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl overflow-hidden shadow-xl group">
                                <Image
                                    src="/assets/images/hero-gen.png"
                                    alt="Career success"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add custom animations */}
                <style jsx>{`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    @keyframes fadeInRight {
                        from {
                            opacity: 0;
                            transform: translateX(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    @keyframes bounceSlow {
                        0%, 100% {
                            transform: translateY(0);
                        }
                        50% {
                            transform: translateY(-10px);
                        }
                    }
                    .animate-fade-in-up {
                        animation: fadeInUp 0.8s ease-out;
                    }
                    .animate-fade-in {
                        animation: fadeIn 1s ease-out;
                    }
                    .animate-fade-in-right {
                        animation: fadeInRight 0.8s ease-out 0.2s both;
                    }
                    .animate-bounce-slow {
                        animation: bounceSlow 3s ease-in-out infinite;
                    }
                `}</style>
            </section>


            {/* 2. THE BRIDGE METHOD */}
            <section id="methodology" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            The <span className="text-indigo-600">Bridge</span> Method
                        </h2>
                        <p className="text-base md:text-lg text-gray-600">
                            Your structured timeline from novice to professional.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                        {/* Step 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <BookOpen className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Learn Skills</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Master tools via live mentorship and deep-dive modules tailored to industry needs.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Real Practice</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Join live projects and OJT simulations with senior devs. No dummy projects.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                                <Briefcase className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Hired</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
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

            {/* 3. WHY CHOOSE US */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Content */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10">
                                Why <span className="text-indigo-600">Choose Us?</span>
                            </h2>

                            <div className="space-y-6">
                                {/* Feature 1 */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Target className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Outcome-Driven Learning</h3>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            We looked at what 100+ CTOs want and built our courses backward from there.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Trainer-First Marketplace</h3>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            Learn from engineers who code by day and teach by night. No academic fluff.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Guaranteed Internships</h3>
                                        <p className="text-base text-gray-600 leading-relaxed">
                                            Theory is free. We sell experience. You will work on real products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Collaborative learning"
                                    width={700}
                                    height={500}
                                    className="object-cover w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOUNDER SECTION */}
            <section className="py-16 md:py-24 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-indigo-50 to-violet-50/30 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-indigo-100/50 shadow-xl relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl"></div>

                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                            {/* Founder Image */}
                            <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex-shrink-0 group">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Somya Agrawal - Founder"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Founder Content */}
                            <div className="flex-1 text-center md:text-left space-y-4 md:space-y-5">
                                <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border border-indigo-200/50 text-indigo-600 text-[10px] md:text-[11px] font-semibold uppercase tracking-wider shadow-sm">
                                    Meet The Founder
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">Somya Agrawal</h2>

                                <div className="relative">
                                    <div className="absolute -left-4 -top-2 opacity-10 hidden md:block">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-indigo-600"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H3c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c1 0 1 .5 1 1v2c0 1.5-1.5 4-4 4zM14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-5c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c1 0 1 .5 1 1v2c0 1.5-1.5 4-4 4z"></path></svg>
                                    </div>
                                    <p className="text-sm md:text-base text-slate-600 leading-relaxed italic border-l-4 border-indigo-400 pl-4 md:pl-6 py-2">
                                        "Led by vision-driven founder Somya Agrawal, Vidya-Setu bridges the gap between education and employment. We believe certificates are just paper—real experience is the currency of the modern job market."
                                    </p>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                                    <Link href="#" className="w-10 h-10 md:w-11 md:h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 md:w-11 md:h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md">
                                        <Users className="w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LEVEL UP CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                        Ready to <span className="text-indigo-600">Level Up?</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        Join the ecosystem where skills meet opportunity.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-indigo-600 text-white font-medium text-base hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-600/30"
                        >
                            Start Journey
                        </Link>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-gray-300 bg-white text-gray-700 font-medium text-base hover:border-gray-400 transition-colors duration-200"
                        >
                            <MessageCircle className="w-5 h-5 text-emerald-600" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}