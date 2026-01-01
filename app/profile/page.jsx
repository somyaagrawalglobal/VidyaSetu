import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { User as UserIcon, Mail, Phone, Calendar, Loader2, Edit2, Save, X, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/Loader';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Framer Motion Variants
    const smoothEase = [0.25, 0.1, 0.25, 1.0];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: smoothEase,
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: smoothEase }
        }
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-4xl mx-auto"
            >
                <div className="flex justify-between items-end mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
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
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all duration-300 font-bold text-xs shadow-lg shadow-slate-200"
                        >
                            <Edit2 size={14} />
                            Edit Profile
                        </motion.button>
                    )}
                </div>

                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                        >
                            <div className={`p-1.5 rounded-full ${message.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                                {message.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
                            </div>
                            <p className="font-bold text-xs">{message.text}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-100">
                    {/* Compact Header */}
                    <div className="bg-gradient-to-br from-slate-50 to-white border-b border-slate-100 px-6 sm:px-8 py-10">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-xl shadow-indigo-200 border-4 border-white">
                                {user.firstName ? user.firstName[0] : <UserIcon />}
                            </div>
                            <div className="pt-2">
                                <h2 className="text-2xl font-bold text-slate-900">{user.firstName} {user.lastName}</h2>
                                <p className="text-slate-500 font-medium text-sm flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </p>
                                <div className="mt-4 flex gap-2 justify-center sm:justify-start">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${user.roles?.includes('Admin') ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                        user.roles?.includes('Instructor') ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                            'bg-slate-50 text-slate-700 border-slate-100'
                                        }`}>
                                        {user.roles?.includes('Admin') ? 'Admin' : user.roles?.includes('Instructor') ? 'Instructor' : 'Student'}
                                    </span>
                                    {user.isActive && (
                                        <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                            Active
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-10">
                        <AnimatePresence mode="wait">
                            {isEditing ? (
                                <motion.form
                                    key="edit-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">First Name</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 placeholder-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Last Name</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 placeholder-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Mobile Number</label>
                                            <input
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleChange}
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 placeholder-slate-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Email (Read Only)</label>
                                            <input
                                                value={user.email}
                                                disabled
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 bg-slate-100 text-slate-400 cursor-not-allowed font-semibold text-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Headline</label>
                                            <input
                                                name="headline"
                                                value={formData.headline}
                                                onChange={handleChange}
                                                placeholder="e.g. Senior Software Engineer or Math Specialist"
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 placeholder-slate-400"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Bio</label>
                                            <textarea
                                                name="bio"
                                                rows={4}
                                                value={formData.bio}
                                                onChange={handleChange}
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 placeholder-slate-400"
                                            />
                                        </div>
                                    </div>

                                    {user.roles?.includes('Instructor') && (
                                        <div className="pt-8 border-t border-slate-100">
                                            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                Payout Information (For Settlements)
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Bank Name</label>
                                                    <input
                                                        value={formData.payoutDetails.bankName}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, bankName: e.target.value } }))}
                                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800"
                                                        placeholder="e.g. HDFC Bank"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Account Number</label>
                                                    <input
                                                        value={formData.payoutDetails.accountNumber}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, accountNumber: e.target.value } }))}
                                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800"
                                                        placeholder="Enter A/C Number"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">Account Holder Name</label>
                                                    <input
                                                        value={formData.payoutDetails.accountHolderName}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, accountHolderName: e.target.value } }))}
                                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">IFSC Code</label>
                                                    <input
                                                        value={formData.payoutDetails.ifscCode}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, ifscCode: e.target.value } }))}
                                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800 uppercase"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider ml-1">UPI ID (Optional)</label>
                                                    <input
                                                        value={formData.payoutDetails.upiId}
                                                        onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, upiId: e.target.value } }))}
                                                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-sm text-slate-800"
                                                        placeholder="username@upi"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-end gap-4 pt-8 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-8 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all"
                                            disabled={isSaving}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="flex items-center gap-2 px-10 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-70"
                                        >
                                            {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />}
                                            Save Profile
                                        </button>
                                    </div>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="view-profile"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex items-center space-x-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                            <div className="h-12 w-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                <UserIcon size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Full Name</p>
                                                <p className="font-bold text-slate-900 text-base truncate">{user.firstName} {user.lastName}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                            <div className="h-12 w-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                <Mail size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Email Address</p>
                                                <p className="font-bold text-slate-900 text-base truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                            <div className="h-12 w-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                <Phone size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Mobile Number</p>
                                                <p className="font-bold text-slate-900 text-base truncate">{user.mobileNumber || '--'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-5 p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all group">
                                            <div className="h-12 w-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center border border-slate-100 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                <Calendar size={22} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Member Since</p>
                                                <p className="font-bold text-slate-900 text-base truncate">{new Date(user.createdOn).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {(user.headline || user.bio) && (
                                        <div className="mt-8 space-y-6">
                                            {user.headline && (
                                                <div className="p-7 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">My Headline</p>
                                                    <p className="font-bold text-slate-900 text-lg leading-snug">{user.headline}</p>
                                                </div>
                                            )}
                                            {user.bio && (
                                                <div className="p-7 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Professional Biography</p>
                                                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">{user.bio}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {user.roles?.includes('Instructor') && user.payoutDetails && (
                                        <div className="mt-12 pt-10 border-t border-slate-100">
                                            <h3 className="text-base font-bold text-slate-900 mb-8 flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                                                Payout Information
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Bank Name</p>
                                                    <p className="font-bold text-slate-900 text-sm">{user.payoutDetails.bankName || '--'}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Account Number</p>
                                                    <p className="font-bold text-slate-900 text-sm">{user.payoutDetails.accountNumber || '--'}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">IFSC Code</p>
                                                    <p className="font-bold text-slate-900 text-sm uppercase">{user.payoutDetails.ifscCode || '--'}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Holder Name</p>
                                                    <p className="font-bold text-slate-900 text-sm">{user.payoutDetails.accountHolderName || '--'}</p>
                                                </div>
                                                <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">UPI Identifier</p>
                                                    <p className="font-bold text-indigo-600 text-sm">{user.payoutDetails.upiId || '--'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="pt-10 border-t border-slate-100 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
                                        <p className="text-[11px] font-semibold text-slate-400 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                                            Last System Sync: {new Date(user.updatedOn).toLocaleString()}
                                        </p>
                                        <Link href="/dashboard" className="text-indigo-600 font-bold text-xs uppercase tracking-wider hover:text-indigo-700 transition-colors flex items-center group py-2 px-4 rounded-xl bg-indigo-50/50 hover:bg-indigo-50">
                                            Return to Dashboard
                                            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
