"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Users,
    Briefcase,
    Workflow,
    Sparkles,
    Lightbulb,
    TrendingUp,
    Zap,
    BookOpen,
    ArrowRight,
    Handshake,
    ArrowLeft,
    ChevronDown,
    GraduationCap,
    CheckCircle2
} from "lucide-react";
import { useEffect, useState } from "react";

export default function About() {
    const [isMobile, setIsMobile] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);
    const [bridgeVisible, setBridgeVisible] = useState(false);
    const [pillarsVisible, setPillarsVisible] = useState(false);
    const [founderVisible, setFounderVisible] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const timer1 = setTimeout(() => setHeroVisible(true), 200);
        const timer2 = setTimeout(() => setBridgeVisible(true), 600);
        const timer3 = setTimeout(() => setPillarsVisible(true), 900);
        const timer4 = setTimeout(() => setFounderVisible(true), 1200);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    // Animation helper - Disabled on mobile
    const animate = (isVisible, delay = "") => {
        if (isMobile) return "";
        return `transform transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            } ${delay}`;
    };

    return (
        <main className="text-slate-800 bg-[#FCFCFD] font-sans overflow-x-hidden min-h-screen">

            {/* 1. Hero/Introduction */}
            <section className="relative pt-24 pb-10 lg:pt-30 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.05),transparent_70%)]"></div>
                <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] opacity-60"></div>

                <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative">

                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm mb-8 ${animate(heroVisible)}`}>
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Our Foundation</span>
                    </div>

                    {/* Title - Reduced Size from 4xl/7xl to smaller premium range */}
                    <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1] ${animate(heroVisible, 'delay-100')}`}>
                        Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Bridge</span><br />
                        to Elite Careers.
                    </h1>

                    <p className={`mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light ${animate(heroVisible, 'delay-200')}`}>
                        Vidya-Setu exists to solve the employability crisis. We don't just educate—we architect the professional
                        pipeline, connecting high-potential talent with guaranteed outcomes.
                    </p>
                </div>
            </section>

            {/* 2. The Bridge Metaphor - Clean Interactive UI */}
            <section className="py-24 bg-white border-y border-slate-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left: Content */}
                        <div className={`lg:sticky lg:top-8 ${animate(bridgeVisible)}`}>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                                Breaking the <br /><span className="text-indigo-600">Competence Wall.</span>
                            </h2>
                            <p className="text-base text-slate-600 mb-10 leading-relaxed font-light border-l-2 border-indigo-200 pl-6">
                                The gap between theoretical knowledge and workplace competence is vast. We provide the structured, project-driven pathway needed for real-world mastery.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { i: "01", t: "Project-Centric Learning", d: "Solve actual, large-scale business problems in a simulated environment." },
                                    { i: "02", t: "Guaranteed OJT", d: "Verified performance leads directly to compensated industry experience." },
                                    { i: "03", t: "Employer-Verified Skills", d: "Skills validated directly by industry experts, not just arbitrary tests." }
                                ].map((item, idx) => (
                                    <div key={idx} className="group p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{item.i}</span>
                                            <h4 className="text-base font-bold text-slate-900">{item.t}</h4>
                                        </div>
                                        <p className="text-sm text-slate-500 leading-relaxed pl-[3rem]">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Vertical Timeline Visualization */}
                        <div className={`relative flex flex-col items-center justify-center space-y-4 ${animate(bridgeVisible, 'delay-200')}`}>

                            {/* Step 1 */}
                            <div className="w-full max-w-sm p-6 bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 opacity-60">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stage 01</span>
                                    <GraduationCap className="w-5 h-5 text-slate-400" />
                                </div>
                                <p className="text-lg font-bold text-slate-800">Academia</p>
                                <p className="text-xs text-slate-400 mt-1">Abstract Theory & Concepts</p>
                            </div>

                            <ChevronDown className="w-6 h-6 text-slate-300 animate-bounce" />

                            {/* Step 2 - Highlight */}
                            <div className="w-full max-w-md p-8 bg-indigo-600 rounded-[2rem] shadow-2xl shadow-indigo-600/30 transform scale-105 z-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Stage 02</span>
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-2xl font-bold text-white mb-2">VIDYA-SETU</p>
                                <p className="text-sm text-indigo-100 font-medium leading-relaxed">The Implementation Bridge. <br />converting theory into shipping code.</p>

                                <div className="mt-6 flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/30"></div>)}
                                    </div>
                                    <span className="text-[10px] text-white/80 font-bold ml-2">500+ Qualified</span>
                                </div>
                            </div>

                            <ChevronDown className="w-6 h-6 text-indigo-600 animate-bounce delay-100" />

                            {/* Step 3 */}
                            <div className="w-full max-w-sm p-6 bg-white rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/10">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Final Goal</span>
                                    <Briefcase className="w-5 h-5 text-emerald-500" />
                                </div>
                                <p className="text-lg font-bold text-slate-900">Industry</p>
                                <p className="text-xs text-slate-500 mt-1">High-Impact Employment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Pillars - Minimalist Cards */}
            <section className="py-24 bg-[#FCFCFD]">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className={`text-center mb-16 ${animate(pillarsVisible)}`}>
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">Our DNA</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">The Three Pillars of Quality</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Workflow, color: "text-blue-600", bg: "bg-blue-50", title: "Outcome-Oriented", desc: "We measure success by job placements and career velocity, not just completion rates." },
                            { icon: Users, color: "text-purple-600", bg: "bg-purple-50", title: "Active Mentorship", desc: "A network of industry professionals ensures continuous, high-fidelity feedback loops." },
                            { icon: Zap, color: "text-amber-600", bg: "bg-amber-50", title: "Liquid Curriculum", desc: "Our syllabus updates monthly to reflect the exact stack requested by hiring partners." }
                        ].map((card, idx) => (
                            <div key={idx} className={`p-8 bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ${animate(pillarsVisible, `delay-${(idx + 1) * 100}`)}`}>
                                <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <card.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Founder Story - Reduced Scale */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                        {/* Image */}
                        <div className={`md:w-1/2 w-full ${animate(founderVisible)}`}>
                            <div className="relative w-full aspect-[4/5] max-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Founder"
                                    fill
                                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-bold text-lg">Dr. Somya Gupta</p>
                                    <p className="text-xs text-indigo-300 font-medium uppercase tracking-wider">Founder & Visionary</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className={`md:w-1/2 w-full ${animate(founderVisible, 'delay-200')}`}>
                            <div className="inline-flex items-center gap-2 mb-6">
                                <div className="w-8 h-[2px] bg-slate-200"></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Leadership Note</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                                "We don't sell courses.<br /> We sell <span className="text-indigo-600">competence.</span>"
                            </h2>

                            <div className="space-y-6 text-sm md:text-base text-slate-600 font-light leading-relaxed">
                                <p>
                                    My journey began with a frustration: seeing highly educated graduates unable to secure quality jobs due to a lack of practical skills.
                                </p>
                                <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-indigo-600 italic text-slate-700 font-medium">
                                    "We believe education must be accountable. If a student puts in the effort, we guarantee the outcome—real job capability verified by industry standards."
                                </div>
                                <p>
                                    This realization fueled the inception of Vidya-Setu. We are the bridge between potential and performance.
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <Image src="/assets/images/hero-gen.png" width={40} height={40} className="rounded-full grayscale opacity-50" alt="signature" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}