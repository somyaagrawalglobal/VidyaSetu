"use client";

import { useState } from "react";
import { Mail, MessageCircle, Sparkles, Phone, MapPin, Clock, User, Type, Send, ArrowRight, Loader2, CheckCircle, AlertCircle, Globe, Headphones, ShieldCheck } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        otherTopic: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: "", message: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    subject: "",
                    otherTopic: "",
                    message: ""
                });
            } else {
                setStatus({ type: "error", message: data.message || "Failed to send message. Please try again." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "An error occurred. Please check your connection and try again." });
        } finally {
            setLoading(false);
        }
    };

    const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600";

    return (
        <main className="bg-[#F8FAFC] min-h-screen selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[100px]"></div>
                <div className="absolute top-[20%] left-[10%] w-[20%] h-[20%] bg-pink-100/30 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                {/* Hero Header - Adjusted Spacing & Font Size to Match About Page */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-5 sm:mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 uppercase tracking-widest">W'ere Here To Listen</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Ready to Start Your <span className={gradientText}>Journey</span>? <br className="hidden md:block" />
                        Get in Touch with Our Team.
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 px-4">
                        We provide personalized guidance on course enrollment, career paths, and technical support. Choose a channel to start a conversation.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Side: Info & Features */}
                    <div className="lg:col-span-5 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
                        <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-100/20 border border-white/60 relative group transition-all duration-500 hover:shadow-2xl">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-6 flex items-center">
                                <Globe className="w-5 h-5 text-indigo-600 mr-2" />
                                Let's Connect
                            </h2>

                            <div className="space-y-6 relative">
                                <div className="flex items-start space-x-4 group/item">
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm group-hover/item:scale-110 transition-transform">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-slate-800 mb-0.5">Live Chat (WhatsApp)</h3>
                                        <p className="text-xs text-slate-600 font-medium mb-2 leading-relaxed">Fastest reply guaranteed within minutes.</p>
                                        <a href="https://wa.me/917300755100" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-xs font-bold flex items-center hover:translate-x-1 transition-transform">
                                            Start Chat Now <ArrowRight className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group/item">
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm group-hover/item:scale-110 transition-transform">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-slate-800 mb-0.5">Detailed Email</h3>
                                        <p className="text-xs text-slate-600 font-medium mb-2 leading-relaxed">Send us a detailed inquiry. We reply within 24 hours.</p>
                                        <a href="mailto:info@vidyasetu.com" className="text-purple-600 text-xs font-bold flex items-center hover:translate-x-1 transition-transform">
                                            Send an Email <ArrowRight className="w-3 h-3 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feature Badges - Dynamic and Responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/50 backdrop-blur-md border border-white/60 p-4 rounded-2xl flex items-center space-x-3 group hover:bg-white transition-all duration-300">
                                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">Safe & Secure</span>
                            </div>
                            <div className="bg-white/50 backdrop-blur-md border border-white/60 p-4 rounded-2xl flex items-center space-x-3 group hover:bg-white transition-all duration-300">
                                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                                    <Headphones className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-slate-700">Expert Help</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form - Preservation of all fields while refining UI */}
                    <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-6 duration-700 delay-300">
                        <div className="bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-indigo-100/50 border border-white/80 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50/50 rounded-full blur-3xl -mr-24 -mt-24"></div>

                            <div className="relative mb-8">
                                <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center">
                                    <Send className="w-4 h-4 mr-2 text-indigo-600" />
                                    Send a Quick Inquiry
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">Fill out the form below for a swift response.</p>
                            </div>

                            {status.message && (
                                <div className={`mb-8 p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300 ${status.type === "success" ? "bg-emerald-50 border border-emerald-100 text-emerald-800" : "bg-rose-50 border border-rose-100 text-rose-800"}`}>
                                    {status.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                    <p className="text-xs font-bold leading-relaxed">{status.message}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5 relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group/input">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder-slate-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="relative group/input">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder-slate-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative group/input">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="+91 98765 43210"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder-slate-400"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                                        <div className="relative group/input">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-indigo-600 transition-colors" />
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-10 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer text-slate-600"
                                                required
                                            >
                                                <option value="" disabled>Select a topic...</option>
                                                <option value="course_inquiry">Course Inquiry</option>
                                                <option value="enrollment">Enrollment Assistance</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="support">Technical Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <ArrowRight className="w-3.5 h-3.5 text-slate-400 rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {formData.subject === "other" && (
                                    <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Specify Topic</label>
                                        <input
                                            type="text"
                                            name="otherTopic"
                                            value={formData.otherTopic}
                                            onChange={handleChange}
                                            placeholder="Briefly describe your topic..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-6 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none placeholder-slate-400"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your goals..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-6 text-xs font-semibold focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all outline-none h-28 resize-none placeholder-slate-400"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative group overflow-hidden bg-slate-900 text-white py-3.5 rounded-xl text-xs font-bold transition-all hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center space-x-2">
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Your Message</span>
                                                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400">
                                    <div className="flex items-center space-x-1.5">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Privacy Guaranteed</span>
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300"></div>
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-[9px] font-bold uppercase tracking-wider">Active Support</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}