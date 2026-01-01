"use client";

import { useState } from "react";
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
            <h3 className="text-sm font-bold text-slate-800 mb-0.5">{title}</h3>
            <p className="text-slate-600 font-medium text-xs mb-1.5 leading-relaxed">{content}</p>
            {link && (
                <a
                    href={link}
                    className={`${textColor.replace('-100', '-600').replace('bg-', 'text-')} font-semibold text-xs inline-flex items-center hover:translate-x-1 transition-transform`}
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
    const [subject, setSubject] = useState("");

    // Gradient class from the Courses component
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600";

    // Icon styles for contact cards (reverting to a card-based layout for this design)
    const whatsappStyles = { bgColor: "bg-green-100", textColor: "text-green-600" };
    const emailStyles = { bgColor: "bg-indigo-100", textColor: "text-indigo-600" };
    const phoneStyles = { bgColor: "bg-purple-100", textColor: "text-purple-600" };

    return (
        <main className="bg-[#FCFCFD] min-h-screen selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">

            {/* Header Section */}
            <section className="relative pt-24 pb-10 lg:pt-30 lg:pb-42 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-indigo-50/60 via-purple-50/40 to-transparent rounded-full blur-[100px] opacity-70"></div>
                    <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-[120px] -z-10"></div>
                    {/* Dot Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative">

                    {/* Metadata Pill - As per the Courses component */}
                    <div
                        className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-5 sm:mb-6"
                        data-aos="fade-down"
                        data-aos-duration="600"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest">We're Here To Listen</span>
                    </div>

                    {/* Main Title - Using font-bold and gradientTextClass */}
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-[1.1]"
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
                        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
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
                        className="lg:col-span-2 bg-white/70 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-2xl shadow-indigo-100/50 border border-white/80 transition-all duration-500 relative overflow-hidden"
                        data-aos="fade-left"
                        data-aos-duration="700"
                    >
                        {/* Subtle decorative blob inside form */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-50 pointer-events-none -mr-32 -mt-32"></div>

                        <div className="relative z-10 mb-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center">
                                <Send className="w-4 h-4 mr-2 text-indigo-600" />
                                Send a Quick Inquiry
                            </h2>
                            <p className="text-xs text-slate-500 font-medium">
                                Fill out the form below for a swift response.
                            </p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-5 relative z-10">

                            {/* Name and Email - Fieldset */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-300 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-300 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phone and Subject - Fieldset */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Phone Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-300 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Subject</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                                        </div>
                                        <select
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-300 ease-out text-slate-600 appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" disabled>Select a topic...</option>
                                            <option value="course_inquiry">Course Inquiry</option>
                                            <option value="enrollment">Enrollment Assistance</option>
                                            <option value="partnership">Partnership Opportunity</option>
                                            <option value="support">Technical Support</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dynamic Other Field */}
                            {subject === "other" && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Specify Topic</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Type className="h-3.5 w-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Briefly describe your topic..."
                                            className="w-full pl-9 pr-3 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-300 ease-out placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Message */}
                            <div>
                                <label className="block text-slate-700 font-semibold mb-1.5 text-[11px] uppercase tracking-wider">Your Message</label>
                                <textarea
                                    placeholder="Tell us more about your goals..."
                                    className="w-full px-4 py-3 text-xs rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none h-32 resize-none transition-all duration-300 ease-out placeholder-slate-400"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full group relative overflow-hidden bg-slate-900 text-white font-semibold text-xs py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 ease-out"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Send Your Message
                                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            {/* Realistic Success/Policy Placeholder */}
                            <p className="text-center text-[10px] text-slate-400 font-medium pt-2">
                                We value your privacy. Your details are safe with us.
                            </p>

                        </form>
                    </div>

                </div>
            </section>

        </main>
    );
}