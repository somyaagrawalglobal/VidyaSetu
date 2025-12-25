'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { User as UserIcon, Mail, Phone, Calendar, Loader2, Edit2, Save, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';

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
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                mobileNumber: user.mobileNumber,
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md font-medium"
                        >
                            <Edit2 size={18} />
                            Edit Profile
                        </button>
                    )}
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
                        {message.text}
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-lg border-4 border-white/20">
                                {user.firstName[0]}
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
                                <p className="text-indigo-100 opacity-90">{user.email}</p>
                                <div className="mt-2 flex gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase bg-white/20 backdrop-blur-sm border border-white/30`}>
                                        {user.roles?.[0] || 'Student'}
                                    </span>
                                    {user.isActive && (
                                        <span className="px-2 py-0.5 rounded text-xs font-semibold uppercase bg-green-400/20 text-green-50 border border-green-400/30 backdrop-blur-sm">Active</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
                                        <input
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Read Only)</label>
                                        <input
                                            value={user.email}
                                            disabled
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 disabled:opacity-70"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={18} />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-indigo-50/30 transition border border-transparent hover:border-indigo-100">
                                        <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <UserIcon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Full Name</p>
                                            <p className="font-bold text-gray-900 text-lg">{user.firstName} {user.lastName}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-indigo-50/30 transition border border-transparent hover:border-indigo-100">
                                        <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email Address</p>
                                            <p className="font-bold text-gray-900 text-lg">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-indigo-50/30 transition border border-transparent hover:border-indigo-100">
                                        <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Mobile Number</p>
                                            <p className="font-bold text-gray-900 text-lg">{user.mobileNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-indigo-50/30 transition border border-transparent hover:border-indigo-100">
                                        <div className="h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Joined On</p>
                                            <p className="font-bold text-gray-900 text-lg">{new Date(user.createdOn).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-100 mt-6 flex justify-between items-center text-sm text-gray-500">
                                    <p>Last updated: {new Date(user.updatedOn).toLocaleString()}</p>
                                    <Link href="/dashboard" className="text-indigo-600 font-medium hover:underline">Back to Dashboard</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
