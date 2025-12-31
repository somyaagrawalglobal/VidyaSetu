'use client';

import { GraduationCap } from 'lucide-react';

export default function Loader({ text = "Loading your experience...", className = "" }) {
    return (
        <div className={`fixed top-16 left-0 right-0 bottom-0 z-40 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md ${className}`}>
            <div className="relative">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 w-16 h-16 bg-indigo-500/20 rounded-full animate-ping"></div>

                {/* Spinning border outer */}
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center space-y-2">
                <p className="text-slate-900 font-bold text-[10px] uppercase tracking-[0.2em] animate-pulse">
                    {text}
                </p>
                <div className="flex gap-1 justify-center">
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1 h-1 bg-indigo-600 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
}
