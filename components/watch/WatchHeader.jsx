'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Trophy, Menu, X } from 'lucide-react';

export default function WatchHeader({ courseTitle, slug, progress, onMenuToggle, isPreview = false, onBack = null }) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <button
                    onClick={onMenuToggle}
                    className="p-2 lg:hidden hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors flex-shrink-0"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors flex-shrink-0"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-slate-800 flex-shrink-0" />
                <h1 className="text-slate-100 font-semibold truncate text-sm sm:text-base flex items-center gap-2">
                    <span className="truncate">{courseTitle}</span>
                    {isPreview && <span className="flex-shrink-0 px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-[0.15em] rounded-full border border-indigo-500/30 animate-pulse">Preview Mode</span>}
                </h1>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0 ml-4">
                {!isPreview && (
                    <>
                        <div className="hidden sm:flex flex-col items-end">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Your Progress</span>
                                <span className="text-[10px] font-bold text-indigo-400">{progress}%</span>
                            </div>
                            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-500 transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-lg shadow-indigo-900/20 active:scale-95">
                            <Trophy className="w-4 h-4" />
                            <span className="hidden xs:inline">Claim Certificate</span>
                        </button>
                    </>
                )}
                {isPreview && (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all border border-slate-700 hover:border-red-500 active:scale-95 shadow-lg group"
                    >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="hidden xs:inline">Exit Preview</span>
                    </button>
                )}
            </div>
        </header>
    );
}
