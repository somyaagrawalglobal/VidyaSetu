'use client';

import { useEffect, useState } from 'react';
import {
    Users,
    Search,
    Shield,
    UserX,
    UserCheck,
    MoreVertical,
    Mail,
    Phone,
    Calendar,
    ChevronLeft,
    Loader2,
    Edit2,
    Trash2,
    UserPlus,
    X,
    Check,
    BookOpen,
    ExternalLink,
    Briefcase,
    Building2,
    FileText,
    CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastContext';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';

const FileInputField = ({ id, label, icon: Icon, value, loading, onChange, colorClass = "indigo" }) => (
    <div className="space-y-2">
        <label htmlFor={id} className="text-[10px] font-bold text-slate-500 uppercase ml-1 block tracking-widest">{label}</label>
        <div className="relative group">
            <input
                id={id}
                type="file"
                className="hidden"
                onChange={onChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            <label
                htmlFor={id}
                className={`relative flex flex-col items-center justify-center w-full p-4 bg-white border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group-hover:bg-slate-50 ${value ? `border-${colorClass}-200 bg-${colorClass}-50/30` : 'border-slate-200'}`}
            >
                <div className={`mb-2 p-2 rounded-xl bg-${colorClass}-50 text-${colorClass}-500 transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon size={20} />}
                </div>
                <div className="text-center">
                    <p className={`text-[11px] font-bold truncate max-w-[160px] ${value ? `text-${colorClass}-700` : 'text-slate-600'}`}>
                        {value ? value.split('/').pop() : 'Tap to Upload'}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium">PDF, JPG, PNG (Max 5MB)</p>
                </div>

                {value && (
                    <div className={`absolute top-2 right-2 p-1 bg-emerald-100 text-emerald-600 rounded-lg shadow-sm animate-in fade-in zoom-in`}>
                        <Check size={12} strokeWidth={4} />
                    </div>
                )}
            </label>
        </div>
    </div>
);

export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();
    const router = useRouter();

    // Modal States
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
    const [editModal, setEditModal] = useState({ isOpen: false, user: null });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleStatus = (user) => {
        const action = user.isActive ? 'deactivate' : 'activate';
        setConfirmModal({
            isOpen: true,
            type: user.isActive ? 'danger' : 'success',
            title: `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
            message: `Are you sure you want to ${action} ${user.firstName}?`,
            onConfirm: () => toggleStatus(user)
        });
    };

    const toggleStatus = async (user) => {
        const newStatus = !user.isActive;
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, isActive: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.map(u => u._id === user._id ? { ...u, isActive: newStatus } : u));
                toast.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error updating user status');
        }
    };

    const handleDeleteUser = (user) => {
        setConfirmModal({
            isOpen: true,
            type: 'danger',
            title: 'Delete User',
            message: `Are you sure you want to delete ${user.firstName}? This will be a soft delete.`,
            onConfirm: () => deleteUser(user._id)
        });
    };

    const deleteUser = async (userId) => {
        try {
            const res = await fetch(`/api/admin/users?userId=${userId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setUsers(users.filter(u => u._id !== userId));
                toast.success('User deleted successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Error deleting user');
        }
    };

    const handleEditUser = (user) => {
        setEditModal({ isOpen: true, user: { ...user } });
    };

    const saveUserEdit = async () => {
        setIsUpdating(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: editModal.user._id,
                    firstName: editModal.user.firstName,
                    lastName: editModal.user.lastName,
                    email: editModal.user.email,
                    mobileNumber: editModal.user.mobileNumber,
                    roles: editModal.user.roles,
                    experience: editModal.user.experience,
                    currentRole: editModal.user.currentRole,
                    companyName: editModal.user.companyName,
                    resume: editModal.user.resume,
                    verificationId: editModal.user.verificationId
                }),
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.map(u => u._id === data.user._id ? data.user : u));
                setEditModal({ isOpen: false, user: null });
                toast.success('User updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to update user');
        } finally {
            setIsUpdating(false);
        }
    };

    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingVerif, setUploadingVerif] = useState(false);

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'resume') setUploadingResume(true);
        else setUploadingVerif(true);

        const formDataFile = new FormData();
        formDataFile.append('file', file);
        formDataFile.append('type', type === 'resume' ? 'resume' : 'verificationId');

        // Use current URL for cleanup
        const currentUrl = type === 'resume' ? editModal.user.resume : editModal.user.verificationId;
        if (currentUrl) {
            formDataFile.append('previousUrl', currentUrl);
        }

        try {
            const res = await fetch('/api/auth/upload-verification', {
                method: 'POST',
                body: formDataFile,
            });

            const data = await res.json();
            if (data.success) {
                setEditModal(prev => ({
                    ...prev,
                    user: { ...prev.user, [type === 'resume' ? 'resume' : 'verificationId']: data.url }
                }));
                toast.success('Document uploaded successfully');
            } else {
                toast.error(data.message || 'Upload failed');
            }
        } catch (error) {
            toast.error('File upload error');
        } finally {
            if (type === 'resume') setUploadingResume(false);
            else setUploadingVerif(false);
        }
    };

    const toggleRole = (role) => {
        const roles = editModal.user.roles.includes(role)
            ? editModal.user.roles.filter(r => r !== role)
            : [...editModal.user.roles, role];
        setEditModal({ ...editModal, user: { ...editModal.user, roles } });
    };

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader text="Synchronizing user data..." />;

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="relative overflow-hidden bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-md">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="relative flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 transition-all duration-300 shadow-sm group active:scale-90"
                                >
                                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                                </Link>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-wider rounded-md shadow-md shadow-indigo-100">
                                            <Shield size={10} strokeWidth={3} /> Admin
                                        </div>
                                        <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{users.length} Records</span>
                                    </div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                        User <span className="text-indigo-600">Inventory</span>
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="group flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                                    <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Users size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total</p>
                                        <p className="text-lg font-bold text-slate-900 leading-none">{users.length}</p>
                                    </div>
                                </div>

                                <div className="hidden sm:flex group items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:bg-white hover:border-slate-200 hover:shadow-sm">
                                    <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                                        <Shield size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Instructors</p>
                                        <p className="text-lg font-bold text-slate-900 leading-none">{users.filter(u => u.roles.includes('Instructor')).length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-grow group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name, email or mobile..."
                                    className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-sm font-medium transition-all shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute inset-y-0 right-4 flex items-center text-slate-300 hover:text-slate-500"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <button className="sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200 hover:shadow-indigo-100">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>


                {/* Users Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Roles</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                                                    {user.firstName[0]}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                    <Mail className="w-3 h-3" /> {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                    <Phone className="w-3 h-3" /> {user.mobileNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map(role => (
                                                    <span key={role} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${role === 'Admin' ? 'bg-amber-100 text-amber-700' :
                                                        role === 'Instructor' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-indigo-100 text-indigo-700'
                                                        }`}>
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleToggleStatus(user)}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${user.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {user.isActive ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                                                {user.isActive ? 'Active' : 'Banned'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(user.createdOn).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                {user.roles.includes('Student') && (
                                                    <Link
                                                        href={`/admin/users/${user._id}/enrollments`}
                                                        className="p-2 text-slate-400 hover:text-emerald-600 transition-colors bg-slate-50 border border-slate-200 rounded-lg"
                                                        title="View Enrollments"
                                                    >
                                                        <BookOpen className="w-4 h-4" />
                                                    </Link>
                                                )}
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 border border-slate-200 rounded-lg"
                                                    title="Edit User"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user)}
                                                    className="p-2 text-slate-400 hover:text-red-600 transition-colors bg-slate-50 border border-slate-200 rounded-lg"
                                                    title="Delete User"
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
                </div>
            </div>

            {/* Confirmation Modal */}
            <Modal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText="Yes, Proceed"
                onConfirm={confirmModal.onConfirm}
            />

            {/* Edit User Modal */}
            {editModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-500 border border-white/20">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Edit User Details</h3>
                            <button onClick={() => setEditModal({ isOpen: false, user: null })} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                        value={editModal.user.firstName}
                                        onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, firstName: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                        value={editModal.user.lastName}
                                        onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, lastName: e.target.value } })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={editModal.user.email}
                                    onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, email: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mobile Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium"
                                    value={editModal.user.mobileNumber}
                                    onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, mobileNumber: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1 block">Manage Roles</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Student', 'Instructor', 'Admin'].map(role => (
                                        <button
                                            key={role}
                                            onClick={() => toggleRole(role)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${editModal.user.roles.includes(role)
                                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-200'
                                                }`}
                                        >
                                            {editModal.user.roles.includes(role) ? <Check className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {editModal.user.roles.includes('Instructor') && (
                                <div className="pt-8 border-t border-slate-100 space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"></div>
                                                Instructor Verification
                                            </h4>
                                            <p className="text-[10px] text-slate-400 font-bold ml-3.5 uppercase tracking-tighter">Professional & Academic Validation</p>
                                        </div>
                                        <span className="self-start sm:self-center px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-full border border-indigo-100 animate-pulse">Verification Active</span>
                                    </div>

                                    <div className="p-6 sm:p-8 rounded-[2rem] bg-slate-50 border border-slate-200 shadow-inner space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block tracking-widest">Experience (Years)</label>
                                                <div className="relative group">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300" />
                                                    <input
                                                        type="text"
                                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-800 shadow-sm"
                                                        value={editModal.user.experience || ''}
                                                        placeholder="e.g. 5+ Years"
                                                        onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, experience: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block tracking-widest">Job Designation</label>
                                                <div className="relative group">
                                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300" />
                                                    <input
                                                        type="text"
                                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-800 shadow-sm"
                                                        value={editModal.user.currentRole || ''}
                                                        placeholder="e.g. Senior Architect"
                                                        onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, currentRole: e.target.value } })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 block tracking-widest">Current Affiliation</label>
                                            <div className="relative group">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-all duration-300" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold text-slate-800 shadow-sm"
                                                    value={editModal.user.companyName || ''}
                                                    placeholder="University or Corporate name"
                                                    onChange={(e) => setEditModal({ ...editModal, user: { ...editModal.user, companyName: e.target.value } })}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                            <div className="space-y-3 group/item">
                                                <FileInputField
                                                    id="admin-resume-upload"
                                                    label="Academic Resume"
                                                    icon={FileText}
                                                    colorClass="indigo"
                                                    value={editModal.user.resume}
                                                    loading={uploadingResume}
                                                    onChange={(e) => handleFileUpload(e, 'resume')}
                                                />
                                                {editModal.user.resume && (
                                                    <a
                                                        href={editModal.user.resume}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
                                                    >
                                                        Review Resume <ExternalLink size={10} strokeWidth={4} />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="space-y-3 group/item">
                                                <FileInputField
                                                    id="admin-id-upload"
                                                    label="Identity Document"
                                                    icon={CreditCard}
                                                    colorClass="emerald"
                                                    value={editModal.user.verificationId}
                                                    loading={uploadingVerif}
                                                    onChange={(e) => handleFileUpload(e, 'verification')}
                                                />
                                                {editModal.user.verificationId && (
                                                    <a
                                                        href={editModal.user.verificationId}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-center gap-2 w-full py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                                                    >
                                                        Review ID Proof <ExternalLink size={10} strokeWidth={4} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 sm:p-8 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4">
                            <button
                                onClick={() => setEditModal({ isOpen: false, user: null })}
                                className="w-full sm:w-auto px-8 py-3.5 text-xs font-black text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveUserEdit}
                                disabled={isUpdating}
                                className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest group"
                            >
                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                                    <>
                                        Update Details
                                        <Check className="w-4 h-4 group-hover:scale-125 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
