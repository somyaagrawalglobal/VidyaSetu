'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, ArrowRight, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const InputField = ({ id, name, type, placeholder, icon: Icon, required = false, value, onChange, minLength, rightElement }) => (
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
            minLength={minLength}
        />
        {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                {rightElement}
            </div>
        )}
    </div>
);

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        role: 'Student',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Toggle states for passwords
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setSuccess('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(data.message);
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

            // Optional: Redirect after success or let user click link
            // setTimeout(() => router.push('/login'), 2000);

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

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">

            {/* Artistic Background Elements (Hidden on mobile) */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[5%] left-[10%] w-72 h-72 bg-indigo-200/40 rounded-full blur-[80px] mix-blend-multiply animate-blob"></div>
                <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-purple-200/40 rounded-full blur-[80px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            </div>
            <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 z-0"></div>

            <motion.div
                initial="hidden"
                animate={isMobile ? { opacity: 1, scale: 1 } : "visible"}
                variants={containerVariants}
                className="w-full max-w-[520px] relative z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-indigo-900/10 border border-white/50 ring-1 ring-slate-900/5">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-600/30">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Vidya-Setu</span>
                        </h2>
                        <p className="text-slate-500 font-medium">
                            Create your account to start your journey.
                        </p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-center overflow-hidden"
                            >
                                <p className="text-sm font-semibold text-red-600">{error}</p>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-center overflow-hidden"
                            >
                                <p className="text-sm font-semibold text-green-600">{success}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name Fields Row - Responsive Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InputField
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                icon={User}
                                required={true}
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <InputField
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                icon={User}
                                required={true}
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

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

                            <InputField
                                id="mobileNumber"
                                name="mobileNumber"
                                type="tel"
                                placeholder="Mobile Number"
                                icon={Phone}
                                required={true}
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />

                            <InputField
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                icon={Lock}
                                required={true}
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
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

                            <InputField
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                icon={Lock}
                                required={true}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                minLength={6}
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                }
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">I want to join as a:</label>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                                {['Student', 'Instructor'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, role }))}
                                        className={`py-3.5 px-4 rounded-xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${formData.role === role
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                                            : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center p-0.5 ${formData.role === role ? 'border-indigo-600' : 'border-slate-300'}`}>
                                            {formData.role === role && <div className="w-full h-full rounded-full bg-indigo-600"></div>}
                                        </div>
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.button
                            whileHover={!isMobile ? { scale: 1.02, boxShadow: "0 20px 25px -5px rgb(79 70 229 / 0.15)" } : {}}
                            whileTap={!isMobile ? { scale: 0.98 } : {}}
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-4 mt-4 rounded-xl shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            {loading ? <Loader2 className="animate-spin relative z-10" /> : <span className="relative z-10">Create Account</span>}
                            {!loading && <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />}
                        </motion.button>
                    </form>

                    {/* Footer Link */}
                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Already have an account?
                            <Link
                                href="/login"
                                className="ml-1.5 font-bold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-4 transition-all"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}