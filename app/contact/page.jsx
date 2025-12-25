"use client";

import { Mail, MessageCircle, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    
    // Simplified variables for consistent styling
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";
    const primaryColor = 'indigo-600';

    return (
        <main className="bg-slate-50 text-slate-800">

            {/* Header */}
            <section className="pt-36 relative overflow-hidden bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className={`text-lg font-semibold mb-3 text-${primaryColor}`} data-aos="fade-down">
                        We're Here To Listen
                    </p>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6" data-aos="fade-down" data-aos-delay="100">
                        Get in <span className={gradientTextClass}>Touch</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Ready to start your career? Reach out to our team via the form, email, or WhatsApp for personalized guidance.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Info (Left Column) - Animated Fade-Right */}
                    <div className="lg:col-span-1" data-aos="fade-right" data-aos-delay="300">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
                            Reach Us Directly
                        </h2>

                        <div className="space-y-6">

                            {/* 1. WhatsApp Card (Inline Implementation) */}
                            <div 
                                className="bg-white p-6 rounded-2xl flex items-start shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:border-gray-200"
                            >
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-green-100 text-green-600 shadow-md mt-1">
                                    <MessageCircle className="w-6 h-6" />
                                </div>

                                <div className="ml-5">
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">WhatsApp Us</h3>
                                    <p className="text-slate-500 text-base mb-2">Fastest reply within 5 minutes (9AM - 6PM IST).</p>
                                    <a
                                        href="https://wa.me/"
                                        className="text-green-600 font-semibold block hover:underline transition"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Start Chat Now →
                                    </a>
                                </div>
                            </div>

                            {/* 2. Email Card (Inline Implementation) */}
                            <div 
                                className="bg-white p-6 rounded-2xl flex items-start shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:border-gray-200"
                            >
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 shadow-md mt-1">
                                    <Mail className="w-6 h-6" />
                                </div>

                                <div className="ml-5">
                                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">Email Support</h3>
                                    <p className="text-slate-500 text-base mb-2">Expect a detailed reply within 24 business hours.</p>
                                    <a
                                        href="mailto:info@vidya-setu.com"
                                        className="text-indigo-600 font-semibold block hover:underline transition"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Send an Email →
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Contact Form (Right Column) - Animated Fade-Left */}
                    <div className={`lg:col-span-2 bg-white p-10 md:p-12 rounded-3xl shadow-2xl shadow-indigo-200/50 border border-gray-100`} data-aos="fade-left" data-aos-delay="400">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-8">
                            Send a Message
                        </h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

                            {/* Name */}
                            <div>
                                <label className="block text-slate-600 font-semibold mb-2 text-sm">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-slate-600 font-semibold mb-2 text-sm">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition"
                                    required
                                />
                            </div>


                            {/* Message */}
                            <div className="pb-4">
                                <label className="block text-slate-600 font-semibold mb-2 text-sm">Your Message</label>
                                <textarea
                                    placeholder="I'm interested in..."
                                    className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none h-36 resize-none transition"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-lg py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/50 transition transform hover:scale-[1.005]`}
                            >
                                Send Message
                            </button>

                        </form>
                    </div>

                </div>
            </section>

        </main>
    );
}