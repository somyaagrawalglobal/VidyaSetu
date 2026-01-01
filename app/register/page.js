'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, ArrowRight, Loader2 } from "lucide-react";

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
            minLength={type === 'password' ? 6 : undefined}
        />
    </div>
);

export default function Register() {
    const router = useRouter();

    // Consistent brand color variables
    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic Client Validation
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
            // Clear passwords but maybe keep email to help them verify?
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

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

            {/* Registration Card Container */}
            <div
                className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-100/50 rounded-2xl p-6 md:p-10 m-4 z-10"
                data-aos="zoom-in"
                data-aos-duration="600"
            >

                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                        Join <span className={gradientTextClass}>Vidya-Setu</span>
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Create your account to start.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50/80 backdrop-blur-sm border-l-4 border-red-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-50/80 backdrop-blur-sm border-l-4 border-emerald-500 p-3 mb-5 rounded-r-lg shadow-sm">
                        <p className="text-xs text-emerald-700 font-bold">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">

                    <div className="grid grid-cols-2 gap-2">
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
                        type="password"
                        placeholder="Password"
                        icon={Lock}
                        required={true}
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <InputField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        icon={Lock}
                        required={true}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <div className="space-y-2 pt-1">
                        <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">I want to join as a:</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Student' }))}
                                className={`py-2.5 px-3 rounded-xl border transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-sm ${formData.role === 'Student'
                                    ? 'border-indigo-500 bg-indigo-50/80 text-indigo-700 ring-1 ring-indigo-500/20'
                                    : 'border-slate-200 bg-white/50 text-slate-500 hover:border-indigo-300 hover:bg-white'
                                    }`}
                            >
                                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center p-0.5 ${formData.role === 'Student' ? 'border-indigo-600' : 'border-slate-300'}`}>
                                    {formData.role === 'Student' && <div className="w-full h-full rounded-full bg-indigo-600"></div>}
                                </div>
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Instructor' }))}
                                className={`py-2.5 px-3 rounded-xl border transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 shadow-sm ${formData.role === 'Instructor'
                                    ? 'border-indigo-500 bg-indigo-50/80 text-indigo-700 ring-1 ring-indigo-500/20'
                                    : 'border-slate-200 bg-white/50 text-slate-500 hover:border-indigo-300 hover:bg-white'
                                    }`}
                            >
                                <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center p-0.5 ${formData.role === 'Instructor' ? 'border-indigo-600' : 'border-slate-300'}`}>
                                    {formData.role === 'Instructor' && <div className="w-full h-full rounded-full bg-indigo-600"></div>}
                                </div>
                                Instructor
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-sm md:text-base py-3.5 mt-6 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Create Account'}
                        {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>

                </form>

                {/* Footer Link (Existing User) */}
                <div className="mt-8 pt-5 border-t border-slate-200/60 text-center">
                    <p className="text-xs md:text-sm font-medium text-slate-600">
                        Already a user?
                        <Link
                            href="/login"
                            className={`ml-1 font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors`}
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}