'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const InputField = ({ id, name, type, placeholder, icon: Icon, required = false, value, onChange }) => (
    <div className="relative">
        <label className="sr-only" htmlFor={id}>{placeholder}</label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
        </div>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
            required={required}
        />
    </div>
);

export default function Login() {
    const router = useRouter();

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

            // Redirect on success
            router.push('/'); // Or /dashboard

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
                data-aos-duration="800"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                        Welcome <span className={gradientTextClass}>Back</span>
                    </h2>
                    <p className="text-slate-500">
                        Sign in to continue your journey.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-red-700">{error}</p>
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

                    <div className="space-y-1">
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
                            <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 mt-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 transition transform hover:scale-[1.005] disabled:opacity-70`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                        {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>

                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-slate-600">
                        Don't have an account?
                        <Link
                            href="/register"
                            className={`ml-1 font-bold text-${primaryColor} hover:underline transition`}
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
