'use client';

import { useEffect, useState } from 'react';
import {
    ChevronLeft,
    DollarSign,
    MoreVertical,
    Search,
    Download,
    CreditCard,
    CheckCircle2,
    Clock,
    TrendingUp,
    Users,
    ArrowUpRight,
    Filter,
    RefreshCcw,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Loader from '@/components/Loader';

export default function AdminPayoutsPage() {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
    const toast = useToast();

    const fetchUserAndRevenue = async () => {
        setLoading(true);
        try {
            const [userRes, revRes] = await Promise.all([
                fetch('/api/auth/me'),
                fetch('/api/admin/revenue', { cache: 'no-store' })
            ]);

            const userData = await userRes.json();
            const revData = await revRes.json();

            if (userData.user) setCurrentUser(userData.user);
            if (revData.success) {
                setRevenueData(revData.revenueData);
            } else {
                toast.error(revData.message || 'Failed to fetch revenue data');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Error loading page data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserAndRevenue();
    }, []);

    const fetchRevenue = async () => {
        try {
            const res = await fetch('/api/admin/revenue', { cache: 'no-store' });
            const data = await res.json();
            if (data.success) {
                setRevenueData(data.revenueData);
            }
        } catch (error) {
            console.error('Refresh error:', error);
        }
    };

    const isAdmin = currentUser?.roles?.includes('Admin');

    const handlePayInstructor = (course) => {
        if (!isAdmin) return;
        setSelectedCourse(course);
        setTransactionId('');
        setIsPayoutModalOpen(true);
    };

    const confirmPayout = async () => {
        if (!transactionId.trim()) {
            toast.error("Please enter a transaction ID");
            return;
        }

        setIsProcessing(true);
        try {
            const res = await fetch('/api/admin/revenue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: selectedCourse._id,
                    transactionId
                })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Payout settled successfully");
                setIsPayoutModalOpen(false);
                fetchRevenue(); // Refresh data
            } else {
                toast.error(data.message || "Failed to record payout");
            }
        } catch (error) {
            toast.error("Error processing payout");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleBatchPayout = async () => {
        if (!transactionId.trim()) {
            toast.error("Please enter a batch transaction ID");
            return;
        }

        const unpaidCourses = filteredData.filter(c => c.payoutStatus !== 'Paid' && c.totalRevenue > 0);
        if (unpaidCourses.length === 0) {
            toast.error("No pending payouts to settle");
            return;
        }

        setIsProcessing(true);
        try {
            // Settle them sequentially or in a batch if the API supported it. 
            // For now, our API handles single, so we record this unique batch ID for all pending in this filtered view.
            const results = await Promise.all(unpaidCourses.map(course =>
                fetch('/api/admin/revenue', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseId: course._id,
                        transactionId: `${transactionId} (Batch)`
                    })
                }).then(r => r.json())
            ));

            const successCount = results.filter(r => r.success).length;
            toast.success(`Succesfully settled ${successCount} payouts`);
            setIsBatchModalOpen(false);
            fetchRevenue();
        } catch (error) {
            toast.error("Error processing batch payout");
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredData = revenueData.filter(data =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPlatformEarnings = revenueData.reduce((acc, curr) => acc + curr.platformShare, 0);
    const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.totalRevenue, 0);
    const totalPaid = revenueData.filter(c => c.payoutStatus === 'Paid').reduce((acc, curr) => acc + curr.instructorShare, 0);
    const totalPending = revenueData.filter(c => c.payoutStatus !== 'Paid').reduce((acc, curr) => acc + curr.instructorShare, 0);

    const handleExport = () => {
        if (filteredData.length === 0) {
            toast.error("No data to export");
            return;
        }

        const headers = isAdmin
            ? ["Course Title", "Instructor", "Enrollments", "Total Revenue (₹)", "Platform Share (40%) (₹)", "Instructor Share (60%) (₹)", "Status"]
            : ["Course Title", "Enrollments", "Total Revenue (₹)", "My Share (60%) (₹)", "Status"];

        const rows = filteredData.map(course => {
            return isAdmin
                ? [
                    `"${course.title}"`,
                    `"${course.instructorName}"`,
                    course.enrollmentCount,
                    course.totalRevenue,
                    course.platformShare,
                    course.instructorShare,
                    course.payoutStatus
                ]
                : [
                    `"${course.title}"`,
                    course.enrollmentCount,
                    course.totalRevenue,
                    course.instructorShare,
                    course.payoutStatus
                ];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `VidyaSetu_Revenue_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Report exported successfully");
    };

    if (loading) return <Loader text="Calculating financials..." />;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/courses" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                {isAdmin ? 'Payouts & Revenue' : 'My Earnings & Payouts'}
                            </h1>
                            <p className="text-slate-500 text-sm font-medium">
                                {isAdmin ? 'Manage course earnings and instructor settlements.' : 'Track your course revenue and payment status.'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                        >
                            <Download className="w-4 h-4 text-indigo-600" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Global Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 p-8 bg-indigo-50 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Gross Revenue</p>
                        <div className="flex items-end gap-2">
                            <p className="text-2xl font-black text-slate-900 leading-none">₹{totalRevenue.toLocaleString()}</p>
                            <span className="text-xs text-emerald-500 font-bold flex items-center mb-0.5"><ArrowUpRight className="w-3 h-3" /> 12%</span>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
                            <div className="absolute -right-4 -top-4 p-8 bg-emerald-50 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Platform Earnings (40%)</p>
                            <p className="text-2xl font-black text-emerald-600 leading-none">₹{totalPlatformEarnings.toLocaleString()}</p>
                        </div>
                    )}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 p-8 bg-purple-50 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAdmin ? 'Settled Payouts' : 'Already Paid'}</p>
                        <p className="text-2xl font-black text-emerald-600 leading-none">₹{totalPaid.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 p-8 bg-amber-50 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAdmin ? 'Pending Payouts' : 'Pending Settlement'}</p>
                        <p className="text-2xl font-black text-amber-600 leading-none">₹{totalPending.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search by course or instructor..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course Particulars</th>
                                    {isAdmin && <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructor</th>}
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total Revenue</th>
                                    {isAdmin && <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Platform (40%)</th>}
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right text-indigo-600">{isAdmin ? 'Instructor (60%)' : 'My Share (60%)'}</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">{isAdmin ? 'Settlement' : 'Action'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-sans">
                                {filteredData.map((course) => (
                                    <tr key={course._id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="font-extrabold text-slate-800 text-sm leading-tight mb-0.5">{course.title}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-indigo-400">{course.enrollmentCount} Enrollments</span>
                                                    {course.payoutTransactionId && (
                                                        <>
                                                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">Ref: {course.payoutTransactionId}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-slate-800 leading-tight">{course.instructorName}</span>
                                                    <span className="text-[10px] text-slate-400 font-medium">{course.instructorEmail}</span>
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-5 text-right">
                                            <p className="text-sm font-black text-slate-700 font-mono">₹{course.totalRevenue.toLocaleString()}</p>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-5 text-right">
                                                <p className="text-sm font-bold text-slate-400 font-mono">₹{course.platformShare.toLocaleString()}</p>
                                            </td>
                                        )}
                                        <td className="px-6 py-5 text-right">
                                            <p className="text-sm font-black text-indigo-600 font-mono">₹{course.instructorShare.toLocaleString()}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${course.payoutStatus === 'Paid'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {course.payoutStatus === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                                    {course.payoutStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            {isAdmin && course.totalRevenue > 0 && course.payoutStatus !== 'Paid' ? (
                                                <button
                                                    onClick={() => handlePayInstructor(course)}
                                                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                                                >
                                                    <CreditCard size={14} /> Pay Now
                                                </button>
                                            ) : (
                                                <span className="text-xs font-bold text-slate-300 italic">{course.payoutStatus === 'Paid' ? 'Settled' : 'Processing'}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                                                    <DollarSign size={40} />
                                                </div>
                                                <div>
                                                    <p className="text-slate-900 font-black text-lg">No Financial Data</p>
                                                    <p className="text-slate-500 text-sm font-medium">Try adjusting your search criteria.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Bottom Summary Bar */}
                    <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{isAdmin ? 'Total Network Volume' : 'My Total Volume'}</p>
                                <p className="text-xl font-black">₹{totalRevenue.toLocaleString()}</p>
                            </div>
                            {isAdmin && (
                                <>
                                    <div className="w-px h-8 bg-slate-800"></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Company Net Profit</p>
                                        <p className="text-xl font-black text-emerald-400">₹{totalPlatformEarnings.toLocaleString()}</p>
                                    </div>
                                </>
                            )}
                            {!isAdmin && (
                                <>
                                    <div className="w-px h-8 bg-slate-800"></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Net Earnings</p>
                                        <p className="text-xl font-black text-indigo-400">₹{(totalRevenue * 0.6).toLocaleString()}</p>
                                    </div>
                                </>
                            )}
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    setTransactionId('');
                                    setIsBatchModalOpen(true);
                                }}
                                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-black text-sm transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                            >
                                Process Batch Payouts
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Payout Modal */}
            {isPayoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8">
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <CreditCard size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Settle Payout</h2>
                            <p className="text-slate-500 text-sm font-medium mb-6">
                                Recording payout of <span className="text-indigo-600 font-black">₹{selectedCourse?.instructorShare.toLocaleString()}</span> for course <span className="font-bold">"{selectedCourse?.title}"</span>.
                            </p>

                            {/* Instructor Payout Details */}
                            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payout Destination</p>
                                {selectedCourse?.instructorPayoutDetails ? (
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase">Bank</p>
                                                <p className="text-xs font-black text-slate-800 truncate">{selectedCourse.instructorPayoutDetails.bankName || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase">A/C No.</p>
                                                <p className="text-xs font-black text-slate-800">{selectedCourse.instructorPayoutDetails.accountNumber || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase">IFSC</p>
                                                <p className="text-xs font-black text-slate-800">{selectedCourse.instructorPayoutDetails.ifscCode || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase">UPI ID</p>
                                                <p className="text-xs font-black text-indigo-600 truncate">{selectedCourse.instructorPayoutDetails.upiId || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-1">
                                        <p className="text-[10px] font-bold text-amber-600 flex items-center gap-2">
                                            <AlertCircle size={12} /> Payout details not shared by instructor
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Transaction / Reference ID</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono"
                                        placeholder="e.g. PAY-89230492"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <button
                                    onClick={() => setIsPayoutModalOpen(false)}
                                    className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPayout}
                                    disabled={isProcessing}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-indigo-200 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm Payment'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Batch Payout Modal */}
            {isBatchModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <RefreshCcw size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">Batch Settlement</h2>
                            <p className="text-slate-500 text-sm font-medium mb-6">
                                You are about to settle <span className="font-bold text-slate-900">{filteredData.filter(c => c.payoutStatus !== 'Paid' && c.totalRevenue > 0).length}</span> pending payouts.
                                Total settlement: <span className="text-emerald-600 font-black">₹{filteredData.filter(c => c.payoutStatus !== 'Paid' && c.totalRevenue > 0).reduce((acc, curr) => acc + curr.instructorShare, 0).toLocaleString()}</span>
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Batch Reference ID</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-mono"
                                        placeholder="e.g. BATCH-JAN-01"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-8">
                                <button
                                    onClick={() => setIsBatchModalOpen(false)}
                                    className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBatchPayout}
                                    disabled={isProcessing}
                                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-black hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-emerald-200 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin w-4 h-4" /> : 'Settle All'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Loader2({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}
