"use client";
import React, { useEffect, useState } from "react";
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
    Users,
    Building2,
    Trophy,
    Target,
    MessageCircle,
    BookOpen,
    Star,
    ShieldCheck,
    Globe,
    ChevronRight,
    PlayCircle,
    Rocket,
    Code
} from "lucide-react";
import FeaturedProgramsSection from "@/components/FeatureProgram";

export default function Home() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const pedagogySteps = [
        {
            title: "Expert-Led Training",
            desc: "Master high-demand skills through live sessions led by industry veterans who've built at scale.",
            icon: GraduationCap,
            step: "01",
            gradient: "from-indigo-500 to-violet-500"
        },
        {
            title: "Hands-on Projects",
            desc: "Apply your knowledge to real-world industrial projects that mirror actual workplace challenges.",
            icon: Target,
            step: "02",
            gradient: "from-violet-500 to-rose-500"
        },
        {
            title: "Career Acceleration",
            desc: "Get personalized career coaching, resume workshops, and direct access to our hiring network.",
            icon: Rocket,
            step: "03",
            gradient: "from-rose-500 to-orange-500"
        }
    ];

    return (
        <main className="bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 min-h-screen overflow-x-hidden">
            {/* 1. HERO SECTION: COMPACT & RESPONSIVE */}
            <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05),transparent),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.05),transparent)]">
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Content */}
                        <div className={`lg:w-1/2 text-center lg:text-left transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 animate-fade-in-down'}`}>
                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm animate-pulse-subtle">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                <span className="text-[10px] sm:text-xs font-bold text-indigo-700 uppercase tracking-widest">Built for Future Builders</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tighter">
                                Accelerate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-600">
                                    Career Path.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                We bridge the gap between academic theory and industry reality. Gain practical skills and mentorship needed to thrive in today's tech ecosystem.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
                                >
                                    View Pathways <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all"
                                >
                                    Methodology
                                </a>
                            </div>

                            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60">
                                {[
                                    { icon: ShieldCheck, label: "Vetted" },
                                    { icon: BookOpen, label: "Projects" },
                                    { icon: Users, label: "Mentors" }
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <badge.icon className="w-4 h-4 text-indigo-600" />
                                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Component */}
                        <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0 animate-zoom-in'}`}>
                            <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 sm:border-8 border-white group">
                                <Image
                                    src="/assets/images/hero-gen.png"
                                    alt="Learning community"
                                    width={800}
                                    height={1000}
                                    className="object-cover w-full aspect-video lg:aspect-square group-hover:scale-110 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl border border-white/20 shadow-xl hidden sm:flex items-center gap-3">
                                    <div className="p-2 bg-indigo-600 rounded-lg">
                                        <PlayCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-xs font-black text-slate-800">Learn from Architects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. PEDAGOGY: ANIMATED STEPS */}
            <section id="how-it-works" className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-12 text-center mx-auto transition-all duration-700 delay-500">
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Our <span className="text-indigo-600 italic">Framework</span></h2>
                        <p className="text-base text-slate-500 font-medium">Outcome-driven process for professional excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {pedagogySteps.map((step, idx) => (
                            <div key={idx} className={`relative p-8 lg:p-10 bg-white border border-slate-100 rounded-[2rem] group hover:border-indigo-100 transition-all duration-500 hover:shadow-2xl animate-slide-in-bottom`} style={{ animationDelay: `${idx * 200}ms` }}>
                                <div className="absolute top-4 right-6 text-6xl font-black text-indigo-50/30 group-hover:text-indigo-100 transition-colors">{step.step}</div>
                                <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 group-hover:rotate-12 transition-transform`}>
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-sm lg:text-base text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FEATURED PROGRAMS */}
            <div className="py-8 bg-slate-50">
                <FeaturedProgramsSection />
            </div>

            {/* 5. WHY US: THE STARTUP ADVANTAGE */}
            <section className="py-16 lg:py-24 bg-slate-50 text-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-[100px] pointer-events-none opacity-40"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                        <div className="lg:col-span-7">
                            <div className="text-center lg:text-left animate-slide-in-left">
                                <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-6">Why Vidya-Setu?</span>
                                <h2 className="text-3xl lg:text-6xl font-black mb-10 tracking-tighter leading-tight text-slate-900">
                                    Beyond the <br className="hidden lg:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">
                                        Curriculum.
                                    </span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-6 animate-slide-in-bottom">
                                {[
                                    { title: "Mentorship", desc: "Top Creators", icon: Users, bg: "bg-indigo-50", color: "text-indigo-600" },
                                    { title: "Projects", desc: "Real Scale", icon: Code, bg: "bg-violet-50", color: "text-violet-600" },
                                    { title: "Network", desc: "50+ Partners", icon: Globe, bg: "bg-rose-50", color: "text-rose-600" },
                                    { title: "Quality", desc: "Vetted Docs", icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-600" }
                                ].map((item, i) => (
                                    <div key={i} className="group p-5 lg:p-6 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white hover:border-indigo-200 hover:shadow-xl transition-all duration-500 shadow-sm">
                                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                                            <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${item.color}`} />
                                        </div>
                                        <h4 className="text-base lg:text-lg font-black mb-1 text-slate-900">{item.title}</h4>
                                        <p className="text-[10px] lg:text-xs text-slate-500 font-bold leading-tight">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative animate-tilt-in">
                            <div className="relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border-4 lg:border-8 border-white shadow-2xl aspect-[4/5] lg:aspect-[3/4]">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Focused learning"
                                    fill
                                    className="object-cover"
                                />
                                {/* Bottom overlay for mobile */}
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/30 backdrop-blur-md rounded-2xl border border-white/20 sm:hidden">
                                    <p className="text-[10px] font-black text-center text-slate-900 uppercase tracking-widest">Bridging Academic Reality</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FOUNDER'S VISION */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-50 rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 border border-slate-100 relative animate-fade-in">
                        <div className="lg:w-1/3 flex-shrink-0 animate-float">
                            <div className="relative w-48 h-48 lg:w-72 lg:h-72 mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-2 transition-transform hover:rotate-0 duration-500">
                                <Image
                                    src="/assets/images/founder-profile.jpg"
                                    alt="Somya Agrawal"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <div className="lg:w-2/3 text-center lg:text-left">
                            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-full mb-6">Founder's Letter</span>
                            <h3 className="text-2xl lg:text-4xl font-black text-slate-900 mb-6 italic leading-tight">"Redefining how education meets industry reality."</h3>
                            <p className="text-sm lg:text-lg text-slate-600 font-medium leading-relaxed mb-8">
                                We're building the bridge for the next generation of professionals to walk across with absolute confidence.
                            </p>
                            <div>
                                <h4 className="text-xl font-black text-slate-900">Somya Agrawal</h4>
                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Founder & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="py-20 lg:py-15 text-center bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] opacity-40 animate-pulse-slow"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-bounce-in">
                    <h2 className="text-3xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                        Transform Your <br />
                        <span className="text-indigo-600">Future.</span>
                    </h2>
                    <p className="text-base lg:text-xl text-slate-600 mb-10 font-bold">Be part of our next cohort of builders.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-black text-lg rounded-xl shadow-xl hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95"
                        >
                            Get Started
                        </Link>
                        <a
                            href="https://wa.me/919113645398"
                            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-5 h-5 text-emerald-500" />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <style jsx>{`
                h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
                body { font-family: 'Inter', sans-serif; }

                .animate-fade-in-down { animation: fadeInDown 1s ease-out forwards; }
                .animate-zoom-in { animation: zoomIn 0.8s ease-out forwards; }
                .animate-slide-in-bottom { animation: slideInBottom 0.8s ease-out forwards; }
                .animate-slide-in-left { animation: slideInLeft 1s ease-out forwards; }
                .animate-slide-in-right { animation: slideInRight 1s ease-out forwards; }
                .animate-tilt-in { animation: tiltIn 1.2s ease-out forwards; }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-pulse-subtle { animation: pulseSubtle 4s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
                .animate-bounce-in { animation: bounceIn 1s cubic-bezier(0.36, 0, 0.66, -0.56) 0.5s both, slideInBottom 1s ease-out; }
                .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes slideInBottom {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-40px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes tiltIn {
                    from { opacity: 0; transform: perspective(1000px) rotateY(-10deg) translateY(20px); }
                    to { opacity: 1; transform: perspective(1000px) rotateY(0deg) translateY(0); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes pulseSubtle {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.02); opacity: 0.9; }
                }
                @keyframes pulseSlow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }
                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 0.9; transform: scale(1.1); }
                    80% { opacity: 1; transform: scale(0.89); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </main>
    );
}