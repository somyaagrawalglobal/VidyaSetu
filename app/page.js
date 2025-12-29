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

export default function Home() {
    return (
        <main className="bg-white pt-25 lg:pt-0 selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* 1. HERO SECTION: Modern Split with Pattern Background */}
            <section className="relative pb-20 lg:pt-30 lg:pb-28 overflow-hidden">
                {/* Background Pattern - Dot Grid */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                
                {/* Subtle Gradient Blob */}
                <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] opacity-70 animate-pulse-slow"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        
                        {/* Hero Content */}
                        <div className="lg:w-1/2 text-center lg:text-left z-10" data-aos="fade-up" data-aos-duration="800">
                            {/* Alert Badge */}
                            <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold mb-8 hover:bg-slate-100 transition-colors cursor-pointer group">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <Link href={"/courses"}>New Cohort Enrollment Open</Link>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                                Bridge the gap between <br className="hidden lg:block"/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                    Degree & Career.
                                </span>
                            </h1>

                            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
                                Stop collecting certificates. Start building capabilities. We provide the <strong>missing semester</strong> of practical, industry-grade experience that universities don't teach.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <PrimaryButton href="/courses" className="h-12 px-8 rounded-lg shadow-lg shadow-indigo-200/50 flex items-center justify-center gap-2">
                                    Explore Programs
                                </PrimaryButton>
                                <a href="#methodology" className="h-12 px-8 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                                    How it Works
                                </a>
                            </div>

                        </div>

                        {/* Hero Image (Modern Composition) */}
                        <div className="lg:w-1/2 relative" data-aos="fade-left" data-aos-duration="1000">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 aspect-[4/3] group">
                                <Image
                                    src="/assets/images/hero-img.jpeg"
                                    alt="Students working"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                
                            </div>
                            
                            {/* Decorative Background Element behind image */}
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. METHODOLOGY (Bento Grid Style) */}
            <section id="methodology" className=" bg-white relative">
                <div className="max-w-7xl pb-25 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            The <span className="text-indigo-600">Bridge Method</span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            We don't just teach theory. We simulate the actual working environment of top-tier tech companies.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Upskill</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Intensive, live mentorship sessions focused on current market tools, not outdated textbooks.
                            </p>
                        </div>

                        {/* Card 2 - Featured/Middle */}
                        <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center mb-6">
                                <Briefcase className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">2. Simulate</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Work on real corporate capstone projects. Commit code, attend scrums, and face code reviews.
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
                                Most Critical Step <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Place</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Direct referrals to our hiring partners. We don't just fix your resume; we fix your career trajectory.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FEATURED PROGRAMS (Existing Component) */}
            <div className="py-25 bg-slate-50">
                <FeaturedProgramsSection />
            </div>

            {/* 6. FOUNDER / MISSION SECTION (Editorial Style) */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2 relative">
                            <div className="relative z-10">
                                <Image
                                    src="/assets/images/ai.avif"
                                    alt="Founder"
                                    width={500}
                                    height={600}
                                    className="rounded-lg shadow-2xl"
                                />
                                {/* Signature / Name Tag */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-xl rounded-lg max-w-xs border border-slate-100 hidden md:block">
                                    <p className="font-serif italic text-lg text-slate-800 mb-2">"Talent is universal, but opportunity is not. We are here to fix that."</p>
                                    <div className="h-px w-10 bg-indigo-500 mb-2"></div>
                                    <p className="font-bold text-sm text-slate-900">Founder Name</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">CEO, Vidya-Setu</p>
                                </div>
                            </div>
                            {/* Decorative Grid behind image */}
                            <div className="absolute top-4 -left-4 w-full h-full border border-slate-200 rounded-lg -z-0"></div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3 h-3" /> Our Mission
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                Education needs a <br/>
                                <span className="text-indigo-600">Reality Check.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600">
                                <p>
                                    The industry is evolving faster than university curriculums can keep up. This creates a "skills gap" that leaves graduates unemployed and companies with unfilled roles.
                                </p>
                                <p>
                                    At Com-ED, we are not an institute; we are a <strong>pre-accelerator for your career</strong>. We bridge the disconnect by bringing the corporate world into the classroom.
                                </p>
                            </div>
                            
                            <div className="mt-10 grid grid-cols-2 gap-6">
                                <div className="flex gap-3">
                                    <div className="bg-emerald-100 p-2 rounded-lg h-fit text-emerald-700"><CheckCircle className="w-5 h-5"/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Theory + Practical</h4>
                                        <p className="text-sm text-slate-500">No fluff, just skills.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-purple-100 p-2 rounded-lg h-fit text-purple-700"><Users className="w-5 h-5"/></div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Network Access</h4>
                                        <p className="text-sm text-slate-500">Lifetime community.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}