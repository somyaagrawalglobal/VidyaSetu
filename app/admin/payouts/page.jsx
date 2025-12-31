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
    Filter
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Loader from '@/components/Loader';

export default function AdminPayoutsPage() {
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const toast = useToast();

    useEffect(() => {
        fetchUser();
        fetchRevenue();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) setCurrentUser(data.user);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    const fetchRevenue = async () => {
        try {
            const res = await fetch('/api/admin/revenue');
            const data = await res.json();
            if (data.success) {
                setRevenueData(data.revenueData);
            } else {
                // If it fails with 401, maybe handled by layout, but let's show an error
                toast.error(data.message || 'Failed to fetch revenue data');
            }
        } catch (error) {
            toast.error('Error loading revenue data');
        } finally {
            setLoading(false);
        }
    };

    const isAdmin = currentUser?.roles?.includes('Admin');

    const handlePayInstructor = (course) => {
        if (!isAdmin) return;
        // Modal or logic to process payment
        toast.success(`Payout of ₹${course.instructorShare.toLocaleString()} initialized for ${course.instructorName}`);
    };

    const filteredData = revenueData.filter(data =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPlatformEarnings = revenueData.reduce((acc, curr) => acc + curr.platformShare, 0);
    const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.totalRevenue, 0);

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
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payouts & Revenue</h1>
                            <p className="text-slate-500 text-sm font-medium">Manage course earnings and instructor settlements.</p>
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
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{isAdmin ? 'Instructor Settlements' : 'My Net Earnings (60%)'}</p>
                        <p className="text-2xl font-black text-purple-600 leading-none">₹{(totalRevenue * 0.6).toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group">
                        <div className="absolute -right-4 -top-4 p-8 bg-amber-50 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Enrollments</p>
                        <p className="text-2xl font-black text-slate-900 leading-none">{revenueData.reduce((acc, curr) => acc + curr.enrollmentCount, 0)}</p>
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
                                                    <span className="text-[10px] font-bold text-slate-400">{course.instructorName}</span>
                                                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                    <span className="text-[10px] font-bold text-indigo-400">{course.enrollmentCount} Sales</span>
                                                </div>
                                            </div>
                                        </td>
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
                            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-black text-sm transition-all shadow-xl shadow-indigo-500/20">
                                Process Batch Payouts
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
