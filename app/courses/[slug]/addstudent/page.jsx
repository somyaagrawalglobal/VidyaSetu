// components/StudentJoinForm.jsx
"use client";

import { useState } from 'react';
import { X, User, Mail, Smartphone, Send, BookOpen } from 'lucide-react';

export default function StudentJoinForm({ courseTitle, isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert(`Successfully applied for "${courseTitle}"! (Check console for data)`);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        // Modal Overlay (Fixed position, full screen)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
            
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-8 relative transform transition-all duration-300 scale-100">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <BookOpen className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                    <h2 className="text-3xl font-bold text-gray-900">Join the Course</h2>
                    <p className="text-gray-500 mt-1">Enroll in: <strong className="text-indigo-600">{courseTitle}</strong></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name Field */}
                    <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                        <Smartphone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        Submit Enrollment Request
                    </button>
                </form>
            </div>
        </div>
    );
}