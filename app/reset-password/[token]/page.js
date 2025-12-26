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
        <div className="min-h-screen pt-25 flex items-center justify-center bg-slate-50 p-6">
            <div
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-300/50 border border-gray-100"
                data-aos="zoom-in"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                        Set New <span className={gradientTextClass}>Password</span>
                    </h2>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-green-700">{message}</p>
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
                            className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
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
                            className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 mt-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 transition transform hover:scale-[1.005] disabled:opacity-70`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Update Password'}
                        {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>

                </form>
            </div>
        </div>
    );
}
