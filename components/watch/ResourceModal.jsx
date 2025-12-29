'use client';

import { X, Maximize2, FileText } from 'lucide-react';
import { useEffect } from 'react';

export default function ResourceModal({ isOpen, onClose, resource }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Security: Disable right-click and copy for PDFs
            const handleContextMenu = (e) => e.preventDefault();
            const handleKeyDown = (e) => {
                if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's' || e.key === 'u')) {
                    e.preventDefault();
                }
            };
            if (isOpen) {
                document.addEventListener('contextmenu', handleContextMenu);
                document.addEventListener('keydown', handleKeyDown);
            }
            return () => {
                document.removeEventListener('contextmenu', handleContextMenu);
                document.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen || !resource) return null;

    const url = resource.url;
    const lowerUrl = url.toLowerCase();
    const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(lowerUrl);
    const isPdf = lowerUrl.endsWith('.pdf');
    const isDoc = /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(lowerUrl);
    const isLocal = url.startsWith('/') || url.includes('localhost') || url.includes('127.0.0.1');

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-2 sm:p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-[95vw] bg-white shadow-2xl flex flex-col h-[95vh] overflow-hidden rounded-lg animate-in zoom-in-95 duration-200 ease-out">
                {/* Minimal Header */}
                <div className="px-5 py-2.5 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center text-white">
                            <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-xs leading-none">{resource.title}</h3>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-all"
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Viewer Content */}
                <div className="flex-1 bg-slate-50 overflow-auto flex items-center justify-center select-none">
                    {(() => {
                        if (isImage) {
                            return (
                                <div className="w-full h-full flex items-center justify-center p-4">
                                    <img
                                        src={url}
                                        alt={resource.title}
                                        className="max-w-full max-h-full object-contain shadow-lg rounded-lg bg-white"
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                </div>
                            );
                        }

                        if (isPdf) {
                            return (
                                <div className="w-full h-full bg-slate-200">
                                    <iframe
                                        src={`${url}#toolbar=0&navpanes=0`}
                                        className="w-full h-full border-none"
                                        title={resource.title}
                                    />
                                </div>
                            );
                        }

                        if (isDoc && !isLocal) {
                            const encodedUrl = encodeURIComponent(new URL(url, window.location.origin).href);
                            return (
                                <iframe
                                    src={`https://docs.google.com/gview?url=${encodedUrl}&embedded=true`}
                                    className="w-full h-full border-none"
                                    title={resource.title}
                                />
                            );
                        }

                        return (
                            <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-xl shadow-sm max-w-sm border border-slate-100">
                                <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center text-slate-200 mb-5">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <h4 className="text-base font-bold text-slate-900">Secure Preview Only</h4>
                                <p className="text-slate-500 mt-2 text-xs leading-relaxed">
                                    This format ({url.split('.').pop().toUpperCase()}) can only be viewed here.
                                </p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
