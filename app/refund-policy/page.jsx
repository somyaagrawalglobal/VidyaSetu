"use client";
import React from "react";
import { CircleDollarSign, History, ShieldCheck, AlertCircle, Mail, ArrowRight, RefreshCcw, HelpCircle } from "lucide-react";
import Link from "next/link";

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
        <main className="bg-white min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-down">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6 font-bold">
                    <RefreshCcw className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                    <span className="text-[10px] text-indigo-700 uppercase tracking-[0.2em]">Our Commitment</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                    Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">Policy</span>
                </h1>
                <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
                    We believe in our curriculum. If it's not the right fit for you, we make the refund process as transparent as possible.
                </p>
            </div>

            {/* Policy Grid */}
            <div className="max-w-4xl mx-auto space-y-8">
                {policies.map((policy, idx) => (
                    <div
                        key={idx}
                        className={`group p-8 rounded-[2.5rem] bg-white border ${policy.border} hover:shadow-2xl transition-all duration-500 relative overflow-hidden animate-slide-in-bottom`}
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${policy.bg} opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>

                        <div className="flex flex-col md:flex-row gap-8 relative z-10">
                            <div className="flex-shrink-0">
                                <div className={`w-14 h-14 rounded-2xl ${policy.bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm shadow-indigo-100`}>
                                    <policy.icon className={`w-7 h-7 ${policy.color}`} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{policy.title}</h2>
                                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                                    {policy.content}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                    {policy.conditions.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-slate-500 font-bold group/item">
                                            <CheckCircle2 className={`w-4 h-4 ${policy.color} opacity-60 group-hover/item:opacity-100 transition-opacity`} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Exception Notice */}
                <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 flex gap-5 items-start animate-fade-in" style={{ animationDelay: '600ms' }}>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tight mb-2">Technical Exceptions</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            If you encounter technical issues that prevent you from accessing the course, please contact our support team immediately. These cases are handled with priority and may be eligible for refunds outside the standard 7-day window.
                        </p>
                    </div>
                </div>

                {/* CTA / Contact */}
                <div className="mt-16 bg-slate-900 rounded-[3rem] p-8 sm:p-14 relative overflow-hidden group animate-zoom-in" style={{ animationDelay: '800ms' }}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Need help with a refund?</h2>
                            <p className="text-slate-400 font-medium">We're here to assist you through the process.</p>
                        </div>
                        <a
                            href="mailto:info@vidya-setu.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all hover:-translate-y-1 active:scale-95 shadow-xl"
                        >
                            <Mail className="w-5 h-5 text-indigo-600" />
                            Email Support
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
                .animate-spin-slow { animation: spin 8s linear infinite; }

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
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </main>
    );
}

function CheckCircle2(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
