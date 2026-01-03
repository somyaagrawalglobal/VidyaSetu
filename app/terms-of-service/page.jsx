"use client";
import React from "react";
import { Scale, Users, BookOpen, CreditCard, ShieldAlert, Zap, Mail, ArrowRight } from "lucide-react";

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
        <main className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100/50 rounded-xl mb-6">
                    <Scale className="w-8 h-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Terms of Service
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    By using VidyaSetu, you agree to these terms. Please read them carefully to understand your rights and responsibilities.
                </p>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto space-y-6">
                {termsSections.map((section, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                    <section.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {section.content}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {section.details.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Important Note */}
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex gap-4 items-start">
                    <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-amber-900 mb-2">Important Note</h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            VidyaSetu reserves the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance of the new terms.
                        </p>
                    </div>
                </div>

                {/* Contact Banner */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Clarity is Priority</h2>
                        <p className="text-slate-400 max-w-lg">
                            If you need any clarification regarding our terms or how they apply to you, don't hesitate to reach out.
                        </p>
                    </div>
                    <a
                        href="mailto:info@vidya-setu.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Support
                    </a>
                </div>
            </div>
        </main>
    );
}
