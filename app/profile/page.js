'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { User as UserIcon, Mail, Phone, Calendar, Loader2, Edit2, Save, X, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/Loader';

export default function Profile() {
    const { user, loading, refresh } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        headline: '',
        bio: '',
        payoutDetails: {
            bankName: '',
            accountNumber: '',
            accountHolderName: '',
            ifscCode: '',
            upiId: '',
        }
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                mobileNumber: user.mobileNumber || '',
                headline: user.headline || '',
                bio: user.bio || '',
                payoutDetails: {
                    bankName: user.payoutDetails?.bankName || '',
                    accountNumber: user.payoutDetails?.accountNumber || '',
                    accountHolderName: user.payoutDetails?.accountHolderName || '',
                    ifscCode: user.payoutDetails?.ifscCode || '',
                    upiId: user.payoutDetails?.upiId || '',
                }
            });
        }
    }, [user, loading, router]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
            refresh(); // Refresh global auth state
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Loader text="Loading your profile..." />;

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider mb-2 border border-indigo-100/50">
                                <UserIcon className="w-3.5 h-3.5" />
                                Account Profile
                            </div>
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Personal <span className="text-indigo-600 font-bold">Settings</span></h1>
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 font-bold text-xs"
                        >
                            <Edit2 size={16} />
                            Edit Profile
                        </button>
                    )}
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        <div className={`p-1.5 rounded-full ${message.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                            {message.type === 'success' ? <CheckCircle size={18} /> : <X size={18} />}
                        </div>
                        <p className="font-bold text-xs">{message.text}</p>
                    </div>
                )}

                <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-slate-200" data-aos="fade-up">
                    {/* Compact Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-8">
                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-sm border border-indigo-700/10">
                                {user.firstName[0]}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">{user.firstName} {user.lastName}</h2>
                                <p className="text-slate-500 font-medium text-xs">{user.email}</p>
                                <div className="mt-3 flex gap-2">
                                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${user.roles?.includes('Admin') ? 'bg-purple-100 text-purple-700 border-purple-200/50' :
                                            user.roles?.includes('Instructor') ? 'bg-indigo-100 text-indigo-700 border-indigo-200/50' :
                                                'bg-slate-100 text-slate-700 border-slate-200/50'
                                        }`}>
                                        {user.roles?.includes('Admin') ? 'Admin' : user.roles?.includes('Instructor') ? 'Instructor' : 'Student'}
                                    </span>
                                    {user.isActive && (
                                        <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 border border-emerald-200/50">Active</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
                                        <input
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Email (Read Only)</label>
                                        <input
                                            value={user.email}
                                            disabled
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-100 bg-slate-100/50 text-slate-400 cursor-not-allowed font-bold text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Headline</label>
                                        <input
                                            name="headline"
                                            value={formData.headline}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior Software Engineer or Math Specialist"
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Bio</label>
                                        <textarea
                                            name="bio"
                                            rows={4}
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Tell us about yourself..."
                                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                        />
                                    </div>
                                </div>

                                {user.roles?.includes('Instructor') && (
                                    <div className="pt-6 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                                            <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                            Payout Information (For Settlements)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Bank Name</label>
                                                <input
                                                    value={formData.payoutDetails.bankName}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, bankName: e.target.value } }))}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                                    placeholder="e.g. HDFC Bank"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account Number</label>
                                                <input
                                                    value={formData.payoutDetails.accountNumber}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, accountNumber: e.target.value } }))}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                                    placeholder="Enter A/C Number"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Account Holder Name</label>
                                                <input
                                                    value={formData.payoutDetails.accountHolderName}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, accountHolderName: e.target.value } }))}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">IFSC Code</label>
                                                <input
                                                    value={formData.payoutDetails.ifscCode}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, ifscCode: e.target.value } }))}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700 uppercase"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">UPI ID (Optional)</label>
                                                <input
                                                    value={formData.payoutDetails.upiId}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, upiId: e.target.value } }))}
                                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-sm text-slate-700"
                                                    placeholder="username@upi"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-8 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-70"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-4 p-5 rounded-lg bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="h-10 w-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm">
                                            <UserIcon size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Full Name</p>
                                            <p className="font-bold text-slate-800 text-sm">{user.firstName} {user.lastName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-5 rounded-lg bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="h-10 w-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Email Address</p>
                                            <p className="font-bold text-slate-800 text-sm whitespace-nowrap overflow-hidden text-ellipsis">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-5 rounded-lg bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="h-10 w-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Mobile Number</p>
                                            <p className="font-bold text-slate-800 text-sm">{user.mobileNumber || '--'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-5 rounded-lg bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                                        <div className="h-10 w-10 rounded-lg bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Member Since</p>
                                            <p className="font-bold text-slate-800 text-sm">{new Date(user.createdOn).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>

                                {(user.headline || user.bio) && (
                                    <div className="mt-6 space-y-4">
                                        {user.headline && (
                                            <div className="p-5 rounded-lg bg-slate-50 border border-slate-100">
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Headline</p>
                                                <p className="font-bold text-slate-800 text-sm">{user.headline}</p>
                                            </div>
                                        )}
                                        {user.bio && (
                                            <div className="p-5 rounded-lg bg-slate-50 border border-slate-100">
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Professional Bio</p>
                                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{user.bio}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {user.roles?.includes('Instructor') && user.payoutDetails && (
                                    <div className="mt-8 pt-8 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                                            <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                                            Payout Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Bank Name</p>
                                                <p className="font-bold text-slate-800 text-sm">{user.payoutDetails.bankName || '--'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Account Number</p>
                                                <p className="font-bold text-slate-800 text-sm">{user.payoutDetails.accountNumber || '--'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">IFSC Code</p>
                                                <p className="font-bold text-slate-800 text-sm">{user.payoutDetails.ifscCode || '--'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">A/C Holder Name</p>
                                                <p className="font-bold text-slate-800 text-sm">{user.payoutDetails.accountHolderName || '--'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">UPI ID</p>
                                                <p className="font-bold text-indigo-600 text-sm">{user.payoutDetails.upiId || '--'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="pt-8 border-t border-slate-100 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <p className="text-[10px] font-medium text-slate-400 italic">
                                        Last Profile Update: {new Date(user.updatedOn).toLocaleString()}
                                    </p>
                                    <Link href="/dashboard" className="text-indigo-600 font-bold text-xs uppercase tracking-wider hover:text-indigo-700 transition-colors flex items-center group">
                                        Return to Dashboard
                                        <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
