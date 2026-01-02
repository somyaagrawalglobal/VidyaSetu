"use client";
import React from "react";
import { Scale, Users, BookOpen, CreditCard, ShieldAlert, Zap, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {

    const termsSections = [
        {
            icon: Users,
            title: "1. Account Eligibility",
            content: "To use VidyaSetu, you must be at least 13 years of age. By creating an account, you represent that all information provided is accurate and that you will maintain the security of your password.",
            details: [
                "One account per individual user",
                "Responsibility for all account activities",
                "Maintain valid contact information",
                "Immediate notification of security breaches"
            ]
        },
        {
            icon: BookOpen,
            title: "2. Course Access & Conduct",
            content: "We grant you a limited, non-transferable license to access course content for personal learning. We expect all students to maintain professional conduct within our community.",
            details: [
                "Content is for personal, non-commercial use",
                "No unauthorized sharing or distribution",
                "Respectful interaction in discussion forums",
                "No automated scraping of platform data"
            ]
        },
        {
            icon: CreditCard,
            title: "3. Payments & Refunds",
            content: "Course fees are clearly stated at the time of purchase. We use secure third-party processors. Refund eligibility depends on our specific refund policy outlined during checkout.",
            details: [
                "All prices are in INR unless stated otherwise",
                "Taxes are calculated based on your location",
                "Refund requests must meet specific criteria",
                "Subscription cancellations take effect next cycle"
            ]
        },
        {
            icon: ShieldAlert,
            title: "4. Intellectual Property",
            content: "All materials provided on VidyaSetu, including videos, documents, and code samples, remain the property of VidyaSetu or its content creators and are protected by copyright laws.",
            details: [
                "VidyaSetu logo and branding are protected",
                "You retain ownership of works you create",
                "Limited license to use course assets",
                "Prohibition on derivative works for sale"
            ]
        }
    ];

    return (
        <main className="bg-white min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-down">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 mb-6 font-bold">
                    <Scale className="w-4 h-4 text-rose-600 animate-pulse-subtle" />
                    <span className="text-[10px] font-black text-rose-700 uppercase tracking-[0.2em]">Usage Agreement</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                    Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">Service</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                    By using VidyaSetu, you agree to these terms. Please read them carefully to understand your rights and responsibilities.
                </p>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto space-y-12">
                {termsSections.map((section, idx) => (
                    <div
                        key={idx}
                        className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-rose-100 hover:shadow-2xl hover:shadow-rose-100/50 transition-all duration-500 animate-slide-in-bottom"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-50 transition-all duration-500">
                                    <section.icon className="w-6 h-6 text-rose-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{section.title}</h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                    {section.content}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {section.details.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-bold transition-all hover:translate-x-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Important Note */}
                <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 animate-fade-in" style={{ animationDelay: '800ms' }}>
                    <div className="flex gap-4">
                        <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 animate-bounce-slow" />
                        <div>
                            <h3 className="text-lg font-black text-amber-900 mb-2 uppercase tracking-tight">Important Note</h3>
                            <p className="text-amber-800 text-sm font-medium leading-relaxed">
                                VidyaSetu reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Banner */}
                <div className="mt-16 bg-slate-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden text-center group animate-zoom-in" style={{ animationDelay: '1s' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Clarity is Priority</h2>
                        <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto">
                            If you need any clarification regarding our terms or how they apply to you, don't hesitate to reach out.
                        </p>
                        <a
                            href="mailto:info@vidya-setu.com"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-rose-50 transition-all active:scale-95 group-hover:-translate-y-1"
                        >
                            Contact Support <ArrowRight className="w-5 h-5 text-rose-600" />
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                h1, h2, h3 { font-family: 'Outfit', sans-serif; }
                body { font-family: 'Inter', sans-serif; }

                .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
                .animate-slide-in-bottom { opacity: 0; animation: slideInBottom 0.6s ease-out forwards; }
                .animate-fade-in { opacity: 0; animation: fadeIn 1s ease-out forwards; }
                .animate-zoom-in { opacity: 0; animation: zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
                .animate-pulse-subtle { animation: pulse 2s ease-in-out infinite; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideInBottom {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            `}</style>
        </main>
    );
}
