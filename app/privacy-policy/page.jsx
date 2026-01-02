"use client";
import React from "react";
import { Shield, Lock, Eye, FileText, Scale, RefreshCcw, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {

    const sections = [
        {
            icon: Eye,
            title: "Information We Collect",
            content: "We collect information you provide directly to us when you create an account, enroll in a course, or communicate with us. This includes your name, email address, payment information, and any other information you choose to provide.",
            subItems: [
                "Basic profile information (Name, Email, Profile Picture)",
                "Learning progress and course completion data",
                "Transaction history and payment details",
                "Technical data (IP address, browser type, device information)"
            ]
        },
        {
            icon: Lock,
            title: "How We Use Your Data",
            content: "Our primary goal is to provide you with a seamless and personalized learning experience. We use your data to manage your account, deliver course content, and improve our platform metrics.",
            subItems: [
                "Personalizing your learning dashboard",
                "Processing payments and issuing invoices",
                "Sending important updates regarding your courses",
                "Analyzing platform usage to improve our curriculum"
            ]
        },
        {
            icon: Shield,
            title: "Data Security",
            content: "We implement robust security measures to protect your personal information. Your data is encrypted both in transit and at rest using industry-standard protocols.",
            subItems: [
                "SSL/TLS encryption for all data transfers",
                "Secure payment processing via trusted third-party gateways",
                "Regular security audits and vulnerability assessments",
                "Strict internal access controls to user data"
            ]
        },
        {
            icon: Scale,
            title: "Your Privacy Rights",
            content: "You have full control over your personal data. At any time, you can access, update, or request the deletion of your account information directly from your profile settings.",
            subItems: [
                "Right to access your personal data",
                "Right to correct inaccurate information",
                "Right to request data portability",
                "Right to withdraw consent at any time"
            ]
        }
    ];

    return (
        <main className="bg-white min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-down">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
                    <Shield className="w-4 h-4 text-indigo-600 animate-pulse-subtle" />
                    <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">Privacy Matters</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                    Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">Policy</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                    At VidyaSetu, we are committed to protecting your personal information and your right to privacy.
                </p>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto space-y-12">
                {sections.map((section, idx) => (
                    <div
                        key={idx}
                        className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 animate-slide-in-bottom"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-white shadow-lg shadow-indigo-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <section.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{section.title}</h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-6 italic">
                                    "{section.content}"
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {section.subItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-bold transition-all hover:translate-x-1 hover:text-indigo-600 cursor-default">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Contact Banner */}
                <div className="mt-16 bg-slate-900 rounded-[3rem] p-8 sm:p-12 relative overflow-hidden text-center group animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Have Questions?</h2>
                        <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto">
                            If you have any questions about our Privacy Policy, please feel free to reach out to our privacy team.
                        </p>
                        <a
                            href="mailto:info@vidya-setu.com"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all active:scale-95 group-hover:-translate-y-1"
                        >
                            Email Us <ArrowRight className="w-5 h-5 text-indigo-600" />
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                h1, h2, h3 { font-family: 'Outfit', sans-serif; }
                body { font-family: 'Inter', sans-serif; }

                .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
                .animate-slide-in-bottom { opacity: 0; animation: slideInBottom 0.6s ease-out forwards; }
                .animate-zoom-in { opacity: 0; animation: zoomIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-pulse-subtle { animation: pulse 2s ease-in-out infinite; }
                .animate-spin-slow { animation: spin 8s linear infinite; }

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
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}
