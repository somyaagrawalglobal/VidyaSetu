"use client";

import { Mail, MessageCircle, Sparkles, Phone, MapPin, Clock } from "lucide-react";

const GradientContactCard = ({ icon, title, content, link, linkText, bgColor, textColor }) => (
    <div className="p-px rounded-3xl bg-gradient-to-br from-indigo-500/10 to-pink-500/10 transition duration-500 hover:shadow-xl hover:shadow-indigo-100/50 hover:scale-[1.005]">
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
        className="bg-white p-6 rounded-3xl flex items-start shadow-xl border border-gray-100 transition duration-300 hover:shadow-2xl hover:translate-y-[-2px] hover:border-gray-200"
    >
        <div className={`flex items-center justify-center flex-shrink-0 h-14 w-14 rounded-xl ${bgColor} ${textColor} shadow-md mt-1`}>
            <Icon className="w-6 h-6" />
        </div>

        <div className="ml-5">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-slate-500 text-base mb-2">{content}</p>
            {link && (
                <a
                    href={link}
                    className={`${textColor.replace('-100', '-600').replace('bg-', 'text-')} font-semibold block hover:text-indigo-700 transition`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {linkText} →
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
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-gray-100">
                {/* Dynamic Background Elements - As per the Courses component */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative">

                    {/* Metadata Pill - As per the Courses component */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">We're Here To Listen</span>
                    </div>

                    {/* Main Title - Using font-black and gradientTextClass */}
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        Ready to Start Your <span className={gradientTextClass}>Journey</span>? <br className="hidden md:block" />
                        Get in Touch with Our Team.
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        We provide personalized guidance on course enrollment, career paths, and technical support.
                    </p>
                </div>
            </section>

            {/* Contact Section: Form and Cards (Reverting to the clean grid) */}
            <section className="py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* Contact Info (Left Column) - Focus on Cards and Clarity */}
        <div className="lg:col-span-1 space-y-10">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Let's Connect
            </h2>
            <p className="text-xl text-slate-500">
                Choose a channel to start a conversation. We guarantee a prompt response during our business hours.
            </p>

            {/* Contact Cards - Now using the new GradientCard wrapper */}
            <div className="space-y-6">
                
                {/* 1. WhatsApp Card */}
                <GradientContactCard
                    icon={MessageCircle}
                    title="Live Chat (WhatsApp)"
                    content="Fastest reply guaranteed within minutes (9AM - 6PM IST)."
                    link="https://wa.me/"
                    linkText="Start Chat Now"
                    {...whatsappStyles}
                />

                {/* 2. Email Card */}
                <GradientContactCard
                    icon={Mail}
                    title="Detailed Email Support"
                    content="Send us a detailed inquiry. We reply within 24 business hours."
                    link="mailto:info@vidya-setu.com"
                    linkText="Send an Email"
                    {...emailStyles}
                />
                
                {/* 3. Phone Card */}
                <GradientContactCard
                    icon={Phone}
                    title="Direct Phone Line"
                    content="Speak directly to our guidance counselor for course details."
                    link="tel:+919876543210"
                    linkText="+91 98765 43210"
                    {...phoneStyles}
                />
            </div>

        </div>

        {/* Contact Form (Right Column) - Highly Elevated and Modernized */}
        <div className={`lg:col-span-2 bg-white p-6 md:p-14 rounded-3xl shadow-2xl shadow-indigo-300/40 border border-gray-100`}>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Send a Quick Inquiry
            </h2>
            <p className="text-slate-500 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

                {/* Name and Email - Fieldset */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 outline-none transition shadow-inner placeholder-slate-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 outline-none transition shadow-inner placeholder-slate-400"
                            required
                        />
                    </div>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-slate-700 font-semibold mb-2 text-sm">Subject/Topic</label>
                    <input
                        type="text"
                        placeholder="Inquiry about Data Science Course"
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 outline-none transition shadow-inner placeholder-slate-400"
                        required
                    />
                </div>

                {/* Message */}
                <div className="pb-4">
                    <label className="block text-slate-700 font-semibold mb-2 text-sm">Your Message</label>
                    <textarea
                        placeholder="I'm interested in..."
                        className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100/50 outline-none h-40 resize-none transition shadow-inner placeholder-slate-400"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    // Button style is maintained to match the header gradient for consistency
                    className={`w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold text-lg py-4 rounded-xl shadow-2xl shadow-indigo-400/50 hover:from-indigo-700 hover:to-pink-700 transition transform active:scale-[0.99]`}
                >
                    Send Message
                </button>

                {/* Realistic Success/Policy Placeholder */}
                <p className="text-center text-xs text-slate-400 pt-4">
                    We value your privacy. Your details will not be shared with any third parties.
                </p>

            </form>
        </div>

    </div>
</section>

        </main>
    );
}