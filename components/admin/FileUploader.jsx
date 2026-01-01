'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2, FileText, Image as ImageIcon } from 'lucide-react';

/**
 * FileUploader Component
 * @param {string} type - 'thumbnail' or 'resource'
 * @param {string} initialUrl - Existing URL if editing
 * @param {function} onUploadSuccess - Callback with the new URL
 * @param {string} accept - File types to accept
 */
export default function FileUploader({ type, initialUrl, onUploadSuccess, accept }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(initialUrl || '');
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setError('');

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview('');
        }

        // Auto-start upload
        uploadFile(selectedFile);
    };

    const uploadFile = async (fileToUpload) => {
        setStatus('uploading');
        setProgress(10); // Start progress

        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('type', type);

        // If we have an existing server URL, pass it to delete the old file
        if (preview && (preview.startsWith('/uploads/') || preview.includes('blob.vercel-storage.com'))) {
            formData.append('previousUrl', preview);
        }

        try {
            // Using XMLHttpRequest for progress tracking
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    setProgress(percent);
                }
            });

            const promise = new Promise((resolve, reject) => {
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(JSON.parse(xhr.responseText).message || 'Upload failed'));
                    }
                };
                xhr.onerror = () => reject(new Error('Network error'));
            });

            xhr.open('POST', '/api/admin/upload-file');
            xhr.send(formData);

            const data = await promise;

            setStatus('success');
            setPreview(data.url);
            onUploadSuccess(data.url);
        } catch (err) {
            console.error('Upload Error:', err);
            setError(err.message || 'Failed to upload file');
            setStatus('error');
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(initialUrl || '');
        setStatus('idle');
        setProgress(0);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const isImage = type === 'thumbnail' || (file && file.type.startsWith('image/'));

    return (
        <div className="w-full">
            <div
                className={`relative group border-2 border-dashed rounded-2xl transition-all duration-300 overflow-hidden
                    ${status === 'uploading' ? 'border-indigo-400 bg-indigo-50/30' :
                        status === 'success' ? 'border-emerald-400 bg-emerald-50/30' :
                            status === 'error' ? 'border-red-400 bg-red-50/30' :
                                'border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-slate-50'}`}
            >
                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept={accept || (type === 'thumbnail' ? 'image/*' : '*/*')}
                />

                {/* Content Area */}
                <div className="p-4">
                    {status === 'idle' && !preview && (
                        <div
                            className="flex flex-col items-center justify-center py-6 cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <div className="p-3 bg-white rounded-xl shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                                {type === 'thumbnail' ? (
                                    <ImageIcon className="w-6 h-6 text-indigo-600" />
                                ) : (
                                    <Upload className="w-6 h-6 text-indigo-600" />
                                )}
                            </div>
                            <p className="text-sm font-bold text-slate-700">
                                {type === 'thumbnail' ? 'Upload Course Thumbnail' : 'Upload Resource File'}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                {type === 'thumbnail' ? 'Recommended: 1280x720px' : 'PDF, Zip, Docs, etc.'}
                            </p>
                        </div>
                    )}

                    {preview && (
                        <div className="relative aspect-video max-h-48 rounded-lg overflow-hidden border border-slate-100 bg-white mx-auto">
                            {isImage ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                                    <FileText className="w-12 h-12 text-slate-300 mb-2" />
                                    <p className="text-xs font-medium text-slate-500 truncate max-w-[80%]">
                                        {file ? file.name : preview.split('/').pop()}
                                    </p>
                                </div>
                            )}

                            {status !== 'uploading' && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="p-2 bg-white rounded-full text-slate-700 hover:text-indigo-600 transition-colors"
                                        title="Change"
                                    >
                                        <Upload size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="p-2 bg-white rounded-full text-slate-700 hover:text-red-600 transition-colors"
                                        title="Remove"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}

                            {status === 'success' && (
                                <div className="absolute top-2 right-2 p-1 bg-emerald-500 rounded-full text-white shadow-lg z-20">
                                    <CheckCircle size={14} />
                                </div>
                            )}

                            {status === 'uploading' && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                                    <div className="relative mb-2">
                                        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-[8px] font-black text-indigo-700">{progress}%</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest animate-pulse">Uploading...</p>
                                </div>
                            )}
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-6 flex flex-col items-center justify-center text-center px-4">
                            <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
                            <p className="text-sm font-bold text-red-900 mb-1">Upload Failed</p>
                            <p className="text-xs text-red-500 mb-4">{error}</p>
                            <button
                                type="button"
                                onClick={() => uploadFile(file)}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-red-700 transition-all"
                            >
                                Retry Upload
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {preview && status === 'idle' && (
                <p className="mt-2 text-[10px] text-slate-400 text-center font-medium">
                    Click image or icons to change
                </p>
            )}
        </div>
    );
}
