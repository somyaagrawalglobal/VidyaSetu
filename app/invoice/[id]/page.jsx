'use client';

import { useState, useEffect } from 'react';
import {
    Download,
    Printer,
    CheckCircle2,
    Calendar,
    IndianRupee,
    User,
    BookOpen,
    Loader2,
    AlertCircle,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function InvoicePage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            const res = await fetch(`/api/invoices/${id}`);
            const data = await res.json();
            if (data.success) {
                setOrder(data.order);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to load invoice');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Generating Invoice...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-slate-200 shadow-xl text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="text-red-500" size={32} />
                </div>
                <h1 className="text-2xl font-black text-slate-900 mb-2">Error</h1>
                <p className="text-slate-500 mb-8">{error}</p>
                <Link href="/dashboard" className="inline-block w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );

    if (!order) return null;

    return (
        <div className="min-h-screen bg-slate-100/50 pt-24 pb-12 px-4 print:bg-white print:py-0 print:px-0">
            <div className="max-w-4xl mx-auto">
                {/* Actions (Non-printable) */}
                <div className="mb-6 flex justify-between items-center print:hidden">
                    <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-bold">
                        <ChevronLeft size={18} /> Back to Dashboard
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                        >
                            <Printer size={16} /> Print Invoice
                        </button>
                    </div>
                </div>

                {/* Invoice Paper */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:border-none print:shadow-none print:rounded-none">
                    {/* Header */}
                    <div className="bg-slate-900 text-white p-10 flex flex-col md:flex-row justify-between gap-8 items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Link href="/" className="inline-block">
                                    <span className="text-2xl font-black tracking-tighter text-white">VIDYA<span className="text-indigo-400">SETU</span></span>
                                </Link>
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black uppercase tracking-tight">Invoice</h1>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{order.invoiceNumber}</p>
                            </div>
                        </div>
                        <div className="text-right md:text-right space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                                <CheckCircle2 size={12} /> {order.status === 'completed' ? 'Paid' : 'Refunded'}
                            </div>
                            <div className="text-slate-400 text-xs font-medium">
                                <p>VidyaSetu Academy Pvt Ltd.</p>
                                <p>Whitefield Main Road, Bengaluru</p>
                                <p>Karnataka, India - 560066</p>
                                <p>GSTIN: 29AAAAA0000A1Z5</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        {/* Billing Info */}
                        <div className="grid grid-cols-2 gap-12 mb-12">
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Billed To</h3>
                                <div className="space-y-1">
                                    <p className="text-lg font-black text-slate-900">{order.user?.firstName} {order.user?.lastName}</p>
                                    <p className="text-sm text-slate-500 font-medium">{order.user?.email}</p>
                                    <p className="text-sm text-slate-500 font-medium">{order.user?.mobileNumber || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Payment Details</h3>
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-500 font-medium">Date: <span className="text-slate-900 font-bold">{new Date(order.invoiceDate || order.createdAt).toLocaleDateString()}</span></p>
                                    <p className="text-sm text-slate-500 font-medium">Order ID: <span className="text-slate-900 font-bold">{order.razorpayOrderId}</span></p>
                                    <p className="text-sm text-slate-500 font-medium">Payment Method: <span className="text-slate-900 font-bold">Online / Razorpay</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden mb-8">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Unit Price</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Qty</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-6 py-6 font-bold text-slate-800">
                                            {order.course?.title}
                                            <p className="text-[10px] font-medium text-slate-400 mt-1 max-w-xs">{order.course?.description}</p>
                                        </td>
                                        <td className="px-6 py-6 text-right text-slate-600 font-medium">₹{order.actualAmount.toLocaleString()}</td>
                                        <td className="px-6 py-6 text-center text-slate-600 font-medium">1</td>
                                        <td className="px-6 py-6 text-right text-slate-800 font-black">₹{order.actualAmount.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end mb-12">
                            <div className="w-full max-w-sm space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Subtotal</span>
                                    <span className="text-slate-900 font-bold">₹{order.actualAmount.toLocaleString()}</span>
                                </div>
                                {order.discountAmount > 0 && (
                                    <div className="flex justify-between text-sm text-emerald-600">
                                        <span className="font-medium">Discount {order.couponCode ? `(${order.couponCode})` : ''}</span>
                                        <span className="font-bold">-₹{order.discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-lg font-black text-slate-900 uppercase">Total Paid</span>
                                    <span className="text-2xl font-black text-indigo-600">₹{order.amount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Notes */}
                        <div className="pt-10 border-t border-slate-100 text-center space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Thank you for learning with VidyaSetu</p>
                            <p className="text-[9px] text-slate-400 leading-relaxed max-w-md mx-auto">
                                This is a computer-generated invoice and does not require a physical signature. For any support regarding this transaction, please contact support@vidyasetu.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    body {
                        background-color: white !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
