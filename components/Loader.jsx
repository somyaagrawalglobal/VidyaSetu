'use client';

import { GraduationCap } from 'lucide-react';

export default function Loader({ text = "Loading your experience..." }) {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 w-24 h-24 bg-indigo-500/20 rounded-full animate-ping"></div>

                {/* Spinning border outer */}
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-200 animate-bounce">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center space-y-2">
                <p className="text-slate-900 font-black text-sm uppercase tracking-[0.2em] animate-pulse">
                    {text}
                </p>
                <div className="flex gap-1 justify-center">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
