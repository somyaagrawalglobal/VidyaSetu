'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Loader2 } from "lucide-react";

export default function ForgotPassword() {

    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            // Always show success-like message for security (API already does, but UI wraps it)
            setMessage(data.message);

        } catch (err) {
            setMessage('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (


        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-slate-50">
            {/* Background Decoration */}
            <div className="absolute inset-0 w-full h-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] opacity-50 animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-[100px] opacity-50 animate-pulse pointer-events-none"></div>

            <div
                className="relative w-full max-w-sm bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-100/50 rounded-2xl p-6 md:p-10 m-4 z-10"
                data-aos="zoom-in"
                data-aos-duration="600"
            >
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                        Reset <span className={gradientTextClass}>Password</span>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Enter your email to receive a reset link.
                    </p>
                </div>

                {message && (
                    <div className="bg-blue-50/80 backdrop-blur-sm border-l-4 border-blue-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-blue-700 font-medium">{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <label className="sr-only" htmlFor="email">Email Address</label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 md:py-4 rounded-xl bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 focus:bg-white outline-none transition-all duration-200 text-slate-800 font-medium shadow-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-sm md:text-base py-3 mt-6 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Send Reset Link'}
                        {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>

                </form>

                <div className="mt-8 pt-5 border-t border-slate-200/60 text-center">
                    <Link
                        href="/login"
                        className={`font-bold text-xs md:text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center justify-center gap-2`}
                    >
                        Back to Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
}
