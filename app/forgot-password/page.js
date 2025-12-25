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
        <div className="min-h-screen pt-25 flex items-center justify-center bg-slate-50 p-6">
            <div
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-300/50 border border-gray-100"
                data-aos="zoom-in"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                        Reset <span className={gradientTextClass}>Password</span>
                    </h2>
                    <p className="text-slate-500">
                        Enter your email to receive a reset link.
                    </p>
                </div>

                {message && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-blue-700">{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 mt-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 transition transform hover:scale-[1.005] disabled:opacity-70`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                        {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>

                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link
                        href="/login"
                        className={`font-bold text-${primaryColor} hover:underline transition`}
                    >
                        Back to Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
}
