'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    CreditCard,
    User,
    BookOpen,
    Clock,
    CheckCircle2,
    AlertCircle,
    RefreshCcw,
    Loader2,
    ShieldCheck,
    ShieldAlert,
    Mail,
    Phone,
    Calendar,
    ArrowRight,
    ExternalLink,
    Tag,
    IndianRupee,
    FileText,
    Lock,
    Unlock
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Image from 'next/image';
import Modal from '@/components/Modal';

export default function TransactionDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const toast = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refundMethod, setRefundMethod] = useState('razorpay');
    const [refundNote, setRefundNote] = useState('');
    const [isRefunding, setIsRefunding] = useState(false);
    const [isUpdatingAccess, setIsUpdatingAccess] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);

    useEffect(() => {
        if (id) fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            const res = await fetch(`/api/admin/transactions/${id}`);
            const data = await res.json();
            if (data.success) {
                setOrder(data.order);
            } else {
                toast.error(data.message);
                router.push('/admin/transactions');
            }
        } catch (error) {
            toast.error('Failed to fetch transaction details');
        } finally {
            setLoading(false);
        }
    };

    const handleRefundClick = () => {
        setShowRefundModal(true);
    };

    const handleConfirmRefund = async () => {
        setShowRefundModal(false);
        setIsRefunding(true);
        try {
            const res = await fetch('/api/admin/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order._id,
                    action: 'refund',
                    refundMethod,
                    refundNote
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                fetchOrder();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Refund process failed');
        } finally {
            setIsRefunding(false);
        }
    };

    const handleUpdateAccess = async (newStatus) => {
        setIsUpdatingAccess(true);
        try {
            const res = await fetch(`/api/admin/transactions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessStatus: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                fetchOrder();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update access status');
        } finally {
            setIsUpdatingAccess(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'failed': return 'bg-red-50 text-red-600 border-red-100';
            case 'refunded': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 pt-32 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Detailed Records...</p>
        </div>
    );

    if (!order) return null;

    return (
        <div className="min-h-screen bg-slate-50/50 pt-24 pb-16 px-4 font-sans">
            <div className="max-w-5xl mx-auto">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/admin/transactions"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold group"
                    >
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 group-hover:border-indigo-100 transition-all">
                            <ChevronLeft size={18} />
                        </div>
                        Back to Transactions
                    </Link>
                </div>

                {/* Header Card */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-4 border border-indigo-100/50">
                                Transaction ID: {order.razorpayOrderId}
                            </div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Order Summary</h1>
                            <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                                <Clock size={16} /> Processed on {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end justify-center">
                            <div className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-widest inline-flex items-center gap-2 mb-4 ${getStatusStyle(order.status)}`}>
                                {order.status === 'completed' ? <CheckCircle2 size={16} /> :
                                    order.status === 'failed' ? <AlertCircle size={16} /> :
                                        order.status === 'refunded' ? <RefreshCcw size={16} /> : null}
                                {order.status}
                            </div>
                            <div className="text-4xl font-black text-slate-900">
                                ₹{order.amount.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex gap-4">
                            <Link
                                href={`/invoice/${order._id}`}
                                className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                <FileText size={16} /> View/Print Invoice
                            </Link>
                            {order.invoiceNumber && (
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-lg">
                                    Invoice: {order.invoiceNumber}
                                </div>
                            )}
                        </div>
                        {order.status === 'completed' && (
                            <div className="flex items-center gap-3">
                                <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                                    <button
                                        onClick={() => setRefundMethod('razorpay')}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${refundMethod === 'razorpay' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Razorpay
                                    </button>
                                    <button
                                        onClick={() => setRefundMethod('manual')}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${refundMethod === 'manual' ? 'bg-amber-600 text-white shadow-md shadow-amber-100' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        Manual
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Note (Reason for refund)"
                                    value={refundNote}
                                    onChange={(e) => setRefundNote(e.target.value)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:border-indigo-500 outline-none w-48 shadow-sm transition-all"
                                />
                                <button
                                    onClick={handleRefundClick}
                                    disabled={loading || isRefunding}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg active:scale-95 ${refundMethod === 'manual' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'}`}
                                >
                                    {isRefunding ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                                    Refund
                                </button>
                            </div>
                        )}
                        {order.status === 'refunded' && (
                            <div className="flex items-center gap-4 bg-amber-50 border border-amber-100 px-4 py-2 rounded-xl">
                                <div className="text-amber-800 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <RefreshCcw size={14} /> Refunded via {order.refundMethod}
                                </div>
                                {order.refundNote && (
                                    <div className="text-amber-600 text-[10px] italic">
                                        " {order.refundNote} "
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Details */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Course Info */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <BookOpen className="text-indigo-500" size={20} /> Course Details
                            </h3>
                            <div className="flex gap-6">
                                <div className="relative h-24 w-40 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                                    <Image
                                        src={order.course?.thumbnail || '/assets/images/course-placeholder.jpg'}
                                        alt={order.course?.title || 'Course'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                                        {order.course?.title || 'Deleted Course'}
                                    </h4>
                                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                        {order.course?.description || 'This course is no longer available in the active catalog.'}
                                    </p>
                                    {order.course && (
                                        <Link
                                            href={`/courses/${order.course?.slug}`}
                                            className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline"
                                        >
                                            View Landing Page <ExternalLink size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Payment Verification / Access Management */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-8">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <ShieldCheck className="text-emerald-500" size={20} /> Access Management
                                </h3>
                                <div className="flex flex-col md:flex-row gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Status</p>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${order.accessStatus === 'blocked' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                            {order.accessStatus === 'blocked' ? <Lock size={14} /> : <Unlock size={14} />}
                                            {order.accessStatus || 'Active'}
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-3 font-medium">
                                            {order.accessStatus === 'blocked'
                                                ? 'The student is currently blocked from accessing this course content.'
                                                : 'The student has full access to the course content and resources.'}
                                        </p>
                                    </div>
                                    <div className="flex md:flex-col justify-end gap-3 self-center md:self-stretch">
                                        <button
                                            onClick={() => handleUpdateAccess(order.accessStatus === 'blocked' ? 'active' : 'blocked')}
                                            disabled={isUpdatingAccess}
                                            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-50 ${order.accessStatus === 'blocked' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-100'}`}
                                        >
                                            {isUpdatingAccess ? <Loader2 size={16} className="animate-spin" /> : (order.accessStatus === 'blocked' ? <Unlock size={16} /> : <Lock size={16} />)}
                                            {order.accessStatus === 'blocked' ? 'Restore Access' : 'Block Access'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="space-y-8">
                        {/* Student Details */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <User className="text-indigo-500" size={20} /> Student Info
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-inner">
                                    {(order.user?.firstName || order.userDetails?.firstName || 'U').charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 line-clamp-1">
                                        {order.user ? `${order.user.firstName} ${order.user.lastName}` :
                                            order.userDetails ? `${order.userDetails.firstName} ${order.userDetails.lastName}` : 'Deleted User'}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {order.user ? 'Active Platform Member' : 'Guest/Deleted User'}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <Mail size={14} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                                        <p className="text-xs font-bold text-slate-800 truncate">{order.user?.email || order.userDetails?.email || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <Phone size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</p>
                                        <p className="text-xs font-bold text-slate-800">{order.user?.mobileNumber || order.userDetails?.mobileNumber || 'N/A'}</p>
                                    </div>
                                </div>
                                {order.user?.createdOn && (
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                            <Calendar size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Member Since</p>
                                            <p className="text-xs font-bold text-slate-800">{new Date(order.user.createdOn).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {order.user && (
                                <Link
                                    href={`/admin/users/${order.user._id}/enrollments`}
                                    className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    View Profile <ArrowRight size={14} />
                                </Link>
                            )}
                        </div>

                        {/* Billing Summary */}
                        <div className="rounded-3xl border border-slate-200 shadow-sm p-8 bg-indigo-600 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                <Tag size={80} />
                            </div>
                            <h3 className="text-lg font-black mb-6 flex items-center gap-2 relative z-10">
                                <IndianRupee size={20} /> Billing Details
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-sm">
                                    <span className="opacity-70 font-medium">Course Price</span>
                                    <span className="font-bold">₹{(order.actualAmount || 0).toLocaleString()}</span>
                                </div>
                                {order.couponCode && (
                                    <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/20">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Coupon Applied</p>
                                            <p className="text-xs font-black">{order.couponCode}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Discount</p>
                                            <p className="text-xs font-black">-₹{(order.discountAmount || 0).toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Net Paid</span>
                                    <span className="text-3xl font-black">₹{(order.amount || 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <ShieldAlert className="text-slate-400" size={20} /> Gateway Logs
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Razorpay Payment ID</p>
                                    <p className="text-[13px] font-bold text-slate-800 break-all">{order.razorpayPaymentId || 'N/A'}</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signature Verification</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${order.razorpaySignature ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
                                        <p className="text-[11px] font-bold text-slate-600">{order.razorpaySignature ? 'Verified Secure' : 'Pending/Incomplete'}</p>
                                    </div>
                                    {order.razorpaySignature && (
                                        <p className="text-[8px] font-mono text-slate-400 mt-2 break-all opacity-60 leading-tight border-t border-slate-200 pt-2">
                                            {order.razorpaySignature}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showRefundModal}
                onClose={() => setShowRefundModal(false)}
                onConfirm={handleConfirmRefund}
                title="Confirm Refund"
                message={`Are you sure you want to process a ${refundMethod} refund of ₹${order.amount.toLocaleString()} for this transaction? This action cannot be undone.`}
                type="danger"
                confirmText="Process Refund"
            />
        </div>
    );
}
