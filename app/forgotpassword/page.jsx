"use client";

import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
    
    // Consistent brand color variables
    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset request logic here
        console.log("Password reset request submitted");
    };

    return (
        <div className="min-h-screen pt-25 flex items-center justify-center bg-slate-50 p-6">
            
            {/* Password Reset Card Container */}
            <div 
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-indigo-300/50 border border-gray-100"
                data-aos="zoom-in" 
                data-aos-duration="800"
            >
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                        Reset Your <span className={gradientTextClass}>Password</span>
                    </h2>
                    <p className="text-slate-500 max-w-xs mx-auto">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email Input */}
                    <div className="relative">
                        <label className="sr-only" htmlFor="email">Email Address</label>
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                            <Mail className="w-5 h-5" />
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/50 transition transform hover:scale-[1.005]`}
                    >
                        Send Reset Link
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                    
                </form>

                {/* Footer Link (Back to Login) */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link
                        href="/login"
                        className={`text-sm font-bold text-slate-600 hover:text-${primaryColor} transition flex items-center justify-center`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
}