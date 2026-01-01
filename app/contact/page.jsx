"use client";

import { useState, useEffect } from "react";
import { Mail, MessageCircle, Sparkles, Phone, MapPin, Clock, ArrowRight, Send, Globe, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        topic: 'Course Information',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Stagger animations
        const timer1 = setTimeout(() => setHeaderVisible(true), 100);
        const timer2 = setTimeout(() => setContentVisible(true), 400);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // Animation helper - disabled on mobile
    const animate = (isVisible, delay = "") => {
        if (isMobile) return "";
        return `transform transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } ${delay}`;
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setStatus({ type: 'success', message: 'Message sent! We will respond shortly.' });
            setFormData({ fullName: '', email: '', topic: 'Course Information', message: '' }); // Reset form
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Failed to send message.' });
        } finally {
            setIsSubmitting(false);
        }
    };

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

                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className={`flex justify-center mb-8 ${animate(headerVisible)}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-bold text-indigo-900 uppercase tracking-widest">Priority Support 24/7</span>
                        </div>
                    </div>

                    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.1] ${animate(headerVisible, 'delay-100')}`}>
                        Let's Engineer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient bg-[length:200%_auto]">
                            Your Future.
                        </span>
                    </h1>

                    <p className={`text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light ${animate(headerVisible, 'delay-200')}`}>
                        Whether you're looking for curriculum details or enterprise partnerships, our team is ready to architect the perfect solution for you.
                    </p>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="pb-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Left Column: Contact Methods */}
                        <div className={`lg:col-span-5 space-y-10 ${animate(contentVisible)}`}>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Direct Communication</h3>
                                <p className="text-slate-500">Choose your preferred channel for immediate assistance.</p>
                            </div>

                            <div className="space-y-6">
                                {/* Email Card */}
                                <a href="mailto:support@vidyasetu.com" className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900 mb-1">Email Support</p>
                                        <p className="text-sm text-slate-500 mb-3 leading-relaxed">For detailed inquiries and documentation.</p>
                                        <span className="text-sm font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1">
                                            support@vidyasetu.com <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </a>

                                {/* WhatsApp Card */}
                                <a href="https://wa.me/" className="group flex items-start gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900 mb-1">Live Chat</p>
                                        <p className="text-sm text-slate-500 mb-3 leading-relaxed">Instant responses 9AM - 9PM EST.</p>
                                        <span className="text-sm font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                                            Start Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </a>

                                {/* HQ Card */}
                                <div className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100 opacity-80 decoration-slice">
                                    <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-slate-900 mb-1">Global HQ</p>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            TechHub Tower, Level 42<br />
                                            Cyber City, Gurugram<br />
                                            India, 122002
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Premium Form */}
                        <div className={`lg:col-span-7 ${animate(contentVisible, 'delay-200')}`}>
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">
                                {/* Decorative Gradient on Card */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[80px] -z-10 -mr-20 -mt-20"></div>

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Send an Inquiry</h3>
                                    <p className="text-slate-500">We usually respond within 2 hours during business days.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="e.g. Alex Morgan"
                                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="alex@company.com"
                                                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Topic</label>
                                        <select
                                            name="topic"
                                            value={formData.topic}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium appearance-none cursor-pointer"
                                        >
                                            <option>Course Information</option>
                                            <option>Corporate Training</option>
                                            <option>Partnership Inquiry</option>
                                            <option>Technical Support</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us a bit about your goals..."
                                            rows="4"
                                            className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium resize-none"
                                            required
                                        ></textarea>
                                    </div>

                                    {status.message && (
                                        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                            {status.message}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'} <Send className={`w-5 h-5 ${isSubmitting ? 'hidden' : 'group-hover:translate-x-1 transition-transform'}`} />
                                    </button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        <span>Data is encrypted & secure</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}