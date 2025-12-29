'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FileText, ChevronLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ResourceViewer() {
    const { filename } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const resourceUrl = `/api/courses/resources/${filename}`;
    const ext = filename.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);
    const isPdf = ext === 'pdf';
    const isDoc = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext);

    useEffect(() => {
        // Disable right click and shortcuts
        const handleContextMenu = (e) => e.preventDefault();
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
                e.preventDefault();
            }
        };
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-16">
            {/* Branded Resource Header */}
            <div className="bg-white border-b border-slate-100 px-4 py-3 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white shadow-sm">
                            <FileText className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-xs font-bold text-slate-800 leading-none truncate max-w-[200px] sm:max-w-md">
                                {filename}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                                    Secured Resource Viewer
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded transition-all"
                        >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            BACK
                        </button>
                        <Link
                            href="/dashboard"
                            className="text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded shadow-sm transition-all text-center"
                        >
                            DASHBOARD
                        </Link>
                    </div>
                </div>
            </div>

            {/* Viewer Content */}
            <div className="flex-1 overflow-hidden flex flex-col p-3 sm:p-4">
                <div className="flex-1 bg-white border border-slate-100 rounded-lg overflow-hidden shadow-lg flex items-center justify-center relative">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                        </div>
                    )}

                    {(() => {
                        if (isImage) {
                            return (
                                <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50">
                                    <img
                                        src={resourceUrl}
                                        alt={filename}
                                        className="max-w-full max-h-full object-contain shadow-lg rounded-sm"
                                        onLoad={() => setIsLoading(false)}
                                    />
                                </div>
                            );
                        }

                        if (isPdf) {
                            return (
                                <iframe
                                    src={`${resourceUrl}#toolbar=0&navpanes=0`}
                                    className="w-full h-full border-none"
                                    onLoad={() => setIsLoading(false)}
                                    title={filename}
                                />
                            );
                        }

                        if (isDoc) {
                            // Using Google Docs Viewer for docs
                            const encodedUrl = encodeURIComponent(new URL(resourceUrl, window.location.origin).href);
                            return (
                                <iframe
                                    src={`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`}
                                    className="w-full h-full border-none"
                                    onLoad={() => setIsLoading(false)}
                                    title={filename}
                                />
                            );
                        }

                        return (
                            <div className="text-center p-12">
                                <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-slate-800">Preview Not Available</h2>
                                <p className="text-slate-500 mt-2 text-sm">
                                    This file format cannot be previewed in the browser.
                                </p>
                            </div>
                        );
                    })()}
                </div>

                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em] font-medium select-none">
                    Security Protected • VidyaSetu Learning Platform
                </p>
            </div>
        </div>
    );
}
