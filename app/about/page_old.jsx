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
} from "lucide-react";

// --- START: Reusable Components for Modularity and Design Consistency ---

// Component for the new Core Pillars section
const CorePillarCard = ({ Icon, title, description, colorClass }) => (
    <div
        className="p-5 sm:p-6 bg-white border border-gray-100 rounded-2xl shadow-lg transition duration-500 hover:shadow-2xl hover:border-indigo-300 group transform hover:scale-[1.02]"
        data-aos="fade-up"
        data-aos-duration="600"
    >
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClass} rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 group-hover:rotate-6`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition">
            {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{description}</p>
    </div>
);

// Component for the "Bridge" feature list
const BridgeFeature = ({ title, description, Icon, colorClass, index }) => (
    <div
        className="flex items-start space-x-3 border-l-4 border-indigo-200 pl-3 py-2.5 group hover:bg-indigo-50/50 rounded-r-lg transition duration-300 transform hover:translate-x-1"
        data-aos="fade-right"
        data-aos-duration="500"
    >
        <div className={`text-lg sm:text-xl font-black text-indigo-600 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110`}>
            {index}
        </div>
        <div className="flex-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${colorClass} mr-1.5`} />
                <span>{title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed">{description}</p>
        </div>
    </div>
);

// Separate component for the down arrow for clarity and re-use
const ArrowDownIcon = (props) => (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
);

// --- END: Reusable Components ---

export default function About() {
    // Custom classes for consistent brand colors
    const primaryColor = "indigo-600";
    const secondaryColor = "violet-500";
    // Updated gradient class to match the Contact page's aesthetic
    const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600`;

    return (
        <main className="text-slate-800 bg-[#F8FAFC] font-sans overflow-x-hidden min-h-screen">

            {/* 1. Hero/Introduction - High Impact with Contact Page Aesthetic */}
            <section className="relative pt-28 pb-10 overflow-hidden border-b border-gray-100">

                {/* Dynamic Background Elements for Smoothness and Visual Depth */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] -z-10 animate-pulse hidden md:block"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] -z-10 hidden md:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

                    {/* Metadata Pill - Animated */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Our Foundation</span>
                    </div>

                    {/* Main Title - Responsive & Animated */}
                    <h1 className="text-2xl md:text-4xl font-black font-bold text-slate-900 mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        Building the <span className={gradientTextClass}>Bridge</span>{" "}
                        to Future Careers
                    </h1>

                    {/* Subtitle/Description - Responsive & Animated */}
                    <p className="mt-4 sm:mt-6 text-base sm:text-md text-slate-600 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        Vidya-Setu exists to solve the employability crisis. We don't just educate—we build the professional
                        pipeline, connecting high-potential talent with guaranteed, job-aligned experience.
                    </p>

                    {/* CTA Button - Responsive & Animated */}
                    <div className="mt-10 animate-in fade-in duration-1000 delay-500">
                        <Link
                            href="/careers"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-xl shadow-indigo-400/50 hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.05] active:scale-100"
                        >
                            Explore Our Vision <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. The Problem/Solution (Bridge Metaphor) - Responsive Two Columns */}
            <section className="py-20 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Solution Features - Sticky on Large Screens, Responsive Padding */}
                        <div className="lg:sticky lg:top-8" >
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 border-b-4 border-indigo-200 pb-2 flex items-center animate-in fade-in slide-in-from-left-8 duration-700">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m8 0l3-3m-3 3l3 3"></path></svg>
                                <span>From Academia to Industry Readiness</span>
                            </h2>
                            <p className="text-base sm:text-md text-slate-600 mb-10 border-l-4 border-indigo-400 pl-4 font-medium animate-in fade-in duration-1000 delay-300">
                                The gap between theoretical knowledge and workplace competence is vast. Vidya-Setu is the solution. We provide the structured, project-driven pathway needed for real-world mastery.
                            </p>

                            {/* Feature List - Elevated, Distinct Container, Animated */}
                            <div className="space-y-4 sm:space-y-6 p-6 sm:p-8 bg-indigo-50 rounded-2xl shadow-xl border border-indigo-100 animate-in fade-in slide-in-from-left-12 duration-1000 delay-500">
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

                        {/* Right: Visual Bridge Metaphor - Simplified Flow Diagram, Animated */}
                        <div className="relative h-full min-h-[500px] w-full flex flex-col items-center justify-center p-4 lg:p-0 animate-in fade-in slide-in-from-right-8 duration-700">

                            <h3 className="text-xl font-bold text-slate-700 mb-8 tracking-tight">The Three-Stage Transformation</h3>

                            <div className="flex flex-col items-center space-y-6 sm:space-y-8 w-full max-w-sm sm:max-w-md">

                                {/* 1. ACADEMIA Stage */}
                                <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className="flex items-center justify-center mb-3">
                                        <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" />
                                    </div>
                                    <p className="text-base sm:text-lg font-extrabold text-slate-900">ACADEMIA</p>
                                    <p className="text-xs sm:text-sm text-red-600 font-semibold mt-1 uppercase tracking-wider">Theory & Knowledge Base</p>
                                </div>

                                {/* Transition Arrow 1 */}
                                <div className="relative">
                                    <ArrowDownIcon className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500 animate-bounce" />
                                </div>

                                {/* 2. THE BRIDGE (VIDYA-SETU) Stage - Highlighted */}
                                <div className="w-full p-6 sm:p-8 bg-indigo-600 rounded-xl shadow-2xl shadow-indigo-500/50 text-center transform transition duration-500 hover:shadow-3xl hover:scale-[1.05] relative z-10">
                                    <p className="text-lg sm:text-2xl font-black text-white tracking-widest uppercase">
                                        VIDYA-SETU
                                    </p>
                                    <p className="text-sm sm:text-base text-indigo-200 font-medium mt-1">
                                        Skill Bridge & Practical Application
                                    </p>
                                </div>

                                {/* Transition Arrow 2 */}
                                <div className="relative">
                                    <ArrowDownIcon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 animate-bounce" />
                                </div>

                                {/* 3. INDUSTRY Stage */}
                                <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center transform transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
                                    <div className="flex items-center justify-center mb-3">
                                        <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />
                                    </div>
                                    <p className="text-base sm:text-lg font-extrabold text-slate-900">INDUSTRY</p>
                                    <p className="text-xs sm:text-sm text-green-600 font-semibold mt-1 uppercase tracking-wider">Competence & Placement</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Pillars/Values - Responsive Grid Layout */}
            <section className="py-20 sm:py-24 bg-slate-50 border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3 animate-in fade-in duration-700">
                        Our DNA
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        The Three Pillars of Success
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
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

            {/* 4. Founder/Leadership Story - Responsive Two-Column Layout */}
            <section className="py-20 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16">

                        {/* Image - Responsive Size and Animated */}
                        <div className="md:w-1/2 w-full animate-in fade-in slide-in-from-left-8 duration-1000">
                            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-gray-300/50 border-8 border-white transform transition duration-500 hover:shadow-indigo-300/50">
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

                        {/* Content - Responsive Text and Animated */}
                        <div className="md:w-1/2 w-full animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
                                Our Leadership
                            </p>
                            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">
                                Meet Founder Name
                            </h2>
                            <h3 className="text-base sm:text-md font-bold mb-4 text-slate-800">
                                Founder & Visionary
                            </h3>

                            <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
                                Somya's journey began with a frustration: seeing highly educated graduates unable to secure quality jobs due to a lack of practical skills. This realization fueled the inception of Vidya-Setu.
                            </p>

                            <blockquote className="p-4 border-l-4 border-violet-400 bg-violet-50/50 italic text-slate-700 text-xs sm:text-sm rounded-lg transition duration-300 hover:border-violet-600">
                                <p>
                                    "We believe education must be accountable. If a student puts in the effort, we guarantee the outcome—real job capability verified by industry standards."
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}