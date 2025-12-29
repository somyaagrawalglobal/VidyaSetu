'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    Upload,
    Link as LinkIcon,
    X,
    CheckCircle,
    AlertCircle,
    Loader2,
    Youtube,
    RotateCcw
} from 'lucide-react';

export default function VideoUploader({ courseId, initialVideoId, onVideoReady }) {
    const [videoId, setVideoId] = useState(initialVideoId || '');
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('idle'); // idle, initializing, uploading, completed, error
    const [error, setError] = useState('');
    const [uploadMode, setUploadMode] = useState('upload'); // 'upload' or 'manual'

    const abortControllerRef = useRef(null);

    // Sync external changes
    useEffect(() => {
        if (initialVideoId && initialVideoId !== videoId) {
            setVideoId(initialVideoId);
        }
    }, [initialVideoId]);

    const handleManualChange = (e) => {
        const val = e.target.value;
        setVideoId(val);
        onVideoReady(val);
    };

    const startUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus('initializing');
        setError('');
        setIsUploading(true);
        setProgress(0);
        abortControllerRef.current = new AbortController();

        try {
            let uploadSessionId = null;
            let chunkSize = 8388608;
            let uploadedBytes = 0;

            // Check if this specific file has a pending session in this course
            const fileSignature = `yt_sig_${courseId}_${file.name}_${file.size}`;
            const savedSessionId = localStorage.getItem(fileSignature);

            if (savedSessionId) {
                // Try to resume
                const statusRes = await fetch(`/api/admin/uploads/status?sessionId=${savedSessionId}`);
                const statusData = await statusRes.json();
                if (statusData.success) {
                    uploadSessionId = savedSessionId;
                    uploadedBytes = statusData.uploadedBytes;
                    setProgress(Math.round((uploadedBytes / file.size) * 100));

                    if (statusData.status === 'completed') {
                        setVideoId(statusData.videoId);
                        onVideoReady(statusData.videoId);
                        setStatus('completed');
                        setProgress(100);
                        localStorage.removeItem(fileSignature);
                        return;
                    }
                } else {
                    localStorage.removeItem(fileSignature);
                }
            }

            if (!uploadSessionId) {
                // 1. Initialize new session
                const initRes = await fetch('/api/admin/uploads/init', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        courseId,
                        title: file.name,
                        fileSize: file.size,
                        mimeType: file.type,
                        fileName: file.name
                    })
                });

                const initData = await initRes.json();
                if (!initData.success) throw new Error(initData.message || 'Failed to initialize upload');

                uploadSessionId = initData.uploadSessionId;
                chunkSize = initData.chunkSize;

                // Store signature for resume
                localStorage.setItem(fileSignature, uploadSessionId);
            }

            // 3. Upload chunks
            setStatus('uploading');

            while (uploadedBytes < file.size) {
                if (abortControllerRef.current.signal.aborted) return;

                const start = uploadedBytes;
                const end = Math.min(uploadedBytes + chunkSize, file.size);
                const chunk = file.slice(start, end);

                const chunkRes = await fetch('/api/admin/uploads/chunk', {
                    method: 'POST',
                    headers: {
                        'Upload-Session-Id': uploadSessionId,
                        'Content-Range': `bytes ${start}-${end - 1}/${file.size}`
                    },
                    body: chunk,
                    signal: abortControllerRef.current.signal
                });

                const chunkData = await chunkRes.json();
                if (!chunkData.success) {
                    throw new Error(chunkData.message || 'Chunk upload failed');
                }

                if (chunkData.status === 'completed') {
                    setVideoId(chunkData.videoId);
                    onVideoReady(chunkData.videoId);
                    setStatus('completed');
                    setProgress(100);
                    localStorage.removeItem(fileSignature);
                    break;
                }

                uploadedBytes = chunkData.uploadedBytes;
                setProgress(Math.round((uploadedBytes / file.size) * 100));
            }

        } catch (err) {
            if (err.name === 'AbortError') return;
            console.error('Upload Error:', err);
            setError(err.message || 'An unexpected error occurred during upload');
            setStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    const cancelUpload = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsUploading(false);
        setStatus('idle');
        setProgress(0);
    };

    const reset = () => {
        setVideoId('');
        onVideoReady('');
        setStatus('idle');
        setProgress(0);
        setError('');
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Toggle Modes */}
            <div className="flex bg-slate-50 border-b border-slate-100">
                <button
                    onClick={() => setUploadMode('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all ${uploadMode === 'upload' ? 'bg-white text-indigo-600 border-r border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Upload size={14} /> Upload Video
                </button>
                <button
                    onClick={() => setUploadMode('manual')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider transition-all ${uploadMode === 'manual' ? 'bg-white text-indigo-600 border-l border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <LinkIcon size={14} /> YouTube ID
                </button>
            </div>

            <div className="p-6">
                {uploadMode === 'upload' ? (
                    <div className="space-y-4">
                        {status === 'idle' && (
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all cursor-pointer group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-700">Click to upload video</p>
                                    <p className="text-xs text-slate-400 mt-1">MP4, MOV up to 2GB</p>
                                </div>
                                <input type="file" className="hidden" accept="video/*" onChange={startUpload} />
                            </label>
                        )}

                        {(status === 'initializing' || status === 'uploading') && (
                            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-2">
                                        {status === 'initializing' ? (
                                            <Loader2 className="animate-spin text-indigo-600" size={16} />
                                        ) : (
                                            <Upload className="text-indigo-600" size={16} />
                                        )}
                                        <span className="text-xs font-black text-indigo-900 uppercase">
                                            {status === 'initializing' ? 'Connecting to YouTube...' : 'Uploading to YouTube...'}
                                        </span>
                                    </div>
                                    <button onClick={cancelUpload} className="text-slate-400 hover:text-red-600 transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{progress}% Complete</span>
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Resumable Session Active</span>
                                </div>
                            </div>
                        )}

                        {status === 'completed' && (
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <Youtube className="text-red-600" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-emerald-900 leading-none mb-1">Upload Successful!</p>
                                        <p className="text-xs text-emerald-600 font-medium tracking-tight">ID: {videoId}</p>
                                    </div>
                                </div>
                                <button onClick={reset} className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <AlertCircle className="text-red-600" size={20} />
                                    <p className="text-sm font-bold text-red-900">Upload failed</p>
                                </div>
                                <p className="text-xs text-red-600 mb-4">{error}</p>
                                <div className="flex gap-2">
                                    <button onClick={reset} className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all">
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Youtube className="h-4 w-4 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Paste YouTube Video ID (e.g. dQw4w9WgXcQ)"
                                className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white outline-none transition-all font-medium"
                                value={videoId}
                                onChange={handleManualChange}
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium px-1">
                            Use this for existing videos. Example: https://youtube.com/watch?v=<b>videoId</b>
                        </p>
                    </div>
                )}
            </div>

            {videoId && status !== 'uploading' && (
                <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center gap-2">
                    <CheckCircle className="text-emerald-500" size={14} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Video Linked: {videoId}</span>
                </div>
            )}
        </div>
    );
}
