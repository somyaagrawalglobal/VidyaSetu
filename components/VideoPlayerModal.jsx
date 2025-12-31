'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VideoPlayerModal({ isOpen, onClose, videoId, title }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        } else {
            setTimeout(() => setAnimate(false), 200);
        }
    }, [isOpen]);

    if (!isOpen && !animate) return null;

    // Construct YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className={`relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                >
                    <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
                        <h3 className="text-white font-semibold truncate pr-4">{title || 'Preview'}</h3>
                        <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="aspect-video w-full bg-black">
                        {videoId ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={title}
                            ></iframe>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Video not available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
