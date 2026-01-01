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
        className="p-5 sm:p-6 bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl shadow-indigo-100/20 transition-all duration-500 ease-out hover:shadow-2xl hover:bg-white hover:border-indigo-200 group transform hover:-translate-y-2"
        data-aos="fade-up"
        data-aos-duration="600"
    >
        <div className={`w-10 h-10 sm:w-11 sm:h-11 ${colorClass} rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg`}>
            <Icon className="w-5 h-5 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition">
            {title}
        </h3>
        <p className="text-xs text-slate-600 font-semibold leading-relaxed">{description}</p>
    </div>
);

// Component for the "Bridge" feature list
const BridgeFeature = ({ title, description, Icon, colorClass, index }) => (
    <div
        className="flex items-start space-x-3 border-l-4 border-indigo-100 pl-4 py-3 group hover:bg-white/80 hover:backdrop-blur-sm rounded-r-2xl transition-all duration-500 ease-out transform hover:translate-x-2"
        data-aos="fade-right"
        data-aos-duration="500"
    >
        <div className={`text-lg font-bold text-indigo-400 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:text-indigo-600 group-hover:scale-125`}>
            {index}
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center space-x-2">
                <Icon className={`w-4 h-4 ${colorClass} mr-1.5 transition-transform group-hover:scale-110`} />
                <span>{title}</span>
            </h4>
            <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">{description}</p>
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
                    <div
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-5 sm:mb-6"
                        data-aos="fade-down"
                        data-aos-duration="600"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest">Our Foundation</span>
                    </div>

                    {/* Main Title - Responsive & Animated */}
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-[1.1]"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        Building the <span className={gradientTextClass}>Bridge</span>{" "}
                        to Future Careers
                    </h1>

                    {/* Subtitle/Description - Responsive & Animated */}
                    <p
                        className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                    >
                        Vidya-Setu exists to solve the employability crisis. We don't just educate—we build the professional
                        pipeline, connecting high-potential talent with guaranteed, job-aligned experience.
                    </p>

                    {/* CTA Button - Responsive & Animated */}
                    <div
                        className="mt-7 sm:mt-8"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="400"
                    >
                        <Link
                            href="/careers"
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-base font-semibold text-white bg-indigo-600 border border-transparent rounded-full shadow-xl shadow-indigo-400/50 hover:bg-indigo-700 transition-all duration-500 ease-out transform hover:scale-[1.05] active:scale-100"
                        >
                            Explore Our Vision <ArrowRight className="w-4 h-4 ml-1.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. The Problem/Solution (Bridge Metaphor) - Responsive Two Columns */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Solution Features - Sticky on Large Screens, Responsive Padding */}
                        <div className="lg:sticky lg:top-8" >
                            <h2
                                className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-5 border-b-4 border-indigo-200 pb-2 flex items-center"
                                data-aos="fade-right"
                                data-aos-duration="700"
                            >
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m8 0l3-3m-3 3l3 3"></path></svg>
                                <span>From Academia to Industry Readiness</span>
                            </h2>
                            <p
                                className="text-xs sm:text-sm text-slate-600 mb-6 sm:mb-8 border-l-4 border-indigo-400 pl-3 font-semibold leading-relaxed"
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-delay="200"
                            >
                                The gap between theoretical knowledge and workplace competence is vast. Vidya-Setu is the solution. We provide the structured, project-driven pathway needed for real-world mastery.
                            </p>

                            {/* Feature List - Elevated, Distinct Container, Animated */}
                            <div
                                className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-indigo-50 rounded-2xl shadow-xl border border-indigo-100"
                                data-aos="fade-right"
                                data-aos-duration="700"
                                data-aos-delay="400"
                            >
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
                        <div className="relative h-full min-h-[500px] w-full flex flex-col items-center justify-center p-4 lg:p-0">

                            <h3
                                className="text-base sm:text-lg font-bold text-slate-700 mb-6 sm:mb-7 tracking-tight"
                                data-aos="fade-left"
                                data-aos-duration="700"
                            >The Three-Stage Transformation</h3>

                            <div className="flex flex-col items-center space-y-5 sm:space-y-6 w-full max-w-sm sm:max-w-md">

                                {/* 1. ACADEMIA Stage */}
                                <div
                                    className="w-full p-4 sm:p-5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 text-center transform transition-all duration-500 ease-out delay-75 hover:shadow-2xl hover:-translate-y-2 group"
                                    data-aos="fade-up"
                                    data-aos-duration="600"
                                >
                                    <div className="flex items-center justify-center mb-2 transition-transform group-hover:scale-110 duration-500">
                                        <div className="p-3 bg-indigo-50 rounded-xl">
                                            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-500" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">ACADEMIA</p>
                                    <p className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-widest">Theoretical Knowledge</p>
                                </div>

                                {/* Transition Arrow 1 */}
                                <div className="relative py-2">
                                    <ArrowDownIcon className="w-6 h-6 text-indigo-400 animate-bounce" />
                                </div>

                                {/* 2. THE BRIDGE (VIDYA-SETU) Stage - Highlighted */}
                                <div
                                    className="w-full p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-2xl shadow-2xl shadow-indigo-500/40 text-center transform transition-all duration-500 ease-out delay-75 hover:scale-[1.05] relative z-10 group overflow-hidden"
                                    data-aos="zoom-in"
                                    data-aos-duration="700"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <p className="text-xl sm:text-2xl font-bold text-white tracking-[0.2em] uppercase mb-1">
                                        VIDYA-SETU
                                    </p>
                                    <div className="h-1 w-12 bg-indigo-400/50 mx-auto rounded-full mb-2"></div>
                                    <p className="text-xs sm:text-sm text-indigo-100 font-semibold uppercase tracking-widest">
                                        Skill Bridge & practical Application
                                    </p>
                                </div>

                                {/* Transition Arrow 2 */}
                                <div className="relative py-2">
                                    <ArrowDownIcon className="w-6 h-6 text-emerald-400 animate-bounce" />
                                </div>

                                {/* 3. INDUSTRY Stage */}
                                <div
                                    className="w-full p-4 sm:p-5 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 text-center transform transition-all duration-500 ease-out delay-75 hover:shadow-2xl hover:-translate-y-2 group"
                                    data-aos="fade-up"
                                    data-aos-duration="600"
                                >
                                    <div className="flex items-center justify-center mb-2 transition-transform group-hover:scale-110 duration-500">
                                        <div className="p-3 bg-emerald-50 rounded-xl">
                                            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">INDUSTRY</p>
                                    <p className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-widest">Placement & Competence</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Pillars/Values - Responsive Grid Layout */}
            <section className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4" data-aos="fade-down">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                            Our Core DNA
                        </p>
                    </div>
                    <h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-12"
                        data-aos="fade-up"
                        data-aos-duration="700"
                    >
                        The Three Pillars of Success
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        <div
                            className="md:w-1/2 w-full"
                            data-aos="fade-right"
                            data-aos-duration="800"
                        >
                            <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-3xl shadow-indigo-100 group">
                                <Image
                                    src="/assets/images/hero-img.jpeg" // Reusing the founder image
                                    alt="Founder of Vidya-Setu"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="object-top transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <p className="text-white font-bold text-lg">Somya Agrawal</p>
                                    <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest">Founder & CEO</p>
                                </div>
                            </div>
                        </div>

                        {/* Content - Responsive Text and Animated */}
                        <div
                            className="md:w-1/2 w-full"
                            data-aos="fade-left"
                            data-aos-duration="800"
                            data-aos-delay="200"
                        >
                            <div className="inline-block px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 mb-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">
                                    Our Leadership
                                </p>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 leading-tight">
                                Meet our visionary founder, <span className={gradientTextClass}>Somya Agrawal</span>
                            </h2>

                            <p className="text-slate-600 font-medium mb-6 leading-relaxed text-sm">
                                Somya's journey began with a frustration: seeing highly educated graduates unable to secure quality jobs due to a lack of practical skills. This realization fueled the inception of Vidya-Setu.
                            </p>

                            <blockquote className="p-6 border-l-4 border-violet-500 bg-gradient-to-r from-violet-50 to-white italic text-slate-800 font-semibold text-xs sm:text-sm rounded-r-2xl shadow-sm relative overflow-hidden group">
                                <div className="absolute -right-4 -bottom-4 opacity-[0.05] transition-transform group-hover:scale-110">
                                    <Sparkles className="w-24 h-24 text-violet-900" />
                                </div>
                                <p className="relative z-10">
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