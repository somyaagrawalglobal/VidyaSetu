'use client';

import { useEffect, useState, use } from 'react';
import {
    BookOpen,
    ArrowLeft,
    ShieldAlert,
    ShieldCheck,
    Clock,
    LayoutGrid,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Modal from '@/components/Modal';

export default function UserEnrollmentsPage({ params }) {
    const { userId } = use(params);
    const [enrollments, setEnrollments] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [actionType, setActionType] = useState(''); // 'block' or 'unblock'

    useEffect(() => {
        fetchEnrollments();
    }, [userId]);

    const fetchEnrollments = async () => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/enrollments`);
            const data = await res.json();
            if (data.success) {
                setEnrollments(data.enrollments);
                setUserName(data.user.name);
            } else {
                toast.error(data.message || 'Failed to fetch enrollments');
            }
        } catch (error) {
            toast.error('Error loading enrollments');
        } finally {
            setLoading(false);
        }
    };

    const handleActionClick = (enrollment, type) => {
        setSelectedEnrollment(enrollment);
        setActionType(type);
        setModalOpen(true);
    };

    const confirmAction = async () => {
        if (!selectedEnrollment) return;

        const newStatus = actionType === 'block' ? 'blocked' : 'active';
        try {
            // Reusing the same student management API
            const res = await fetch(`/api/courses/${selectedEnrollment.courseId}/students`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: selectedEnrollment.orderId,
                    accessStatus: newStatus
                }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                // Update local state
                setEnrollments(enrollments.map(e =>
                    e.orderId === selectedEnrollment.orderId ? { ...e, accessStatus: newStatus } : e
                ));
            } else {
                toast.error(data.message || 'Action failed');
            }
        } catch (error) {
            toast.error('Error performing action');
        } finally {
            setModalOpen(false);
            setSelectedEnrollment(null);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`${actionType === 'block' ? 'Block' : 'Unblock'} Access`}
                message={`Are you sure you want to ${actionType} access for the course "${selectedEnrollment?.courseTitle}"?`}
                confirmText={`Yes, ${actionType === 'block' ? 'Block' : 'Unblock'}`}
                onConfirm={confirmAction}
                type={actionType === 'block' ? 'danger' : 'info'}
            />

            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link href="/admin/users" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium text-sm mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Users
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-emerald-100/50">
                        Enrollment Management
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{userName}</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Viewing all course enrollments and progress for this student.</p>
                </div>

                {/* Enrollment Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {enrollments.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-dashed border-slate-300 py-20 text-center">
                            <BookOpen className="mx-auto text-slate-200 mb-4" size={48} />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No course enrollments found</p>
                        </div>
                    ) : (
                        enrollments.map((enrollment) => (
                            <div key={enrollment.orderId} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-stretch">
                                {/* Thumbnail */}
                                <div className="w-full md:w-64 h-40 md:h-auto relative bg-slate-100 border-r border-slate-50">
                                    {enrollment.courseThumbnail ? (
                                        <img src={enrollment.courseThumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <LayoutGrid className="text-slate-300" size={32} />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-black text-slate-900 leading-tight">{enrollment.courseTitle}</h3>
                                            {enrollment.accessStatus === 'blocked' ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100">
                                                    <ShieldAlert size={10} /> Access Blocked
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                                                    <ShieldCheck size={10} /> Active Access
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium mb-8">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} /> Enrolled on {new Date(enrollment.enrolledDate).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {/* Progress */}
                                        <div className="max-w-sm">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                                                <span className="text-sm font-black text-indigo-600">{enrollment.progressPercent}%</span>
                                            </div>
                                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                                    style={{ width: `${enrollment.progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="mt-8 flex justify-end">
                                        {enrollment.accessStatus === 'blocked' ? (
                                            <button
                                                onClick={() => handleActionClick(enrollment, 'unblock')}
                                                className="px-6 py-2.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100 shadow-sm"
                                            >
                                                Unblock Access
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleActionClick(enrollment, 'block')}
                                                className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm"
                                            >
                                                Block Access
                                            </button>
                                        )}
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
