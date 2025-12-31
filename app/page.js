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
    ArrowUpRight
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
            
            {/* 1. HERO SECTION: Modern Split with Pattern Background */}
            <section className="relative pb-16 pt-16 lg:pt-32 lg:pb-28 overflow-hidden"> 
                {/* Background Pattern - Dot Grid (Animation kept for background) */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                
                {/* Subtle Gradient Blob (Animation kept for background) */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-indigo-50/50 rounded-full blur-[100px] opacity-70 animate-pulse-slow"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Column order reversal on mobile for better flow (image after text) - adjusted gap */}
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20"> 
                        
                        {/* Hero Content - Removed data-aos */}
                        <div className="lg:w-1/2 text-center lg:text-left z-10">
                            {/* Alert Badge - Reduced hover animation scope to md: */}
                            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold mb-6 hover:bg-slate-100 transition-colors cursor-pointer group">
                                <span className="relative flex h-2 w-2">
                                    <span className="md:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <Link href={"/courses"}>New Cohort Enrollment Open</Link>
                                <ArrowRight className="w-3 h-3 group-hover:md:translate-x-1 transition-transform" />
                            </div>

                            {/* Responsive Heading Size: 4xl (sm) to 7xl (lg) */}
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight lg:leading-[1.1]">
                                Bridge the gap between <br className="hidden lg:block"/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                    Degree & Career.
                                </span>
                            </h1>

                            {/* Responsive Text Size */}
                            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
                                Stop collecting certificates. Start building capabilities. We provide the **missing semester** of practical, industry-grade experience that universities don't teach.
                            </p>

                            {/* Responsive Button Group - Reduced hover animation scope to md: */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {/* Primary Button with enhanced shadow/animation */}
                                <PrimaryButton href="/courses" className="h-12 px-6 sm:px-8 rounded-lg shadow-xl shadow-indigo-400/30 flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-300 md:hover:shadow-indigo-400/70 md:hover:scale-[1.02] md:active:scale-[0.98]">
                                    Explore Programs
                                </PrimaryButton>
                                {/* Secondary Button with hover animation */}
                                <a href="#methodology" className="h-12 px-6 sm:px-8 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base md:hover:shadow-md">
                                    How it Works
                                </a>
                            </div>
                        </div>

                        {/* Hero Image (Modern Composition) - Removed data-aos */}
                        <div className="lg:w-1/2 relative mt-12 lg:mt-0">
                            {/* Aspect control ensures the image is not distorted on mobile */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-300/30 border border-slate-100 bg-slate-50 aspect-[4/3] group">
                                <Image
                                    src="/assets/images/hero-gen.png"
                                    alt="Students working on practical projects together"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    // Removed hover:scale-105 from base class, applied it only on md:
                                    className="object-cover transition-transform duration-700 group-hover:md:scale-105" 
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. METHODOLOGY (Bento Grid Style) */}
            <section id="methodology" className=" bg-white relative py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header alignment and spacing adjusted for responsiveness */}
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            The <span className="text-indigo-600">Bridge Method</span>
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg">
                            We don't just teach theory. We simulate the actual working environment of top-tier tech companies.
                        </p>
                    </div>

                    {/* Bento Grid: 1 column on mobile, 2 columns on medium, 3 columns on large */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Card 1 - Removed data-aos, added md: to hover transforms */}
                        <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:md:scale-105 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upskill</h3>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                Intensive, live mentorship sessions focused on current market tools, not outdated textbooks.
                            </p>
                        </div>

                        {/* Card 2 - Featured/Middle - Removed data-aos, added md: to internal animation */}
                        <div className="p-6 md:p-8 rounded-2xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group transition-all duration-300 md:col-span-2 lg:col-span-1">
                            {/* Subtle animation in dark card, kept for desktop, disabled for mobile by adding md: */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-all duration-500 group-hover:md:scale-125"></div> 
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">2. Simulate</h3>
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                Work on real corporate capstone projects. Commit code, attend scrums, and face code reviews.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300 transition-colors duration-300 group-hover:text-indigo-100">
                                Most Critical Step <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:md:translate-x-1" />
                            </div>
                        </div>

                        {/* Card 3 - Removed data-aos, added md: to hover transforms */}
                        <div className="p-6 md:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:md:scale-105 transition-transform duration-300">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Place</h3>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                                Direct referrals to our hiring partners. We don't just fix your resume; we fix your career trajectory.
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

            {/* 6. FOUNDER / MISSION SECTION (Editorial Style) */}
            <section className="py-16 md:py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* OPTIMIZATION: Use md:flex-row-reverse to put the content column first on desktop, improving visual weight balance. */}
                    <div className="flex flex-col md:flex-row-reverse gap-12 md:gap-16 items-center"> 
                        
                        {/* Content Column (Text) - Removed data-aos */}
                        <div className="md:w-1/2 order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3 h-3" /> Our Mission
                            </div>
                            {/* Responsive Heading Size */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                Education needs a <br/>
                                <span className="text-indigo-600">Reality Check.</span>
                            </h2>
                            {/* Responsive Text Size */}
                            <div className="space-y-6 text-base md:text-lg text-slate-600">
                                <p>
                                    The industry is evolving faster than university curriculums can keep up. This creates a **"skills gap"** that leaves graduates unemployed and companies with unfilled roles.
                                </p>
                                <p>
                                    At Com-ED, we are not an institute; we are a **pre-accelerator for your career**. We bridge the disconnect by bringing the corporate world into the classroom.
                                </p>
                            </div>
                            
                            {/* Key Differentiators - added md: to hover transforms */}
                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex gap-3 transition-transform duration-300 hover:md:translate-x-1">
                                    <div className="bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700"><CheckCircle className="w-5 h-5"/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Theory + Practical</h4>
                                        <p className="text-sm text-slate-500">No fluff, just skills.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 transition-transform duration-300 hover:md:translate-x-1">
                                    <div className="bg-purple-100 p-2 rounded-lg h-fit text-purple-700"><Users className="w-5 h-5"/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Network Access</h4>
                                        <p className="text-sm text-slate-500">Lifetime community.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Column - Removed data-aos */}
                        <div className="md:w-1/2 relative order-2 md:order-1">
                            <div className="relative z-10 max-w-sm mx-auto md:max-w-none">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Founder"
                                    width={500}
                                    height={600}
                                    // Added md: to hover effects
                                    className="rounded-xl shadow-2xl shadow-slate-900/10 transition-transform duration-500 md:hover:rotate-1 md:hover:scale-[1.02]" 
                                />
                                {/* Signature / Name Tag - Added md: to hover effects */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-5 shadow-2xl rounded-lg max-w-xs border border-slate-100 hidden sm:block transition-all duration-500 md:hover:translate-y-1 md:hover:shadow-slate-300/50"> 
                                    <p className="font-serif italic text-base text-slate-800 mb-2">"Talent is universal, but opportunity is not. We are here to fix that."</p>
                                    <div className="h-px w-10 bg-indigo-500 mb-2"></div>
                                    <p className="font-bold text-sm text-slate-900">Founder Name</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">CEO, Vidya-Setu</p>
                                </div>
                            </div>
                            {/* Decorative Grid behind image - adjusted spacing */}
                            <div className="absolute top-4 -left-4 w-full h-full border border-slate-200 rounded-xl -z-0 hidden sm:block"></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}