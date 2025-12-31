"use client";

import { Mail, MessageCircle, Sparkles, Phone, MapPin, Clock, User, Type, Send, ArrowRight } from "lucide-react";

const GradientContactCard = ({ icon, title, content, link, linkText, bgColor, textColor }) => (
    <div className="p-px rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 shadow-lg shadow-indigo-100/20 group hover:scale-[1.02] transition-all duration-500">
        <ContactInfoCard
            icon={icon}
            title={title}
            content={content}
            link={link}
            linkText={linkText}
            bgColor={bgColor}
            textColor={textColor}
        />
    </div>
);
// --- START: Reusable Contact Card Component (Defined here for simplicity) ---
const ContactInfoCard = ({ icon: Icon, title, content, link, linkText, bgColor, textColor }) => (
    <div
        className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl flex items-start border border-white/60 transition duration-300 group-hover:bg-white"
    >
        <div className={`flex items-center justify-center flex-shrink-0 h-11 w-11 rounded-xl ${bgColor} ${textColor} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-5 h-5" />
        </div>

        <div className="ml-4">
            <h3 className="text-sm font-black text-slate-900 mb-0.5">{title}</h3>
            <p className="text-slate-600 font-medium text-xs mb-1.5 leading-relaxed">{content}</p>
            {link && (
                <a
                    href={link}
                    className={`${textColor.replace('-100', '-600').replace('bg-', 'text-')} font-bold text-xs inline-flex items-center hover:translate-x-1 transition-transform`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {linkText} <ArrowRight className="w-3 h-3 ml-1" />
                </a>
            )}
        </div>
    </div>
);
// --- END: Reusable Contact Card Component ---


export default function ContactPage() {

    // Gradient class from the Courses component
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600";

    // Icon styles for contact cards (reverting to a card-based layout for this design)
    const whatsappStyles = { bgColor: "bg-green-100", textColor: "text-green-600" };
    const emailStyles = { bgColor: "bg-indigo-100", textColor: "text-indigo-600" };
    const phoneStyles = { bgColor: "bg-purple-100", textColor: "text-purple-600" };

    return (
        <main className="bg-[#F8FAFC] text-slate-800 font-sans overflow-x-hidden min-h-screen">

            {/* Header Section: Replicating Courses Header Aesthetic */}
            <section className="relative pt-32 pb-10 overflow-hidden border-b border-gray-100">
                {/* Dynamic Background Elements - As per the Courses component */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative">

                    {/* Metadata Pill - As per the Courses component */}
                    <div
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-5 sm:mb-6"
                        data-aos="fade-down"
                        data-aos-duration="600"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] sm:text-xs font-extrabold text-slate-600 uppercase tracking-widest">We're Here To Listen</span>
                    </div>

                    {/* Main Title - Using font-black and gradientTextClass */}
                    <h1
                        className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 mb-4 sm:mb-5 leading-tight"
                        data-aos="fade-up"
                        data-aos-duration="800"
                    >
                        Ready to Start Your <span className={gradientTextClass}>Journey</span>? <br className="hidden md:block" />
                        Get in Touch with Our Team.
                    </h1>
                    <p
                        className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                    >
                        We provide personalized guidance on course enrollment, career paths, and technical support.
                    </p>
                </div>
            </section>

            {/* Contact Section: Form and Cards (Reverting to the clean grid) */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info (Left Column) - Focus on Cards and Clarity */}
                    <div
                        className="lg:col-span-1 space-y-6"
                        data-aos="fade-right"
                        data-aos-duration="700"
                    >
                        <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                            Let's Connect
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                            Choose a channel to start a conversation. We guarantee a prompt response during our business hours.
                        </p>

                        {/* Contact Cards - Now using the new GradientCard wrapper */}
                        <div className="space-y-4">

                            {/* 1. WhatsApp Card */}
                            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                                <GradientContactCard
                                    icon={MessageCircle}
                                    title="Live Chat (WhatsApp)"
                                    content="Fastest reply guaranteed within minutes (9AM - 6PM IST)."
                                    link="https://wa.me/"
                                    linkText="Start Chat Now"
                                    {...whatsappStyles}
                                />
                            </div>

                            {/* 2. Email Card */}
                            <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                                <GradientContactCard
                                    icon={Mail}
                                    title="Detailed Email Support"
                                    content="Send us a detailed inquiry. We reply within 24 business hours."
                                    link="mailto:info@vidya-setu.com"
                                    linkText="Send an Email"
                                    {...emailStyles}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Contact Form (Right Column) - Minimal, Glassmorphic, Premium */}
                    <div
                        className="lg:col-span-2 bg-white/70 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl shadow-2xl shadow-indigo-200/40 border border-white/80"
                        data-aos="fade-left"
                        data-aos-duration="700"
                    >
                        <div className="mb-6">
                            <h2 className="text-lg font-black text-slate-900 mb-1 flex items-center">
                                <Send className="w-4 h-4 mr-2 text-indigo-600" />
                                Send a Quick Inquiry
                            </h2>
                            <p className="text-xs text-slate-600 font-medium">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                            {/* Name and Email - Fieldset */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-1.5 text-[11px]">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-500" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-500 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-1.5 text-[11px]">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-500" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-500 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-1.5 text-[11px]">Subject/Topic</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Type className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Inquiry about Data Science Course"
                                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-500 ease-out placeholder-slate-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-slate-700 font-bold mb-1.5 text-[11px]">Your Message</label>
                                <textarea
                                    placeholder="I'm interested in..."
                                    className="w-full px-4 py-3 text-xs rounded-xl bg-slate-50/50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none h-32 resize-none transition-all duration-500 ease-out placeholder-slate-400"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full group relative overflow-hidden bg-slate-900 text-white font-bold text-xs py-3 rounded-xl shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:scale-[1.01] transition-all duration-500 ease-out"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Send Your Message
                                    <Send className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </button>

                            {/* Realistic Success/Policy Placeholder */}
                            <p className="text-center text-[10px] text-slate-400 font-medium pt-2">
                                We value your privacy. Your details will not be shared with any third parties.
                            </p>

                        </form>
                    </div>

                </div>
            </section>

        </main>
    );
}