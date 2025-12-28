'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    CreditCard,
    User,
    BookOpen,
    Clock,
    AlertCircle,
    CheckCircle2,
    RefreshCcw,
    Loader2,
    Eye,
    ChevronLeft,
    FileText
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Modal from '@/components/Modal';

export default function AdminTransactionsPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isAuthorized, setIsAuthorized] = useState(true);
    const toast = useToast();

    // Modal States
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });
    const [refundingId, setRefundingId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/transactions');

            if (res.status === 401) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }

            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleRefundClick = (order) => {
        setConfirmModal({
            isOpen: true,
            title: 'Confirm Refund',
            message: `Are you sure you want to process a refund for order ${order.razorpayOrderId}?`,
            onConfirm: () => handleRefund(order._id)
        });
    };

    const handleRefund = async (orderId) => {
        setRefundingId(orderId);
        try {
            const res = await fetch('/api/admin/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    action: 'refund',
                    refundMethod: 'razorpay',
                    refundNote: 'Initiated from transactions list'
                }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                fetchOrders();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Refund process failed');
        } finally {
            setRefundingId(null);
        }
    };

    const exportToCSV = () => {
        if (filteredOrders.length === 0) {
            toast.info('No transactions to export');
            return;
        }

        // CSV Headers
        const headers = [
            'Order ID',
            'Date',
            'Student Name',
            'Email',
            'Course Title',
            'Coupon Code',
            'Amount (₹)',
            'Status'
        ];

        // CSV Rows
        const rows = filteredOrders.map(order => [
            order.razorpayOrderId || '',
            new Date(order.createdAt).toLocaleString(),
            `${order.user?.firstName || ''} ${order.user?.lastName || ''}`.trim(),
            order.user?.email || '',
            order.course?.title || '',
            order.couponCode || '-',
            order.amount || 0,
            order.status || ''
        ]);

        const escapeCSV = (value) => {
            const str = String(value);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const csvContent = [
            headers.map(escapeCSV).join(','),
            ...rows.map(row => row.map(escapeCSV).join(','))
        ].join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Transactions exported successfully');
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'failed': return 'bg-red-50 text-red-600 border-red-100';
            case 'refunded': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const filteredOrders = orders.filter(order => {
        const fullName = `${order.user?.firstName} ${order.user?.lastName}`.toLowerCase();
        const matchesSearch =
            fullName.includes(searchTerm.toLowerCase()) ||
            order.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.course?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    if (loading) return (
        <div className="min-h-screen bg-white pt-32 flex justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
    );

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-slate-200 shadow-xl text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="text-red-500" size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Access Denied</h1>
                    <p className="text-slate-500 mb-8">You do not have permission to view this financial data. This area is restricted to administrators only.</p>
                    <Link href="/" className="inline-block w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/30 pt-24 pb-16 px-4 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-indigo-100/50">
                        Financial Overview
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transactions Tracking</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Monitor all successful and failed payment activities across the platform.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={exportToCSV}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                            >
                                <Download size={16} /> Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by user, email, course or order ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold text-slate-600 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transaction Info</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student Details</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Course Purchased</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.map(order => (
                                    <tr key={order._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800 tracking-tight mb-0.5">{order.razorpayOrderId}</span>
                                                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                                    <Clock size={10} /> {new Date(order.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px]">
                                                    {order.user?.firstName?.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-800">{order.user?.firstName} {order.user?.lastName}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{order.user?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800 truncate max-w-[200px]">{order.course?.title}</span>
                                                {order.couponCode && (
                                                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 w-fit px-1.5 py-0.5 rounded mt-1 flex items-center gap-1 uppercase tracking-tighter shadow-sm border border-indigo-100/30">
                                                        <CreditCard size={10} /> Coupon: {order.couponCode}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-sm font-black text-slate-900">₹{order.amount?.toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`px-2 py-1 rounded-md border text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${getStatusStyle(order.status)} shadow-sm`}>
                                                {order.status === 'completed' ? <CheckCircle2 size={12} /> :
                                                    order.status === 'failed' ? <AlertCircle size={12} /> :
                                                        order.status === 'refunded' ? <RefreshCcw size={12} /> : null}
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/admin/transactions/${order._id}`}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 rounded-lg"
                                                    title="View Full Details"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <Link
                                                    href={`/invoice/${order._id}`}
                                                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors bg-gray-50 rounded-lg"
                                                    title="View Invoice"
                                                    target="_blank"
                                                >
                                                    <FileText size={16} />
                                                </Link>
                                                {order.status === 'completed' && (
                                                    <button
                                                        onClick={() => handleRefundClick(order)}
                                                        className="p-2 text-gray-400 hover:text-rose-600 transition-colors bg-gray-50 rounded-lg disabled:opacity-50"
                                                        title="Process Refund"
                                                        disabled={refundingId === order._id}
                                                    >
                                                        {refundingId === order._id ? (
                                                            <Loader2 size={16} className="animate-spin text-rose-600" />
                                                        ) : (
                                                            <RefreshCcw size={16} />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <CreditCard className="mx-auto text-slate-300 mb-4" size={40} />
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No transactions found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                title={confirmModal.title}
                message={confirmModal.message}
                type="danger"
                confirmText="Yes, Proceed"
                onConfirm={confirmModal.onConfirm}
            />
        </div>
    );
}
