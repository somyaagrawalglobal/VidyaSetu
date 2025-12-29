'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, Tag, Calendar, Users, ArrowLeft, Loader2, AlertCircle, Copy } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import GenericMultiSelect from '@/components/GenericMultiSelect';

export default function CouponDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const [coupon, setCoupon] = useState(null);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [couponRes, coursesRes, usersRes] = await Promise.all([
                fetch(`/api/admin/coupons/${id}`),
                fetch('/api/courses'),
                fetch('/api/admin/users')
            ]);

            if (!couponRes.ok) throw new Error('Failed to fetch coupon');

            const couponData = await couponRes.json();
            const coursesData = await coursesRes.json();
            const usersData = await usersRes.json();

            if (couponData.success) {
                // Formatting for form: Ensure IDs are extracted if populated, or keep as is
                const c = couponData.coupon;
                // Handle populated fields if they come back as objects
                const courseIds = c.applicableCourses.map(item => typeof item === 'object' ? item._id : item);
                const userIds = c.applicableUsers.map(item => typeof item === 'object' ? item._id : item);

                setCoupon({
                    ...c,
                    expiryDate: c.expiryDate.split('T')[0], // Format date for input
                    applicableCourses: courseIds,
                    applicableUsers: userIds
                });
            }
            if (coursesData.success) setCourses(coursesData.courses);
            if (usersData.success) setUsers(usersData.users);

        } catch (error) {
            console.error(error);
            toast.error('Error loading data');
            router.push('/admin/coupons');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`/api/admin/coupons/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(coupon),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('Coupon updated successfully');
                router.refresh();
            } else {
                toast.error(data.message || 'Failed to update');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
    );

    if (!coupon) return null;

    const isUsed = coupon.currentUses > 0;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link href="/admin/coupons" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Coupon</h1>
                        <p className="text-slate-500 text-sm font-medium">Manage details for {coupon.code}</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-900 p-8 flex justify-between items-center text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                <Tag size={24} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-widest uppercase">{coupon.code}</h2>
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">
                                    <span className={new Date() > new Date(coupon.expiryDate) ? "text-red-400" : "text-emerald-400"}>
                                        {new Date() > new Date(coupon.expiryDate) ? "Expired" : "Active"}
                                    </span>
                                    <span>•</span>
                                    <span>{coupon.currentUses} Uses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isUsed && (
                        <div className="bg-amber-50 border-b border-amber-100 p-4 flex items-center gap-3 text-amber-800 text-sm font-medium">
                            <AlertCircle size={18} className="text-amber-600" />
                            This coupon has been used. Core details (Code, Discount, Scope) are locked to maintain integrity.
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Coupon Code</label>
                            <input
                                required
                                disabled={isUsed}
                                type="text"
                                value={coupon.code}
                                onChange={(e) => setCoupon({ ...coupon, code: e.target.value.toUpperCase() })}
                                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold tracking-widest ${isUsed ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Expiry Date</label>
                            <input
                                required
                                type="date"
                                value={coupon.expiryDate}
                                onChange={(e) => setCoupon({ ...coupon, expiryDate: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-600"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Discount Type</label>
                            <select
                                disabled={isUsed}
                                value={coupon.discountType}
                                onChange={(e) => setCoupon({ ...coupon, discountType: e.target.value })}
                                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold ${isUsed ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Discount Value</label>
                            <input
                                required
                                disabled={isUsed}
                                type="number"
                                value={coupon.discountValue}
                                onChange={(e) => setCoupon({ ...coupon, discountValue: e.target.value })}
                                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold ${isUsed ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Max Uses</label>
                            <input
                                required
                                type="number"
                                value={coupon.maxUses}
                                onChange={(e) => setCoupon({ ...coupon, maxUses: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-600"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Current Uses</label>
                            <input
                                type="number"
                                disabled
                                value={coupon.currentUses}
                                className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-500 cursor-not-allowed"
                            />
                        </div>

                        <div className={`md:col-span-2 border-t border-slate-100 pt-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8 ${isUsed ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                            <div>
                                <GenericMultiSelect
                                    label="Restricted to Courses"
                                    placeholder="All Courses"
                                    options={courses}
                                    selectedIds={coupon.applicableCourses || []}
                                    onChange={(ids) => setCoupon({ ...coupon, applicableCourses: ids })}
                                    displayKey="title"
                                    idKey="_id"
                                />
                                <p className="text-[10px] text-slate-400 mt-2 font-medium">Leave empty to apply to store-wide.</p>
                            </div>
                            <div>
                                <GenericMultiSelect
                                    label="Restricted to Users"
                                    placeholder="All Users"
                                    options={users}
                                    selectedIds={coupon.applicableUsers || []}
                                    onChange={(ids) => setCoupon({ ...coupon, applicableUsers: ids })}
                                    displayKey="email"
                                    idKey="_id"
                                />
                                <p className="text-[10px] text-slate-400 mt-2 font-medium">Leave empty to open for everyone.</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-8 flex justify-end gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
