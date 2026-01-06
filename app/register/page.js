'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Lock, ArrowRight, Loader2, Eye, EyeOff, Briefcase, Building2, FileText, CreditCard, GraduationCap, Upload, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ToastContext';

const InputField = ({ id, name, type, placeholder, icon: Icon, required = false, value, onChange, disabled = false }) => {
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
                disabled={disabled}
                className={`w-full pl-12 ${isPassword ? 'pr-12' : 'pr-5'} py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800 disabled:opacity-50`}
                required={required}
                minLength={type === 'password' ? 6 : undefined}
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

const FileInputField = ({ id, label, icon: Icon, value, onChange, loading }) => {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
            <div className={`relative flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-dashed ${value ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-300'} hover:border-indigo-400 transition-all group`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${value ? 'bg-emerald-100 text-emerald-600' : 'bg-white shadow-sm text-slate-400 group-hover:text-indigo-500 transition-colors'}`}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (value ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />)}
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-sm font-bold ${value ? 'text-emerald-700' : 'text-slate-600'}`}>
                            {loading ? 'Uploading...' : (value ? 'Document Uploaded' : label)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                            {value ? 'Click to replace file' : 'PDF, JPEG, or PNG (Max 5MB)'}
                        </span>
                    </div>
                </div>

                <input
                    id={id}
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    disabled={loading}
                />

                {!loading && !value && (
                    <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        Upload
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Register() {
    const router = useRouter();
    const toast = useToast();

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
        // Instructor fields
        experience: '',
        currentRole: '',
        resume: '',
        verificationId: '',
        companyName: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingVerif, setUploadingVerif] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'resume') setUploadingResume(true);
        else setUploadingVerif(true);

        const formDataFile = new FormData();
        formDataFile.append('file', file);
        formDataFile.append('type', type);
        if (formData[type]) {
            formDataFile.append('previousUrl', formData[type]);
        }

        try {
            const res = await fetch('/api/auth/upload-verification', {
                method: 'POST',
                body: formDataFile
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, [type]: data.url }));
                toast.success(`${type === 'resume' ? 'CV' : 'Identity Proof'} uploaded successfully`);
            } else {
                setError(data.message || 'File upload failed');
                toast.error(data.message || 'File upload failed');
            }
        } catch (err) {
            setError('File upload failed');
            toast.error('File upload failed');
            console.error(err);
        } finally {
            if (type === 'resume') setUploadingResume(false);
            else setUploadingVerif(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic Client Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
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
                    experience: formData.role === 'Instructor' ? formData.experience : null,
                    currentRole: formData.role === 'Instructor' ? formData.currentRole : null,
                    resume: formData.role === 'Instructor' ? formData.resume : null,
                    verificationId: formData.role === 'Instructor' ? formData.verificationId : null,
                    companyName: formData.role === 'Instructor' ? formData.companyName : null,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(data.message);
            toast.success('Registration successful! Welcome to Vidya-Setu.');
            // Clear passwords but maybe keep email to help them verify?
            setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));

        } catch (err) {
            setError(err.message);
            toast.error(err.message || 'Registration failed');
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
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    maxWidth: formData.role === 'Instructor' ? '650px' : '450px'
                }}
                transition={{
                    maxWidth: { type: "spring", stiffness: 260, damping: 30 },
                    layout: { type: "spring", stiffness: 260, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                }}
                className="relative w-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-indigo-100/40 rounded-3xl p-6 md:p-8 m-4 z-10 overflow-hidden"
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
                    <motion.div layout className="space-y-2 mb-6">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Account Type</label>
                        <div className="relative p-1.5 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 overflow-hidden">
                            {/* Animated Background Slider */}
                            <motion.div
                                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm z-0"
                                initial={false}
                                animate={{
                                    x: formData.role === 'Student' ? '0%' : '100%',
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Student' }))}
                                className={`relative z-10 py-3 px-4 rounded-xl transition-colors duration-300 font-bold text-xs flex items-center justify-center gap-2 ${formData.role === 'Student' ? 'text-indigo-600' : 'text-slate-500'}`}
                            >
                                <GraduationCap size={16} strokeWidth={formData.role === 'Student' ? 3 : 2} />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, role: 'Instructor' }))}
                                className={`relative z-10 py-3 px-4 rounded-xl transition-colors duration-300 font-bold text-xs flex items-center justify-center gap-2 ${formData.role === 'Instructor' ? 'text-indigo-600' : 'text-slate-500'}`}
                            >
                                <Briefcase size={16} strokeWidth={formData.role === 'Instructor' ? 3 : 2} />
                                Instructor
                            </button>
                        </div>
                    </motion.div>

                    <motion.div layout className="grid grid-cols-2 gap-3">
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
                    </motion.div>

                    <motion.div layout>
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
                    </motion.div>

                    <motion.div layout>
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
                    </motion.div>

                    {/* Instructor Specific Questions - Only shown if Instructor is selected */}
                    <AnimatePresence mode="wait">
                        {formData.role === 'Instructor' && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-3 md:space-y-4 pt-4 border-t border-slate-100 mb-4">
                                    <div className="flex items-center gap-2 ml-1 mb-1">
                                        <div className="w-1 h-3 bg-indigo-500 rounded-full"></div>
                                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Expert Credentials</p>
                                    </div>

                                    <InputField
                                        id="experience"
                                        name="experience"
                                        type="text"
                                        placeholder="Experience (e.g. 5+ years)"
                                        icon={Briefcase}
                                        value={formData.experience}
                                        onChange={handleChange}
                                    />

                                    <div className="grid grid-cols-2 gap-2">
                                        <InputField
                                            id="currentRole"
                                            name="currentRole"
                                            type="text"
                                            placeholder="Current Role"
                                            icon={User}
                                            value={formData.currentRole}
                                            onChange={handleChange}
                                        />
                                        <InputField
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            placeholder="Organization"
                                            icon={Building2}
                                            value={formData.companyName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FileInputField
                                            id="resume"
                                            label="Academic CV"
                                            icon={FileText}
                                            value={formData.resume}
                                            loading={uploadingResume}
                                            onChange={(e) => handleFileUpload(e, 'resume')}
                                        />

                                        <FileInputField
                                            id="verificationId"
                                            label="Identity Proof"
                                            icon={CreditCard}
                                            value={formData.verificationId}
                                            loading={uploadingVerif}
                                            onChange={(e) => handleFileUpload(e, 'verificationId')}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div layout>
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
                    </motion.div>

                    <motion.div layout>
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
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div layout>
                        <button
                            type="submit"
                            disabled={loading || uploadingResume || uploadingVerif}
                            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-sm md:text-base py-3.5 mt-2 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (uploadingResume || uploadingVerif ? 'Uploading Files...' : 'Create Account')}
                            {!loading && !uploadingResume && !uploadingVerif && <ArrowRight className="w-4 h-4 ml-1" />}
                        </button>
                    </motion.div>
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
            </motion.div>
        </div>
    );
}
