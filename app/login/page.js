'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from '@/components/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';

const InputField = ({ id, name, type, placeholder, icon: Icon, required = false, value, onChange, rightElement }) => (
    <div className="relative group">
        <label className="sr-only" htmlFor={id}>{placeholder}</label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors duration-300">
            <Icon className="w-5 h-5" />
        </div>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full pl-12 ${rightElement ? 'pr-12' : 'pr-5'} py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all duration-300 text-slate-800 placeholder-slate-400 font-medium hover:bg-white`}
            required={required}
        />
        {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                {rightElement}
            </div>
        )}
    </div>
);

export default function Login() {
    const router = useRouter();
    const { refresh } = useAuth();

    // Logic State
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Animation State
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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

            await refresh();
            // Small delay for UX smoothness
            await new Promise(resolve => setTimeout(resolve, 300));
            router.push('/dashboard');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Zoom-in Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1] // Smooth ease-out
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">

            {/* Artistic Background Elements - CSS controlled visibility (hidden on mobile) */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-72 h-72 bg-indigo-200/40 rounded-full blur-[80px] mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-purple-200/40 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[60%] w-60 h-60 bg-pink-100/40 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 z-0"></div>

            <motion.div
                initial="hidden"
                animate={isMobile ? { opacity: 1, scale: 1 } : "visible"}
                variants={containerVariants}
                className="w-full max-w-[440px] relative z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-indigo-900/10 border border-white/50 ring-1 ring-slate-900/5">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-600/30">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Back</span>
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Sign in to continue your journey.
                        </p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 overflow-hidden"
                            >
                                <p className="text-sm font-semibold text-red-600 flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                                    {error}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
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

                            <div className="space-y-2">
                                <InputField
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    icon={Lock}
                                    required={true}
                                    value={formData.password}
                                    onChange={handleChange}
                                    rightElement={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    }
                                />
                                <div className="flex justify-end p-1">
                                    <Link href="/forgot-password" className="text-sm text-slate-500 hover:text-indigo-600 font-semibold transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={!isMobile ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgb(79 70 229 / 0.15)" } : {}}
                            whileTap={!isMobile ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-4 rounded-xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            {loading ? <Loader2 className="animate-spin relative z-10" /> : <span className="relative z-10">Sign In</span>}
                            {!loading && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Don't have an account?
                            <Link
                                href="/register"
                                className="ml-1.5 font-bold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-4 transition-all"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}
