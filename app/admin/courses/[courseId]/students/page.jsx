'use client';

import { useEffect, useState, use } from 'react';
import {
    Users,
    Search,
    ArrowLeft,
    MoreVertical,
    ShieldAlert,
    ShieldCheck,
    Clock,
    User as UserIcon,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ToastContext';
import Modal from '@/components/Modal';

export default function CourseStudentsPage({ params }) {
    const { courseId } = use(params);
    const [students, setStudents] = useState([]);
    const [courseTitle, setCourseTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [actionType, setActionType] = useState(''); // 'block' or 'unblock'

    useEffect(() => {
        fetchStudents();
    }, [courseId]);

    const fetchStudents = async () => {
        try {
            const res = await fetch(`/api/courses/${courseId}/students`);
            const data = await res.json();
            if (data.success) {
                setStudents(data.students);
                setCourseTitle(data.courseTitle);
            } else {
                toast.error(data.message || 'Failed to fetch students');
            }
        } catch (error) {
            toast.error('Error loading students');
        } finally {
            setLoading(false);
        }
    };

    const handleActionClick = (student, type) => {
        setSelectedStudent(student);
        setActionType(type);
        setModalOpen(true);
    };

    const confirmAction = async () => {
        if (!selectedStudent) return;

        const newStatus = actionType === 'block' ? 'blocked' : 'active';
        try {
            const res = await fetch(`/api/courses/${courseId}/students`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: selectedStudent.orderId,
                    accessStatus: newStatus
                }),
            });
            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                // Update local state
                setStudents(students.map(s =>
                    s.orderId === selectedStudent.orderId ? { ...s, accessStatus: newStatus } : s
                ));
            } else {
                toast.error(data.message || 'Action failed');
            }
        } catch (error) {
            toast.error('Error performing action');
        } finally {
            setModalOpen(false);
            setSelectedStudent(null);
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`${actionType === 'block' ? 'Block' : 'Unblock'} Student Access`}
                message={`Are you sure you want to ${actionType} access for ${selectedStudent?.name}? ${actionType === 'block' ? 'They will no longer be able to view course content.' : 'They will regain access to all course content.'}`}
                confirmText={`Yes, ${actionType === 'block' ? 'Block' : 'Unblock'}`}
                onConfirm={confirmAction}
                type={actionType === 'block' ? 'danger' : 'info'}
            />

            <div className="max-w-6xl mx-auto">
                {/* Breadcrumbs/Back */}
                <Link href="/admin/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium text-sm mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Courses
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-emerald-100/50">
                            Student Management
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">{courseTitle}</h1>
                        <p className="text-slate-500 text-sm mt-1 font-medium">Manage student access and track their learning progress.</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Enrolled</p>
                        <p className="text-2xl font-black text-slate-900">{students.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Students</p>
                        <p className="text-2xl font-black text-emerald-600">{students.filter(s => s.accessStatus !== 'blocked').length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Blocked Students</p>
                        <p className="text-2xl font-black text-red-600">{students.filter(s => s.accessStatus === 'blocked').length}</p>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Date</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                                                    <Users size={32} />
                                                </div>
                                                <p className="text-slate-500 font-medium">No students found matching your search.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((student) => (
                                        <tr key={student.orderId} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                                                        {student.profileImage ? (
                                                            <img src={student.profileImage} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <UserIcon className="text-slate-400" size={20} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 text-sm leading-none mb-1">{student.name}</p>
                                                        <p className="text-xs text-slate-400 font-medium">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                                    <Clock size={14} className="text-slate-400" />
                                                    {new Date(student.enrolledDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-48">
                                                    <div className="flex justify-between items-center mb-1.5">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Completion</span>
                                                        <span className="text-[10px] font-black text-indigo-600">{student.progressPercent}%</span>
                                                    </div>
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                                            style={{ width: `${student.progressPercent}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.accessStatus === 'blocked' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 cursor-default">
                                                        <ShieldAlert size={10} /> Blocked
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 cursor-default">
                                                        <ShieldCheck size={10} /> Active
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {student.accessStatus === 'blocked' ? (
                                                    <button
                                                        onClick={() => handleActionClick(student, 'unblock')}
                                                        className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                                                    >
                                                        Unblock
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleActionClick(student, 'block')}
                                                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-all border border-red-100"
                                                    >
                                                        Block Access
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
