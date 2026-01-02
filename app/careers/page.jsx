"use client";
import React from "react";
import Image from "next/image";
import { Sparkles, Target, Zap, Heart, Mail, ArrowRight, Smile } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {

    const values = [
        {
            icon: Target,
            title: "Impact First",
            desc: "We measure success by the careers we transform, not just course completions."
        },
        {
            icon: Zap,
            title: "Relentless Innovation",
            desc: "We constantly challenge the status quo of traditional education models."
        },
        {
            icon: Heart,
            title: "Student Obsession",
            desc: "Every decision we make starts and ends with what's best for our learners."
        }
    ];

    return (
        <main className="bg-slate-50 min-h-screen sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Minimal Hero - Vision */}
            <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in-down">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4 transition-transform hover:scale-105 cursor-default">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Join the Revolution</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                    Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Future of Learning</span>
                </h1>
                <p className="text-md text-slate-500 font-normal max-w-2xl mx-auto leading-relaxed">
                    At VidyaSetu, we aren't just an EdTech company. We are a movement to democratize quality education and bridge the gap between intent and employment.
                </p>
            </div>

            {/* Founder's Vision Section */}
            <section className="max-w-5xl mx-auto mb-24 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center gap-10 lg:gap-16 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="w-full md:w-1/3 flex-shrink-0 relative z-10 flex justify-center">
                        <div className="relative w-56 h-56 sm:w-64 sm:h-64 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] rotate-6 transform translate-x-2 translate-y-2"></div>
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-lg">
                                <Image
                                    src="/assets/images/founder-profile.png"
                                    alt="Founder of VidyaSetu"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 text-center md:text-left relative z-10">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4 block">The Vision</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 tracking-tight leading-snug">"Education should be the bridge, not the barrier."</h2>
                        <p className="text-slate-600 leading-relaxed mb-6 font-medium text-sm sm:text-base">
                            We started VidyaSetu with a singular obsession: to fix the broken pipeline between academia and industry. We see a world where talent, not pedigree, dictates opportunity.
                        </p>
                        <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                            We are looking for dreamers, doers, and relentless builders who want to shape this reality with us.
                        </p>
                        <div className="mt-8 border-t border-slate-100 pt-6 inline-block">
                            <p className="text-sm font-black text-indigo-600 uppercase tracking-widest">Founder of VidyaSetu</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                {values.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-50 hover:shadow-xl hover:shadow-indigo-50/40 transition-all duration-300 animate-slide-up"
                        style={{ animationDelay: `${(idx + 2) * 150}ms` }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                            <item.icon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* No Positions / Talent Network */}
            <div className="max-w-3xl mx-auto text-center mb-24 animate-fade-in" style={{ animationDelay: '800ms' }}>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Current Openings</h3>
                <p className="text-slate-500 mb-10">We are currently fully staffed, but we are always looking for exceptional talent.</p>

                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Smile className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>

                    <h4 className="text-xl font-bold text-slate-900 mb-3">No positions available right now</h4>
                    <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                        Don't see a role that fits? We'd still love to hear from you. Send us your resume and tell us how you can make a difference at VidyaSetu.
                    </p>

                    <a
                        href="mailto:careers@vidya-setu.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-lg shadow-slate-200"
                    >
                        <Mail className="w-4 h-4" />
                        Join Talent Network
                    </a>
                </div>
            </div>

            <style jsx>{`
                h1, h2, h3, h4 { font-family: 'Outfit', sans-serif; }
                body { font-family: 'Inter', sans-serif; }

                .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
                .animate-slide-up { opacity: 0; animation: slideUp 0.6s ease-out forwards; }
                .animate-fade-in { opacity: 0; animation: fadeIn 0.8s ease-out forwards; }

                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </main>
    );
}
