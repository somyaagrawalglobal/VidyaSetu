'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found.');
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/auth/verify-email?token=${token}`);
                const data = await res.json();

                if (res.ok) {
                    setStatus('success');
                    setMessage(data.message);
                } else {
                    setStatus('error');
                    setMessage(data.message);
                }
            } catch (err) {
                setStatus('error');
                setMessage('Something went wrong. Please try again.');
            }
        };

        verify();
    }, [token]);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center">

                {status === 'verifying' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">Verifying...</h2>
                        <p className="text-slate-500 mt-2">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">Verified!</h2>
                        <p className="text-slate-500 mt-2 mb-6">{message}</p>
                        <Link
                            href="/login"
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Go to Login
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-800">Verification Failed</h2>
                        <p className="text-slate-500 mt-2 mb-6">{message}</p>
                        <Link
                            href="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}
