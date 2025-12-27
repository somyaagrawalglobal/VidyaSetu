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
        <div className="min-h-screen pt-25 flex items-center justify-center bg-slate-50 p-6">

            {/* Registration Card Container */}
            <div
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-300/50 border border-gray-100"
                data-aos="zoom-in"
                data-aos-duration="800"
            >

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                        Join <span className={gradientTextClass}>Vidya-Setu</span>
                    </h2>
                    <p className="text-slate-500">
                        Create your account to start your career journey.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r">
                        <p className="text-sm text-green-700">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

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

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">I want to join as a:</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Student' }))}
                                className={`py-3 px-4 rounded-xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${formData.role === 'Student'
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                    : 'border-gray-100 bg-slate-50 text-slate-500 hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.role === 'Student' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                    {formData.role === 'Student' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                </div>
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Instructor' }))}
                                className={`py-3 px-4 rounded-xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${formData.role === 'Instructor'
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                    : 'border-gray-100 bg-slate-50 text-slate-500 hover:border-gray-200'
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.role === 'Instructor' ? 'border-indigo-600' : 'border-gray-300'}`}>
                                    {formData.role === 'Instructor' && <div className="w-2 h-2 rounded-full bg-indigo-600"></div>}
                                </div>
                                Instructor
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 mt-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 transition transform hover:scale-[1.005] disabled:opacity-70`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                        {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
                    </button>

                </form>

                {/* Footer Link (Existing User) */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-slate-600">
                        Already a user?
                        <Link
                            href="/login"
                            className={`ml-1 font-bold text-${primaryColor} hover:underline transition`}
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}