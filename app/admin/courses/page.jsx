'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    MoreVertical,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    LayoutGrid,
    List,
    Users,
    CheckCircle,
    XCircle,
    Clock,
    Bell,
    Send,
    Loader2,
    ChevronLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import { useToast } from '@/components/ToastContext';

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [notifyingCourseId, setNotifyingCourseId] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const toast = useToast();
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
        onConfirm: null,
        showCancel: false,
        confirmText: 'Confirm',
        rejectionReason: ''
    });
    const router = useRouter();

    const openModal = (config) => setModalConfig({ ...config, isOpen: true });
    const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

    useEffect(() => {
        fetchCourses();
        fetchUser();
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

    const handleUpdateStatus = async (courseId, status, rejectionReason = null) => {
        if (status === 'rejected' && !rejectionReason) {
            openModal({
                title: 'Reject Course',
                message: 'Please provide a reason for rejection:',
                type: 'danger',
                confirmText: 'Reject Course',
                showCancel: true,
                onConfirm: (reason) => handleUpdateStatus(courseId, 'rejected', reason),
                isInput: true // Custom addition to modal if needed, or just use prompt for now
            });
            // Since our Modal component doesn't support custom inputs easily yet, 
            // I'll use a prompt but wrap it in the modal config for consistency if I update Modal later.
            // For now, let's just use a prompt if status is rejected and no reason.
            const reason = prompt('Enter rejection reason:');
            if (reason === null) return; // Cancelled
            if (!reason.trim()) {
                toast.error('Reason is required');
                return;
            }
            rejectionReason = reason;
        }

        try {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ approvalStatus: status, rejectionReason }),
            });
            const data = await res.json();
            if (data.success) {
                setCourses(courses.map(c => c._id === courseId ? { ...c, approvalStatus: status, rejectionReason } : c));
                toast.success(`Course ${status} successfully!`);
            } else {
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating course status');
        }
    };

    const handleNotifyAdmin = async (courseId) => {
        setNotifyingCourseId(courseId);
        try {
            const res = await fetch(`/api/courses/${courseId}/notify-admin`, {
                method: 'POST'
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Failed to notify admin');
            }
        } catch (error) {
            console.error('Error notifying admin:', error);
            toast.error('Error notifying administrator');
        } finally {
            setNotifyingCourseId(null);
        }
    };

    const fetchCourses = async () => {
        try {
            const res = await fetch('/api/courses?published=false'); // Fetch all
            const data = await res.json();
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id) => {
        if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;

        try {
            const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setCourses(courses.filter(c => c._id !== id));
                toast.success('Course deleted successfully');
            } else {
                toast.error(data.message || 'Failed to delete');
            }
        } catch (error) {
            toast.error('Error deleting course');
        }
    };

    const togglePublish = async (course) => {
        const newStatus = !course.published;
        try {
            const res = await fetch(`/api/courses/${course._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ published: newStatus }),
            });
            const data = await res.json();

            if (data.success) {
                // Update local state
                setCourses(courses.map(c =>
                    c._id === course._id ? { ...c, published: newStatus } : c
                ));
                toast.success(newStatus ? 'Course published successfully' : 'Course moved to draft');
            } else {
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTab = activeTab === 'all' ||
            (activeTab === 'pending' && course.approvalStatus === 'pending') ||
            (activeTab === 'approved' && course.approvalStatus === 'approved') ||
            (activeTab === 'rejected' && course.approvalStatus === 'rejected') ||
            (activeTab === 'pending' && !course.approvalStatus); // handle newly created without status

        return matchesSearch && matchesTab;
    });

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 pt-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">


                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Course Management</h1>
                            <p className="text-slate-500 mt-1">Content Inventory & Quality Control</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/courses/add"
                        className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 transition-all active:scale-95"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Course
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                    {/* Status Tabs */}
                    <div className="flex p-1 bg-gray-200/50 rounded-xl w-full lg:w-fit overflow-x-auto no-scrollbar font-bold text-xs">
                        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all whitespace-nowrap uppercase tracking-widest ${activeTab === tab
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                                {tab !== 'all' && (
                                    <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === tab ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        {courses.filter(c => tab === 'pending' ? (c.approvalStatus === 'pending' || !c.approvalStatus) : c.approvalStatus === tab).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                        <div className="relative w-full sm:max-w-xs">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Filter results..."
                                className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-sm transition-all shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Course List Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Course Details
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Instructor
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Modules
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Approval
                                    </th>
                                    <th scope="col" className="relative px-6 py-4">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {filteredCourses.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-12 w-12 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-200">
                                                    {course.thumbnail ? (
                                                        <img className="h-full w-full object-cover" src={course.thumbnail} alt="" />
                                                    ) : (
                                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                                            <LayoutGrid className="h-6 w-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900 line-clamp-1 max-w-[200px]" title={course.title}>{course.title}</div>
                                                    <div className="text-xs text-indigo-500 font-medium">{course.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-gray-900">₹{course.price.toLocaleString('en-IN')}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-medium ${course.instructor?._id === currentUser?._id ? 'text-indigo-600' : 'text-gray-900'}`}>
                                                    {course.instructor?._id === currentUser?._id
                                                        ? 'Me'
                                                        : course.instructor
                                                            ? `${course.instructor.firstName} ${course.instructor.lastName}`
                                                            : 'Unknown'}
                                                </span>
                                                {course.instructor?._id !== currentUser?._id && (
                                                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Instructor</span>
                                                )}
                                                {course.instructor?._id === currentUser?._id && (
                                                    <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-tighter italic font-black">Creator</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => togglePublish(course)}
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${course.published
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    }`}
                                            >
                                                {course.published ? (
                                                    <>
                                                        <Eye className="w-3 h-3 mr-1" /> Published
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="w-3 h-3 mr-1" /> Draft
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {course.modules?.length || 0} Modules
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(course.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-2">
                                                <div className={`inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${course.approvalStatus === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                    course.approvalStatus === 'rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                        'bg-amber-50 text-amber-700 border border-amber-100'
                                                    }`}>
                                                    {course.approvalStatus === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                                                    {course.approvalStatus === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                                                    {course.approvalStatus === 'pending' || !course.approvalStatus ? <Clock className="w-3 h-3 mr-1" /> : null}
                                                    {course.approvalStatus || 'pending'}
                                                </div>

                                                {course.approvalStatus === 'rejected' && course.rejectionReason && (
                                                    <div className="text-[9px] text-red-500 italic max-w-[150px] line-clamp-2" title={course.rejectionReason}>
                                                        Reason: {course.rejectionReason}
                                                    </div>
                                                )}

                                                {/* Actions removed to enforce review on detail page */}

                                                {(course.approvalStatus === 'pending' || !course.approvalStatus) && currentUser?.roles.includes('Instructor') && course.instructor?._id === currentUser?._id && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleNotifyAdmin(course._id);
                                                        }}
                                                        disabled={notifyingCourseId === course._id}
                                                        className="group flex items-center gap-1.5 px-2 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-md text-[9px] font-black uppercase tracking-tighter transition-all duration-300 border border-indigo-100/50 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="Notify admin to review your course"
                                                    >
                                                        {notifyingCourseId === course._id ? (
                                                            <Loader2 className="w-2.5 h-2.5 animate-spin" />
                                                        ) : (
                                                            <Send className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                        )}
                                                        {notifyingCourseId === course._id ? 'Sending...' : 'Nudge Review'}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/admin/courses/${course._id}/students`}
                                                    className="text-emerald-600 hover:text-emerald-900 bg-emerald-50 p-2 rounded-lg hover:bg-emerald-100 transition-colors"
                                                    title="Manage Students"
                                                >
                                                    <Users className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/courses/edit/${course._id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100 transition-colors"
                                                    title="Edit Course"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => deleteCourse(course._id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <List className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
                            <div className="mt-6">
                                <Link
                                    href="/admin/courses/add"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    New Course
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                message={modalConfig.message}
                type={modalConfig.type}
                onConfirm={modalConfig.onConfirm}
                confirmText={modalConfig.confirmText}
                showCancel={modalConfig.showCancel}
            />
        </div>
    );
}
