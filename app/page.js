"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
    ArrowRight,
    ShieldCheck,
    Cpu,
    Globe,
    Rocket,
    Trophy,
    Sparkles,
    Star
} from "lucide-react";
import FeaturedProgramsSection from "@/components/FeatureProgram";
import PrimaryButton from "@/components/PrimaryButton";
import FinalCTA from "@/components/CTA";

// --- Animation Variants ---

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export default function Home() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    // Parallax effect for Hero Background
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <main ref={targetRef} className="bg-slate-50 min-h-screen selection:bg-indigo-100 selection:text-indigo-900 scroll-smooth font-sans overflow-x-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">

                {/* Background Elements */}
                <motion.div style={{ y: yBg, opacity: opacityBg }} className="absolute inset-0 -z-10 h-full w-full pointer-events-none">
                    <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-50/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
                </motion.div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Hero Content */}
                        <motion.div
                            className="lg:w-1/2 text-center lg:text-left z-10"
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {/* Badge */}
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm text-indigo-700 text-xs font-bold tracking-wide mb-8 hover:shadow-md hover:scale-105 transition-all cursor-pointer group">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
                                </span>
                                <span className="uppercase tracking-widest group-hover:text-indigo-800 transition-colors">Cohort 2026: Applications Open</span>
                                <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                            </motion.div>

                            {/* Heading */}
                            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.05]">
                                The Apex <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 animate-text-gradient bg-300%">
                                    Engineering Program.
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                                A <strong className="text-slate-900 font-semibold">$1M mentorship</strong> experience condensed into a verified portfolio. Designed for the top 1% of ambitious engineers.
                            </motion.p>

                            {/* Buttons */}
                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                                <PrimaryButton href="/application" className="!bg-indigo-600 !text-white hover:!bg-indigo-700 !shadow-xl !shadow-indigo-600/20 font-bold h-14 px-10 rounded-2xl text-base transition-all hover:-translate-y-1">
                                    Request Access
                                </PrimaryButton>
                                <a href="#curriculum" className="h-14 px-10 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-600 font-medium hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg text-base group">
                                    View Syllabus
                                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Hero Visual */}
                        <motion.div
                            className="lg:w-1/2 relative perspective-1000"
                            initial={{ opacity: 0, x: 50, rotateY: 10 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        >
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

                            <motion.div
                                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/10 border-4 border-white ring-1 ring-slate-900/5 bg-slate-50 aspect-[4/3] w-full"
                                whileHover={{ scale: 1.02, rotate: 0.5 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src="/assets/images/hero-gen.png"
                                    alt="Elite mentorship session"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />

                                {/* Floating Badges */}
                                <motion.div
                                    className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50 flex items-center gap-3"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Top 1%</p>
                                        <p className="text-xs font-bold text-slate-900">Elite Talent</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 max-w-[200px]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Verified</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 text-sm font-bold">System Architecture</p>
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                className="bg-emerald-500 h-full rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. METHODOLOGY SECTION */}
            <section id="methodology" className="relative py-24 lg:py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                            The <span className="text-indigo-600 relative inline-block">
                                Cognitive Refinement
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span> Cycle
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                            We don't teach. We sculpt professional identity through a proprietary, feedback-intensive loop designed for speed and excellence.
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <MethodologyCard
                            icon={<Cpu className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" />}
                            title="1. Technical Refinement"
                            description="Deep dive into high-scale systems. Learn patterns, not just syntax, with rigorous code reviews from day one."
                            colorClass="bg-blue-50 group-hover:bg-blue-600"
                            delay={0.1}
                        />

                        {/* Card 2 - Active */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            whileHover={{ y: -10 }}
                            className="p-8 lg:p-10 rounded-[2rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden group transform"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none -mr-16 -mt-16"></div>

                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/30 shadow-inner">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">2. Executive Validation</h3>
                            <p className="text-indigo-100 text-base leading-relaxed font-light mb-8">
                                Simulated CTO reviews. Your code is critiqued on production standards, scalability, and business impact.
                            </p>
                            <div className="inline-flex items-center text-sm font-bold text-white uppercase tracking-wider border-b border-white/30 pb-1 group-hover:border-white transition-colors cursor-pointer">
                                The Core Differentiator <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </motion.div>

                        {/* Card 3 */}
                        <MethodologyCard
                            icon={<Trophy className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-500" />}
                            title="3. Market Ascension"
                            description="Direct introductions to venture-backed startups. We don't just find jobs; we negotiate careers."
                            colorClass="bg-purple-50 group-hover:bg-purple-600"
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* 3. FEATURED PROGRAMS */}
            <div id="curriculum" className="bg-white border-t border-slate-100 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="py-24"
                >
                    <FeaturedProgramsSection />
                </motion.div>
            </div>

            {/* 4. MISSION FRAMEWORK */}
            <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row-reverse gap-16 lg:gap-24 items-center">

                        {/* Text Side */}
                        <motion.div
                            className="md:w-1/2"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-8">
                                Why We Exist
                            </motion.div>
                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
                                Curating the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Next Generation.</span>
                            </motion.h2>
                            <motion.div variants={fadeInUp} className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                                <p>
                                    Excellence is non-negotiable. We exist to identify individuals with raw intelligence and give them the <strong className="text-slate-900 font-semibold underline decoration-indigo-300 decoration-2 underline-offset-4">operational context</strong> to lead.
                                </p>
                                <p>
                                    This isn't mass education. It's hyper-optimization for your career trajectory.
                                </p>
                            </motion.div>

                            <motion.button variants={fadeInUp} className="mt-10 text-indigo-600 font-bold text-lg flex items-center gap-3 group">
                                Meet the Architect <div className="w-8 h-[2px] bg-indigo-600 group-hover:w-16 transition-all duration-300"></div>
                            </motion.button>
                        </motion.div>

                        {/* Image Side */}
                        <motion.div
                            className="md:w-1/2 relative"
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border-2 border-indigo-100/50 rounded-[2rem] -z-10 rotate-3 animate-pulse-slow"></div>
                            <div className="absolute -inset-4 border-2 border-purple-100/50 rounded-[2rem] -z-10 -rotate-3 animate-pulse-slow animation-delay-2000"></div>

                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 group max-w-sm mx-auto md:max-w-none">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Dr. Anya Sharma"
                                    width={600}
                                    height={700}
                                    className="object-cover transition-all duration-1000 scale-100 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl p-6 z-20 border-t border-slate-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-slate-800 font-serif italic text-lg mb-2 leading-tight">"Talent is universal, opportunity is not."</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Dr. Anya Sharma</p>
                                        <Sparkles className="w-4 h-4 text-purple-400" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FinalCTA />
        </main>
    );
}

// Sub-component for Methodology Cards ensuring consistent animation
function MethodologyCard({ icon, title, description, colorClass, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay }}
            whileHover={{ y: -5 }}
            className="p-8 lg:p-10 rounded-[2rem] bg-white border border-slate-100 shadow-[0_5px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 group"
        >
            <div className={`w-16 h-16 ${colorClass.split(" ")[0]} rounded-2xl flex items-center justify-center mb-6 group-hover:bg-opacity-100 ${colorClass.split(" ")[1]} transition-colors duration-500`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}