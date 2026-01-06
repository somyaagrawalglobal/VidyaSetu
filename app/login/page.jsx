'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';

const InputField = ({ id, name, type, placeholder, icon: Icon, required = false, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="relative">
            <label className="sr-only" htmlFor={id}>{placeholder}</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
            <input
                id={id}
                name={name}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full pl-12 ${isPassword ? 'pr-12' : 'pr-5'} py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800`}
                required={required}
            />
            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
};

export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refresh } = useAuth();

    const redirectPath = searchParams.get('redirect') || '/';
    const message = searchParams.get('message');

    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Refresh Auth Context to update Navbar immediately
            await refresh();

            // Small delay to ensure state propagates
            await new Promise(resolve => setTimeout(resolve, 100));

            // Redirect on success
            router.push(redirectPath);

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
                        Welcome <span className={gradientTextClass}>Back</span>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Sign in to continue your journey.
                    </p>
                </div>

                {message && (
                    <div className="bg-indigo-50/80 backdrop-blur-sm border-l-4 border-indigo-500 p-3 mb-5 rounded-r-lg shadow-sm flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                        <p className="text-xs text-indigo-700 font-semibold">{message}</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        icon={Mail}
                        required={true}
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <div className="space-y-1.5">
                        <InputField
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            icon={Lock}
                            required={true}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="flex justify-end">
                            <Link href="/forgot-password" className="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wide">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-sm md:text-base py-3 mt-6 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Sign In'}
                        {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>

                </form>

                <div className="mt-8 pt-5 border-t border-slate-200/60 text-center">
                    <p className="text-xs md:text-sm font-medium text-slate-600">
                        Don't have an account?
                        <Link
                            href="/register"
                            className={`ml-1 font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors`}
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}