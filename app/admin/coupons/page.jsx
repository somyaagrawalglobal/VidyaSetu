'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Plus, Tag, Calendar, Users, Trash2, Loader2, AlertCircle, CheckCircle2, Edit, Ban, Lock, GraduationCap } from 'lucide-react';
import { useToast } from '@/components/ToastContext';
import GenericMultiSelect from '@/components/GenericMultiSelect';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';

export default function AdminCouponsPage() {
    const toast = useToast();
    const [coupons, setCoupons] = useState([]);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        expiryDate: '',
        maxUses: 100,
        applicableCourses: [],
        applicableUsers: []
    });

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState(null);

    const [expireModalOpen, setExpireModalOpen] = useState(false);
    const [couponToExpire, setCouponToExpire] = useState(null);

    // ... (useEffect and fetchData unchanged)

    const confirmDelete = async () => {
        if (!couponToDelete) return;
        try {
            const res = await fetch(`/api/admin/coupons?id=${couponToDelete}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setCoupons(coupons.filter(c => c._id !== couponToDelete));
                toast.success('Coupon deleted successfully');
            } else {
                toast.error(data.message || 'Failed to delete coupon');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setDeleteModalOpen(false);
            setCouponToDelete(null);
        }
    };

    const confirmExpire = async () => {
        if (!couponToExpire) return;
        try {
            // Expire by setting date to yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const res = await fetch(`/api/admin/coupons/${couponToExpire}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expiryDate: yesterday.toISOString() }),
            });
            const data = await res.json();

            if (data.success) {
                // Update local state
                setCoupons(coupons.map(c => c._id === couponToExpire ? { ...c, expiryDate: yesterday.toISOString() } : c));
                toast.success('Coupon marked as expired');
            } else {
                toast.error(data.message || 'Failed to expire coupon');
            }
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setExpireModalOpen(false);
            setCouponToExpire(null);
        }
    };

    const handleDeleteClick = (id) => {
        setCouponToDelete(id);
        setDeleteModalOpen(true);
    };

    const handleExpireClick = (id) => {
        setCouponToExpire(id);
        setExpireModalOpen(true);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const results = await Promise.allSettled([
                fetch('/api/admin/coupons'),
                fetch('/api/courses'),
                fetch('/api/admin/users')
            ]);

            const [couponsResult, coursesResult, usersResult] = results;

            // Handle Coupons
            if (couponsResult.status === 'fulfilled') {
                const res = couponsResult.value;
                if (res.status === 401) {
                    setIsAuthorized(false);
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                if (data.success) {
                    setCoupons(data.coupons);
                } else {
                    console.error('Coupons fetch failed:', data.message);
                    toast.error('Failed to load coupons');
                }
            } else {
                console.error('Coupons request failed:', couponsResult.reason);
                toast.error('Failed to load coupons');
            }

            // Handle Courses
            if (coursesResult.status === 'fulfilled') {
                const res = coursesResult.value;
                const data = await res.json();
                if (data.success) {
                    setCourses(data.courses);
                } else {
                    console.error('Courses fetch failed:', data.message);
                }
            } else {
                console.error('Courses request failed:', coursesResult.reason);
            }

            // Handle Users
            if (usersResult.status === 'fulfilled') {
                const res = usersResult.value;
                const data = await res.json();
                if (data.success) {
                    setUsers(data.users);
                } else {
                    console.error('Users fetch failed:', data.message);
                }
            } else {
                console.error('Users request failed:', usersResult.reason);
            }

        } catch (error) {
            console.error('Critical error in fetchData:', error);
            toast.error('Failed to load page data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCoupon),
            });
            const data = await res.json();
            if (data.success) {
                setCoupons([data.coupon, ...coupons]);
                setIsCreating(false);
                setNewCoupon({
                    code: '',
                    discountType: 'percentage',
                    discountValue: '',
                    expiryDate: '',
                    maxUses: 100,
                    applicableCourses: [],
                    applicableUsers: []
                });
                toast.success('Coupon created successfully');
            } else {
                toast.error(data.message || 'Failed to create coupon');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    // Loading State
    if (loading) {
        return <Loader text="Loading Coupon Management..." />;
    }

    // Access Denied State
    if (!isAuthorized) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-red-500/5">
                    <Lock className="w-12 h-12 text-red-400" />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">Access Denied</h1>
                <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                    You don't have permission to access this page. Only administrators can manage coupons.
                </p>
                <Link
                    href="/dashboard"
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete Coupon"
                message="Are you sure you want to delete this coupon? This action cannot be undone."
                type="danger"
                confirmText="Yes, Delete"
                onConfirm={confirmDelete}
            />
            <Modal
                isOpen={expireModalOpen}
                onClose={() => setExpireModalOpen(false)}
                title="Expire Coupon"
                message="Are you sure you want to expire this coupon? It will no longer be usable by users."
                type="danger"
                confirmText="Yes, Expire"
                onConfirm={confirmExpire}
            />
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-indigo-100/50">
                            Marketing Tools
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Coupon Management</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium">Create and manage discount offers for your courses.</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(!isCreating)}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        <Plus size={18} /> {isCreating ? 'Cancel' : 'New Coupon'}
                    </button>
                </div>

                {isCreating && (
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Coupon Code</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="SUMMER50"
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold tracking-widest"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Type</label>
                                <select
                                    value={newCoupon.discountType}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold"
                                >
                                    <option value="percentage">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount (₹)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Discount Value</label>
                                <input
                                    required
                                    type="number"
                                    placeholder="50"
                                    value={newCoupon.discountValue}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Expiry Date</label>
                                <input
                                    required
                                    type="date"
                                    value={newCoupon.expiryDate}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-600"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Max Uses</label>
                                <input
                                    required
                                    type="number"
                                    value={newCoupon.maxUses}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold text-slate-600"
                                />
                            </div>

                            {/* New Fields: Course & User Selection */}
                            <div className="md:col-span-1">
                                <GenericMultiSelect
                                    label="Restricted to Courses (Optional)"
                                    placeholder="All Courses"
                                    options={courses}
                                    selectedIds={newCoupon.applicableCourses}
                                    onChange={(ids) => setNewCoupon({ ...newCoupon, applicableCourses: ids })}
                                    displayKey="title"
                                    idKey="_id"
                                />
                            </div>
                            <div className="md:col-span-1">
                                <GenericMultiSelect
                                    label="Restricted to Users (Optional)"
                                    placeholder="All Users"
                                    options={users}
                                    selectedIds={newCoupon.applicableUsers}
                                    onChange={(ids) => setNewCoupon({ ...newCoupon, applicableUsers: ids })}
                                    displayKey="email"
                                    idKey="_id"
                                />
                            </div>

                            <div className="flex items-end">
                                <button type="submit" className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-900 transition-all">
                                    Create Coupon
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coupons.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                            <Tag className="mx-auto text-slate-300 mb-4" size={48} />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No coupons created yet</p>
                        </div>
                    ) : (
                        coupons.map(coupon => (
                            <div key={coupon._id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <Link href={`/admin/coupons/${coupon._id}`} className="text-slate-300 hover:text-indigo-600 transition-colors">
                                        <Edit size={18} />
                                    </Link>
                                    {coupon.currentUses > 0 ? (
                                        <button onClick={() => handleExpireClick(coupon._id)} className="text-slate-300 hover:text-amber-500 transition-colors" title="Invalidate Coupon">
                                            <Ban size={18} />
                                        </button>
                                    ) : (
                                        <button onClick={() => handleDeleteClick(coupon._id)} className="text-slate-300 hover:text-red-500 transition-colors" title="Delete Coupon">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                        <Tag size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 tracking-widest text-lg leading-tight uppercase">{coupon.code}</h3>
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                                            {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-6 border-t border-slate-50">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-400 font-medium flex items-center gap-1.5"><Calendar size={14} /> Expiry</span>
                                        <span className="font-bold text-slate-700">{new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-400 font-medium flex items-center gap-1.5"><Users size={14} /> Usage</span>
                                        <span className="font-bold text-slate-700">{coupon.currentUses} / {coupon.maxUses}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${new Date() > new Date(coupon.expiryDate) ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                            {new Date() > new Date(coupon.expiryDate) ? 'Expired' : 'Active'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
