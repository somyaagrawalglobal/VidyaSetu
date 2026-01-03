"use client";
import React from "react";
import { CircleDollarSign, History, ShieldCheck, AlertCircle, Mail, ArrowRight, RefreshCcw, CheckCircle2 } from "lucide-react";

export default function RefundPolicy() {

    const policies = [
        {
            icon: CircleDollarSign,
            title: "7-Day Satisfaction Guarantee",
            content: "We offer a 7-day refund policy for most of our courses. If you're not satisfied with the course quality within the first 7 days of purchase, you are eligible for a full refund, provided you haven't completed more than 20% of the content.",
            conditions: [
                "Request within 7 days of purchase",
                "Less than 20% course completion",
                "No materials downloaded",
                "One-time refund per user profile"
            ],
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-100"
        },
        {
            icon: History,
            title: "Processing Timeline",
            content: "Once a refund request is approved, the amount is credited back to the original payment method. Depending on your bank, it may take several business days for the transaction to reflect in your account.",
            conditions: [
                "Approval within 48 business hours",
                "5-7 business days for bank processing",
                "Credit to original payment source",
                "Notification email upon completion"
            ],
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100"
        },
        {
            icon: ShieldCheck,
            title: "Non-Refundable Cases",
            content: "Certain circumstances fall outside our refund eligibility to protect our instructors and platform integrity.",
            conditions: [
                "Requests after the 7-day window",
                "Significant content consumption (>20%)",
                "Promotional/Discount bundle purchases",
                "Account suspended for terms violation"
            ],
            color: "text-rose-600",
            bg: "bg-rose-50",
            border: "border-rose-100"
        }
    ];

    return (
        <main className="bg-slate-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100/50 rounded-xl mb-6">
                    <RefreshCcw className="w-8 h-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    Refund Policy
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
                    We believe in our curriculum. If it's not the right fit for you, we make the refund process as transparent as possible.
                </p>
            </div>

            {/* Policy Grid */}
            <div className="max-w-4xl mx-auto space-y-8">
                {policies.map((policy, idx) => (
                    <div
                        key={idx}
                        className={`bg-white p-8 rounded-2xl border ${policy.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <div className={`w-12 h-12 rounded-xl ${policy.bg} flex items-center justify-center`}>
                                    <policy.icon className={`w-6 h-6 ${policy.color}`} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 mb-3">{policy.title}</h2>
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {policy.content}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {policy.conditions.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                            <CheckCircle2 className={`w-5 h-5 ${policy.color} flex-shrink-0`} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Exception Notice */}
                <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex gap-4 items-start">
                    <AlertCircle className="w-6 h-6 text-slate-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Technical Exceptions</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            If you encounter technical issues that prevent you from accessing the course, please contact our support team immediately. These cases are handled with priority and may be eligible for refunds outside the standard 7-day window.
                        </p>
                    </div>
                </div>

                {/* Contact Banner */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Need help with a refund?</h2>
                        <p className="text-slate-400 max-w-lg">
                            We're here to assist you through the process.
                        </p>
                    </div>
                    <a
                        href="mailto:info@vidya-setu.com"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                    >
                        <Mail className="w-4 h-4 text-indigo-600" />
                        Email Support
                    </a>
                </div>
            </div>
        </main>
    );
}
