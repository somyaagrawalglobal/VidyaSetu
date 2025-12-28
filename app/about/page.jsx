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
    ArrowLeft, // <--- Crucial FIX: ArrowLeft must be imported for the visual bridge
} from "lucide-react";

// Component for the new Core Pillars section
const CorePillarCard = ({ Icon, title, description, colorClass }) => (
    <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-xl transition duration-500 hover:shadow-2xl hover:border-indigo-200 group">
        <div className={`w-14 h-14 ${colorClass} rounded-full flex items-center justify-center mb-6`}>
            <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition">
            {title}
        </h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

// Component for the "Bridge" feature list
const BridgeFeature = ({ title, description, Icon, colorClass, index }) => (
    <div className="flex items-start space-x-4 border-l-4 border-indigo-200 pl-4 py-3 group hover:bg-indigo-50/50 rounded-r-lg transition duration-300">
        <div className={`text-2xl font-extrabold text-indigo-600 flex-shrink-0 mt-1 transition-all duration-300 group-hover:scale-110`}>
            {index}
        </div>
        <div className="flex-1">
            <h4 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                <Icon className={`w-5 h-5 ${colorClass} mr-2`} />
                <span>{title}</span>
            </h4>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
    </div>
);

export default function About() {
    // Custom classes for consistent brand colors
    const primaryColor = "indigo-600";
    const secondaryColor = "violet-500";
    const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-${primaryColor} to-${secondaryColor}`;

    return (
        <main className="text-slate-800 bg-white">
            {/* 1. Hero/Introduction - High Impact */}
            <section className="pt-24 pb-20 bg-gray-50/70 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
                        Our Foundation
                    </p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 mb-6">
                        Building the <span className={gradientTextClass}>Bridge</span>{" "}
                        to Future Careers
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Vidya-Setu exists to solve the employability crisis. We don't just educate—we build the professional
                        pipeline, connecting high-potential talent with guaranteed, job-aligned experience.
                    </p>
                    <div className="mt-10">
                        <Link
                            href="/careers"
                            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                        >
                            Explore Our Vision <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. The Problem/Solution (Bridge Metaphor) - Two Columns */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Solution Features - Enhanced with Icon and Subtle Background */}
                        <div data-aos="fade-right" className="lg:sticky lg:top-8">
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 border-b-4 border-indigo-200 pb-2 flex items-center">
                                {/* Assuming Workflow is a component/icon */}
                                <svg className="w-10 h-10 text-indigo-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m8 0l3-3m-3 3l3 3"></path></svg>
                                <span>From Academia to Industry Readiness</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-10 border-l-4 border-indigo-400 pl-4 font-medium">
                                The gap between theoretical knowledge and workplace competence is vast. **Vidya-Setu is the solution.** We provide the structured, project-driven pathway needed for real-world mastery.
                            </p>

                            {/* Feature List - Now using an elevated, distinct container */}
                            <div className="space-y-6 p-6 bg-indigo-50 rounded-2xl shadow-xl border border-indigo-100">
                                <BridgeFeature
                                    index="01"
                                    title="Project-Centric Learning"
                                    description="All courses revolve around solving actual, large-scale business problems in a simulated environment."
                                    Icon={Lightbulb}
                                    colorClass="text-indigo-600"
                                />

                                <BridgeFeature
                                    index="02"
                                    title="Guaranteed OJT (On-the-Job Training)"
                                    description="Verified performance in projects leads directly to real, compensated industry experience with hiring partners."
                                    Icon={Handshake}
                                    colorClass="text-violet-600"
                                />

                                <BridgeFeature
                                    index="03"
                                    title="Employer-Verified Capability"
                                    description="Our platform tracks skills validated directly by industry experts, not just arbitrary tests or scores."
                                    Icon={TrendingUp}
                                    colorClass="text-emerald-600"
                                />
                            </div>

                        </div>

                        {/* Right: Visual Bridge Metaphor - Simplified Flow Diagram */}
                        <div className="relative h-full min-h-[500px] w-full flex flex-col items-center justify-center p-4" data-aos="fade-left">

                            <h3 className="text-2xl font-bold text-slate-700 mb-8 tracking-tight">The Three-Stage Transformation</h3>

                            <div className="flex flex-col items-center space-y-8 w-full max-w-md">

                                {/* 1. ACADEMIA Stage */}
                                <div className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className="flex items-center justify-center mb-3">
                                        {/* Assuming BookOpen icon component */}
                                        <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13c-2.029 0-3.996 1.096-5.064 2.923-1.068 1.827-1.068 4.093 0 5.92m10.128 0c1.068-1.827 1.068-4.093 0-5.92"></path></svg>
                                    </div>
                                    <p className="text-xl font-extrabold text-slate-900">ACADEMIA</p>
                                    <p className="text-sm text-red-600 font-semibold mt-1 uppercase tracking-wider">Theory & Knowledge Base</p>
                                </div>

                                {/* Transition Arrow 1 */}
                                <div className="relative">
                                    <svg className="w-10 h-10 text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                </div>

                                {/* 2. THE BRIDGE (VIDYA-SETU) Stage - Highlighted */}
                                <div className="w-full p-6 bg-indigo-600 rounded-xl shadow-2xl shadow-indigo-500/50 text-center transform transition duration-500 hover:shadow-3xl hover:scale-[1.05] relative z-10">
                                    <p className="text-3xl font-black text-white tracking-widest uppercase">
                                        VIDYA-SETU
                                    </p>
                                    <p className="text-lg text-indigo-200 font-medium mt-1">
                                        Skill Bridge & Practical Application
                                    </p>
                                </div>

                                {/* Transition Arrow 2 */}
                                <div className="relative">
                                    <svg className="w-10 h-10 text-emerald-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                                </div>

                                {/* 3. INDUSTRY Stage */}
                                <div className="w-full p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className="flex items-center justify-center mb-3">
                                        {/* Assuming Briefcase icon component */}
                                        <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.504 23.504 0 0112 15c-3.189 0-6.236-.61-9-1.745M16 4h2a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"></path></svg>
                                    </div>
                                    <p className="text-xl font-extrabold text-slate-900">INDUSTRY</p>
                                    <p className="text-sm text-green-600 font-semibold mt-1 uppercase tracking-wider">Competence & Placement</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Note: The BridgeFeature component definition and icon components (Workflow, Lightbulb, Handshake, TrendingUp, BookOpen, Briefcase) are assumed to exist and are not provided here. They should wrap the content in a div with appropriate styling. */}

            {/* 3. Core Pillars/Values - Grid Layout */}
            <section className="py-24 bg-slate-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
                        Our DNA
                    </p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-14">
                        The Three Pillars of Success
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <CorePillarCard
                            Icon={Workflow}
                            title="Outcome-Oriented"
                            description="We measure our success by the job placements and career advancements of our learners, not just completion rates."
                            colorClass="bg-indigo-600"
                        />
                        <CorePillarCard
                            Icon={Users}
                            title="Community & Mentorship"
                            description="A network of industry professionals and peers ensures continuous learning and a supportive environment for growth."
                            colorClass="bg-violet-600"
                        />
                        <CorePillarCard
                            Icon={Zap}
                            title="Relevant Technology"
                            description="Our curriculum is fluid, constantly updating to reflect the cutting-edge tools and in-demand skills of the market."
                            colorClass="bg-emerald-600"
                        />
                    </div>
                </div>
            </section>

            {/* 4. Founder/Leadership Story - Simplified and Focused */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        {/* Image */}
                        <div className="md:w-1/2" data-aos="fade-right">
                            <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 border-8 border-white">
                                <Image
                                    src="/assets/images/hero-img.jpeg" // Reusing the founder image
                                    alt="Founder of Vidya-Setu"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="object-top"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-1/2" data-aos="fade-left">
                            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
                                Our Leadership
                            </p>
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                                Meet Somya Sharma
                            </h2>
                            <h3 className="text-xl font-bold mb-4 text-slate-800">
                                Founder & Visionary
                            </h3>

                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                Somya's journey began with a frustration: seeing highly educated graduates unable to secure quality jobs due to a lack of practical skills. This realization fueled the inception of Vidya-Setu.
                            </p>

                            <blockquote className="p-4 border-l-4 border-violet-400 bg-violet-50/50 italic text-slate-700 text-md rounded-lg">
                                <p>
                                    "We believe education must be accountable. If a student puts in the effort, we guarantee the outcome—real job capability verified by industry standards."
                                </p>
                            </blockquote>

                            <Link
                                href="/team"
                                className="mt-8 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition"
                            >
                                Meet the Full Team <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}