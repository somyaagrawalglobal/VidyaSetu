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
            <section className="relative pb-12 pt-10 md:pt-24 lg:pt-32 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/60 via-white to-white">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

                        {/* Hero Content */}
                        <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
                            {/* Launch Pill */}
                            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-3 py-1 rounded-full bg-white border border-indigo-100 shadow-sm animate-fade-in">
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                                <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">Launch Your Career</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 mb-4 md:mb-5 leading-tight tracking-tight">
                                Learn Real <span className="text-gray-400">Skills.</span>
                                <br />
                                <span className="text-indigo-600">Get Real Jobs.</span>
                            </h1>

                            {/* Description */}
                            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-7 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                The gap between education and employment ends here. Master outcome-driven skills with guaranteed <span className="font-semibold text-gray-900 underline decoration-indigo-200 decoration-2 underline-offset-2">On-the-Job Training</span>.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                                <Link
                                    href="/courses"
                                    className="group inline-flex items-center justify-center px-7 py-3 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-indigo-500 ring-offset-2"
                                >
                                    Explore Courses
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="#methodology"
                                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-gray-200 bg-white text-gray-700 font-medium text-sm hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <Target className="w-4 h-4" />
                                    How It Works
                                </a>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="hidden md:block lg:w-1/2 relative animate-fade-in-right w-full mt-8 lg:mt-0">
                            {/* Stats Badge */}
                            <div className="absolute -top-4 left-0 sm:-left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 p-3 md:p-4 z-10 flex items-center gap-3 animate-bounce-slow transition-transform duration-300 transform scale-90 md:scale-100 origin-top-left">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                    <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Industry Ready</p>
                                    <p className="text-base md:text-lg font-bold text-slate-800">OJT Projects</p>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-200/50 group ring-1 ring-black/5">
                                <Image
                                    src="/assets/images/hero-gen.png"
                                    alt="Career success"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add custom animations */}
                <style jsx>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes fadeInRight {
                        from { opacity: 0; transform: translateX(20px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes bounceSlow {
                        0%, 100% { transform: translateY(0) scale(var(--tw-scale-x)); }
                        50% { transform: translateY(-8px) scale(var(--tw-scale-x)); }
                    }
                    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                    .animate-fade-in { animation: fadeIn 1.2s ease-out; }
                    .animate-fade-in-right { animation: fadeInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
                    .animate-bounce-slow { animation: bounceSlow 4s ease-in-out infinite; }
                `}</style>
            </section>


            {/* 2. THE BRIDGE METHOD */}
            <section id="methodology" className="py-12 md:py-24 bg-white relative">
                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            The <span className="text-indigo-600">Bridge</span> Method
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                            Your structured timeline from novice to professional.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                        {/* Step 1 */}
                        <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-white rounded-2xl flex items-center justify-center mb-6 border border-indigo-50 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <BookOpen className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">1. Learn Skills</h3>
                            <p className="text-base text-gray-600 leading-relaxed font-medium">
                                Master tools via live mentorship and deep-dive modules tailored to industry needs.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-white rounded-2xl flex items-center justify-center mb-6 border border-indigo-50 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Users className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">2. Real Practice</h3>
                            <p className="text-base text-gray-600 leading-relaxed font-medium">
                                Join live projects and OJT simulations with senior devs. No dummy projects.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-100 transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-white rounded-2xl flex items-center justify-center mb-6 border border-emerald-50 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Briefcase className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">3. Get Hired</h3>
                            <p className="text-base text-gray-600 leading-relaxed font-medium">
                                Direct referrals to partner startups and internal roles. Your career starts here.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 5. FEATURED PROGRAMS (Existing Component) */}
            <FeaturedProgramsSection />

            {/* 3. WHY CHOOSE US */}
            <section className="py-12 md:py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        {/* Content */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-10 tracking-tight">
                                Why <span className="text-indigo-600">Choose Us?</span>
                            </h2>

                            <div className="space-y-8">
                                {/* Feature 1 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-indigo-50 group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Outcome-Driven Learning</h3>
                                        <p className="text-base text-gray-500 leading-relaxed font-medium">
                                            We looked at what 100+ CTOs want and built our courses backward from there.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-indigo-50 group-hover:scale-110 transition-transform duration-300">
                                        <Users className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Trainer-First Marketplace</h3>
                                        <p className="text-base text-gray-500 leading-relaxed font-medium">
                                            Learn from engineers who code by day and teach by night. No academic fluff.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-pink-50 group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Guaranteed Internships</h3>
                                        <p className="text-base text-gray-500 leading-relaxed font-medium">
                                            Theory is free. We sell experience. You will work on real products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-indigo-600 rounded-3xl rotate-3 opacity-10"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Collaborative learning"
                                    width={700}
                                    height={500}
                                    className="object-cover w-full h-auto hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOUNDER SECTION */}
            <section className="py-12 md:py-24 lg:py-28 bg-white overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden group">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] opacity-40"></div>

                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
                            {/* Founder Image */}
                            <div className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-slate-700 flex-shrink-0">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Somya Agrawal - Founder"
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Founder Content */}
                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 text-[10px] md:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                    Meet The Founder
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">Somya Agrawal</h2>

                                <div className="relative">
                                    <div className="absolute -left-5 -top-3 opacity-20 hidden md:block">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400"><path d="M14.017 21L14.017 18C14.017 16.082 14.321 15.243 14.929 14.485C15.537 13.727 16.591 13 18.09 12.219V9.10901C15.823 10.046 14.471 10.875 14.032 11.597C13.593 12.319 13.374 13.568 13.374 15.344V21H14.017ZM5.016 21L5.016 18C5.016 16.082 5.32 15.243 5.928 14.485C6.536 13.727 7.59 13 9.089 12.219V9.10901C6.822 10.046 5.47 10.875 5.031 11.597C4.592 12.319 4.373 13.568 4.373 15.344V21H5.016Z" /></svg>
                                    </div>
                                    <p className="text-sm md:text-base text-indigo-50 leading-relaxed font-medium pl-0 md:pl-2">
                                        "Led by vision-driven founder Somya Agrawal, Vidya-Setu bridges the gap between education and employment. We believe certificates are just paper—real experience is the currency of the modern job market."
                                    </p>
                                </div>

                                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                    <Link href="#" className="w-10 h-10 md:w-11 md:h-11 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20">
                                        <Building2 className="w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                    <Link href="#" className="w-10 h-10 md:w-11 md:h-11 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20">
                                        <Users className="w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LEVEL UP CTA */}
            <section className="py-12 md:py-24 bg-white">
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
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-4 rounded-full bg-indigo-600 text-white font-medium text-base hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-600/30"
                        >
                            Start Journey
                        </Link>
                        <a
                            href="#"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-4 rounded-full border-2 border-gray-300 bg-white text-gray-700 font-medium text-base hover:border-gray-400 transition-colors duration-200"
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