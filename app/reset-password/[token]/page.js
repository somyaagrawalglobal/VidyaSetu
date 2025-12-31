'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation'; // Correct: useParams for dynamic segment
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function ResetPassword({ params }) {
    const router = useRouter(); // Wait, params are passed as props in Next.js 13+ Server Components, but in Client Components they need `useParams` hook or prop drilling if layout passes it.
    // However, for page.js in App Router:
    // It receives params as a prop. But since this is "use client", we can use `useParams()` or just use the prop.
    // Actually, `useParams` from `next/navigation` is the standard way in Client Components.
    // But wait, `params` prop is a Promise in Next.js 15+. In Next 14 it was async prop. In Next 13 it was sync.
    // Given usage of "next": "16.1.1", `params` is likely an async API or `useParams`.
    // Let's use `React.use()` for params if passed as prop, or just `useParams()` from `next/navigation` which is easiest for client components.

    // Correction: `useParams()` returns the params object directly.
    const urlParams = useParams();
    const token = urlParams.token;

    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Reset failed');
            }

            setMessage(data.message);
            setTimeout(() => router.push('/login'), 3000);

        } catch (err) {
            setError(err.message);
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
                        Set New <span className={gradientTextClass}>Password</span>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Create a strong password for your account.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                {message && (
                    <div className="bg-emerald-50/80 backdrop-blur-sm border-l-4 border-emerald-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-emerald-700 font-bold">{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <label className="sr-only" htmlFor="password">New Password</label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 md:py-4 rounded-xl bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 focus:bg-white outline-none transition-all duration-200 text-slate-800 font-medium shadow-sm"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="relative">
                        <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 md:py-4 rounded-xl bg-white/50 border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 focus:bg-white outline-none transition-all duration-200 text-slate-800 font-medium shadow-sm"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-sm md:text-base py-3 mt-6 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Update Password'}
                        {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>

                </form>
            </div>
        </div>
    );
}
