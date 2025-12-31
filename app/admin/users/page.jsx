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
    BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastContext';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';

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
                    roles: editModal.user.roles
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
                            <p className="text-slate-500 mt-1 font-medium text-xs uppercase tracking-widest">Access Control & Members</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-sm border border-indigo-100">
                            Total: {users.length}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:max-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find user by name or email..."
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
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
                        </div>
                        <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setEditModal({ isOpen: false, user: null })}
                                className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveUserEdit}
                                disabled={isUpdating}
                                className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2"
                            >
                                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
