import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, GraduationCap, Briefcase, CheckCircle, Clock, MessageCircle, TrendingUp, Sparkles, User } from "lucide-react"; // Added TrendingUp for a new section
// Assuming these are external components now
import FeaturedProgramsSection from "@/components/FeatureProgram";
import PrimaryButton from "@/components/PrimaryButton";
// Note: Remove the old AnimateOnLoad import if you were using it

export default function Home() {
    return (
        <>
            <main>
                {/* 1. HERO SECTION (Premium & Professional) */}
                <section
                    className="relative pt-32 pb-24 overflow-hidden bg-white"
                    data-aos="fade"
                    data-aos-duration="1000"
                >
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-indigo-50/30 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
                        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                            {/* Tagline */}
                            <div
                                className="inline-flex items-center py-2 px-4 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 border border-indigo-100 shadow-sm"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <Zap className="w-4 h-4 mr-2" />
                                Future-Proof Your Career
                            </div>

                            {/* Main Heading */}
                            <h1
                                className="text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight text-slate-900"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                Learn Real Skills.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    Get Real Jobs.
                                </span>
                            </h1>

                            {/* Subtext */}
                            <p
                                className="text-lg text-slate-500 mb-10 max-w-lg leading-relaxed font-medium"
                                data-aos="fade-up"
                                data-aos-delay="500"
                            >
                                Stop collecting certificates. Start building capabilities. Master
                                high-demand skills with guaranteed{" "}
                                <strong className="text-slate-900 font-bold border-b-2 border-indigo-200">On-the-Job Training</strong>.
                            </p>

                            {/* CTA Buttons */}
                            <div
                                className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
                                data-aos="fade-up"
                                data-aos-delay="700"
                            >
                                <PrimaryButton href="/courses" className="px-10 py-4 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all font-bold text-sm">
                                    Explore Paths <ArrowRight className="w-5 h-5 ml-2" />
                                </PrimaryButton>
                                <a
                                    href="#how-it-works"
                                    className="px-10 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                                >
                                    How it Works
                                </a>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div
                            className="md:w-1/2 relative flex justify-center"
                            data-aos="zoom-in"
                            data-aos-delay="500"
                        >
                            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden border-8 border-white ring-1 ring-slate-100 group">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Students collaborating"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>




                {/* 2. BRIDGE SECTION (The Methodology) */}
                <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div
                            className="text-center mb-20"
                            data-aos="fade-up"
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
                                The <span className="text-indigo-600">Bridge Method</span>
                            </h2>
                            <p className="text-sm text-slate-500 mt-4 font-medium max-w-2xl mx-auto leading-relaxed">
                                Our battle-tested framework designed to transform academic potential into industry-standard expertise.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 relative">
                            {/* Horizontal Line (Hidden on mobile) */}
                            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200"></div>

                            {/* Step 1 */}
                            <div
                                className="relative flex flex-col items-center text-center group"
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:shadow-xl group-hover:border-indigo-100 group-hover:-translate-y-2">
                                    <GraduationCap className="w-10 h-10 text-indigo-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg">01</div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-tight">Core Competency</h3>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    Master industry tools and methodologies via live mentorship and high-velocity learning modules.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div
                                className="relative flex flex-col items-center text-center group"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:shadow-xl group-hover:border-indigo-100 group-hover:-translate-y-2">
                                    <Briefcase className="w-10 h-10 text-indigo-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg">02</div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-tight">Project Exposure</h3>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    Apply your skills to live corporate projects and guaranteed On-the-Job Training simulations.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div
                                className="relative flex flex-col items-center text-center group"
                                data-aos="fade-up"
                                data-aos-delay="300"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-8 relative z-10 transition-all duration-500 group-hover:shadow-xl group-hover:border-indigo-100 group-hover:-translate-y-2">
                                    <TrendingUp className="w-10 h-10 text-indigo-600" />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-lg">03</div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-tight">Market Placement</h3>
                                <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                                    Secure high-value roles via direct referrals to our global network of partner companies.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. FEATURED PROGRAMS SECTION */}
                <div data-aos="fade-up" data-aos-delay="200">
                    <FeaturedProgramsSection />
                </div>

                {/* 4. WHY SECTION (Professional & Corporate focus) */}
                <section className="py-24 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">

                        <div className="md:w-1/2" data-aos="fade-right">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-6 border border-emerald-100">
                                Trusted Excellence
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 tracking-tight">
                                Why Choose <span className="text-indigo-600">Com-ED?</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="100">
                                    <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-base mb-1">Outcome-Driven Roadmap</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Every module is meticulously engineered to solve real-world industry challenges.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="200">
                                    <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-base mb-1">Industry Practitioners</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Learn directly from certified veterans who are currently defining industry benchmarks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group" data-aos="fade-up" data-aos-delay="300">
                                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-base mb-1">Guaranteed Internship Simulations</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">Seamless transition into On-the-Job Training with our extensive placement network.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2" data-aos="fade-left">
                            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl shadow-2xl overflow-hidden group">
                                <Image
                                    src="/assets/images/hero2-img.jpeg"
                                    alt="Expert Mentorship"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-[2000ms] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="text-3xl font-bold mb-1">1:1 Mentorship</p>
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Industry Expert Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. FOUNDER SECTION (Impactful & Minimal) */}
                <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-100/40 rounded-full blur-[80px]"></div>
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div
                            className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 items-center"
                            data-aos="fade-up"
                        >
                            <div className="relative group flex-shrink-0">
                                <Image
                                    src="/assets/images/ai.avif"
                                    alt="Founder"
                                    width={200}
                                    height={200}
                                    className="rounded-3xl border-4 border-indigo-50 object-cover w-44 h-44 shadow-lg group-hover:rotate-3 transition-transform duration-500"
                                />
                                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <p className="uppercase text-indigo-600 font-extrabold text-[10px] tracking-[0.3em] mb-4">A Note From the Leadership</p>
                                <blockquote className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 leading-tight mb-8">
                                    "We believe that real experience is the only currency that matters in the high-growth job market."
                                </blockquote>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <p className="text-base font-bold text-slate-900 uppercase tracking-widest">Founder Name</p>
                                    <div className="hidden md:block w-8 h-px bg-slate-300"></div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">CEO & Founder, Com-ED</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Import missing Sparkles icon at the top if needed */}

                {/* 6. CTA (Final Conversion Block) */}
                <section
                    className="py-32 text-center bg-white relative overflow-hidden"
                    data-aos="fade-in"
                >
                    {/* Decorative blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight" data-aos="fade-up">
                            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Level Up?</span>
                        </h2>
                        <p className="text-md text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium" data-aos="fade-up" data-aos-delay="100">
                            Join the high-growth ecosystem where elite skills meet professional opportunity. Your journey to mastery begins here.
                        </p>

                        <div className="flex justify-center flex-col sm:flex-row gap-6" data-aos="fade-up" data-aos-delay="200">
                            <PrimaryButton href="/contact" className="px-12 py-5 shadow-2xl shadow-indigo-100 font-bold text-sm">
                                Start Your Journey Today <ArrowRight className="w-5 h-5 ml-2" />
                            </PrimaryButton>
                            <a
                                href="https://wa.me/"
                                className="px-12 py-5 rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold text-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}