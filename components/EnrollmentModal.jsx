'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, CreditCard, Tag, ArrowRight, User, Mail, Phone, Lock } from 'lucide-react';
import Image from 'next/image';

export default function EnrollmentModal({ isOpen, onClose, course, onEnrollSuccess }) {
    const [step, setStep] = useState(1); // 1: Details, 2: Checkout/Summary
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
    });
    const [couponCode, setCouponCode] = useState('');
    const [couponData, setCouponData] = useState(null);
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [couponError, setCouponError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(true);

    useEffect(() => {
        if (isOpen) {
            fetchUserData();
        }
    }, [isOpen]);

    const fetchUserData = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) {
                setFormData({
                    firstName: data.user.firstName || '',
                    lastName: data.user.lastName || '',
                    email: data.user.email || '',
                    mobileNumber: data.user.mobileNumber || '',
                });
            }
        } catch (error) {
            console.error('Failed to fetch user data');
        } finally {
            setFetchingUser(false);
        }
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setIsValidatingCoupon(true);
        setCouponError('');
        try {
            const res = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: couponCode, amount: course.price }),
            });
            const data = await res.json();
            if (data.success) {
                setCouponData(data);
            } else {
                setCouponError(data.message);
                setCouponData(null);
            }
        } catch (error) {
            setCouponError('Error validating coupon');
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handleProceed = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: course._id,
                    couponCode: couponData?.code,
                    userDetails: formData,
                }),
            });
            const data = await res.json();

            if (data.success) {
                if (data.isFree) {
                    onEnrollSuccess();
                    onClose();
                    setLoading(false);
                } else {
                    // Trigger Razorpay
                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: data.order.amount,
                        currency: data.order.currency,
                        name: "VidyaSetu",
                        description: `Purchase ${course.title}`,
                        order_id: data.order.id,
                        image: `${window.location.origin}/assets/images/brand-logo.png`,
                        handler: async function (response) {
                            try {
                                const verifyRes = await fetch('/api/payments/verify', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        razorpay_order_id: response.razorpay_order_id,
                                        razorpay_payment_id: response.razorpay_payment_id,
                                        razorpay_signature: response.razorpay_signature,
                                    }),
                                });
                                const verifyData = await verifyRes.json();
                                if (verifyData.success) {
                                    onEnrollSuccess();
                                    onClose();
                                } else {
                                    alert('Payment verification failed');
                                    setLoading(false);
                                }
                            } catch (err) {
                                console.error(err);
                                alert('Payment verification error');
                                setLoading(false);
                            }
                        },
                        modal: {
                            ondismiss: function () {
                                setLoading(false);
                            }
                        },
                        prefill: {
                            name: `${formData.firstName} ${formData.lastName}`,
                            email: formData.email,
                            contact: formData.mobileNumber,
                        },
                        theme: { color: "#4F46E5" },
                    };
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                }
            } else {
                alert(data.message || 'Error creating order');
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to process enrollment');
            setLoading(false);
        }
        // Note: We do NOT set loading(false) in finally block because we want it to stay true 
        // while Razorpay modal is open. It's handled in ondismiss and handler.
    };

    if (!isOpen) return null;

    const finalAmount = couponData ? couponData.finalAmount : course.price;
    const discountAmount = couponData ? couponData.discount : 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[700px]">
                {/* Left Side: Course Summary (Desktop Only) */}
                <div className="hidden md:flex w-72 bg-slate-50 border-r border-slate-100 p-8 flex-col">
                    <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
                        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">{course.title}</h3>
                    <p className="text-slate-500 text-xs mb-8">Professional Certification Program</p>

                    <div className="mt-auto space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Course Price</span>
                            <span className="text-slate-800 font-bold">₹{course.price.toLocaleString()}</span>
                        </div>
                        {discountAmount > 0 && (
                            <div className="flex justify-between text-sm text-emerald-600">
                                <span>Discount</span>
                                <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="pt-4 border-t border-slate-200 flex justify-between">
                            <span className="font-bold text-slate-900">Total</span>
                            <span className="font-black text-indigo-600 text-xl">₹{finalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Content */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>

                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-3 border border-indigo-100/50">
                            Checkout
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Confirm Details</h2>
                        <p className="text-slate-500 text-sm mt-1">Please verify your information for certificate issuance.</p>
                    </div>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                                        placeholder="John"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="tel"
                                    value={formData.mobileNumber}
                                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        {/* Coupon Section */}
                        <div className="pt-4 border-t border-slate-100 mt-6">
                            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1 mb-2 block">Apply Coupon</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500" />
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all font-bold tracking-widest text-slate-800"
                                        placeholder="PROMO20"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode || isValidatingCoupon}
                                    className="px-6 py-3 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-900 transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isValidatingCoupon ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                                </button>
                            </div>
                            {couponError && <p className="text-red-500 text-[10px] mt-2 font-bold ml-1 uppercase tracking-tight">{couponError}</p>}
                            {couponData && <p className="text-emerald-600 text-[10px] mt-2 font-bold ml-1 uppercase tracking-tight flex items-center gap-1"><CheckCircle size={10} /> Coupon Applied: ₹{discountAmount} saved!</p>}
                        </div>

                        <button
                            onClick={handleProceed}
                            disabled={loading || fetchingUser}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    {finalAmount === 0 ? 'Enroll Now' : `Pay ₹${finalAmount.toLocaleString()}`}
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] text-slate-400 font-medium">
                            Secure payment processed via <span className="font-bold">Razorpay</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
