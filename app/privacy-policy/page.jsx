"use client";
import React from "react";
import { Shield, Lock, Eye, Scale, Mail, ArrowRight } from "lucide-react";

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
        <main className="bg-slate-50 min-h-screen py-28 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100/50 rounded-xl mb-6">
                    <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Privacy Policy
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    At VidyaSetu, we value your trust and are committed to protecting your personal information. Transparency is at the core of our relationship with you.
                </p>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto space-y-6">
                {sections.map((section, idx) => (
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
                                    {section.subItems.map((item, i) => (
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

                {/* Contact Banner */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Have Questions?</h2>
                        <p className="text-slate-400 max-w-lg">
                            If you have specific questions about how we handle your data, our dedicated privacy team is here to help.
                        </p>
                    </div>
                    <a
                        href="mailto:info@vidya-setu.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                    >
                        <Mail className="w-4 h-4" />
                        Contact Privacy Team
                    </a>
                </div>
            </div>
        </main>
    );
}
