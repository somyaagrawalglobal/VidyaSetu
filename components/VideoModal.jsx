"use client";

import { useState } from "react";
import { X, PlayCircle } from "lucide-react";

export default function VideoModal({ videoId }) {
    const [open, setOpen] = useState(false);

    // Function to close the modal by clicking the overlay or the button
    const closeModal = () => setOpen(false);

    return (
        <>
            {/* 1. Highly Attractive Preview Card */}
            <div
                onClick={() => setOpen(true)}
                // Enhanced shadow, distinct ring, more aggressive hover scale, and a slightly elevated z-index for pop
                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl ring-4 ring-indigo-400/50 transition duration-500 transform hover:scale-[1.02] active:scale-[1.0] group z-10"
            >
                {/* Image: Retaining maxresdefault for best quality, ensuring fit and object-center for focus */}
                <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                    alt="Course Preview"
                    // Increased height slightly and applied aggressive zoom on hover
                    className="w-full h-64 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay with Stylized Play Button and Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-indigo-700/20 flex items-center justify-center transition duration-500 group-hover:from-indigo-900/30 group-hover:to-indigo-700/10">
                    {/* Stylized Play button wrapper for a clean, prominent look */}
                    <div className="p-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full transition duration-500 group-hover:bg-white/30">
                        {/* Play icon with a pulse effect on hover */}
                        <PlayCircle 
                            className="w-12 h-12 text-white drop-shadow-xl transition duration-500 group-hover:scale-110 group-hover:text-red-500" 
                        />
                    </div>
                </div>
            </div>

            {/* 2. Enhanced Modal with Reduced Video Size */}
            {open && (
                <div 
                    // Set to z-[100] to ensure it's above all standard content and modals
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300 ease-in-out backdrop-blur-md"
                    onClick={closeModal} 
                >
                    <div 
                        // REDUCED SIZE: Changed from max-w-5xl to max-w-3xl for a smaller, more focused video experience
                        className="relative w-full max-w-3xl" 
                        onClick={(e) => e.stopPropagation()} 
                    >
                        {/* Close Button: Positioned slightly further out for a clearer visual separation */}
                        <button
                            onClick={closeModal}
                            // Increased size and stronger hover effect for accessibility and visibility
                            className="absolute -top-12 right-0 sm:-right-8 z-10 p-3 text-white bg-black/50 rounded-full hover:bg-black/80 hover:text-red-500 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
                            aria-label="Close video player"
                        >
                            <X size={28} className="drop-shadow-lg"/>
                        </button>

                        {/* Responsive YouTube iframe Container: Cleaned up shadow/ring for focus */}
                        <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                // Ensures the video starts playing automatically when the modal opens
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`} 
                                title="Course Preview Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}