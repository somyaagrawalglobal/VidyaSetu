"use client";

import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";

export default function Register() {
    
    // Consistent brand color variables
    const primaryColor = 'indigo-600';
    const secondaryColor = 'purple-600';
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log("Registration attempted");
    };

    const InputField = ({ id, type, placeholder, icon: Icon, required = false }) => (
        <div className="relative">
            <label className="sr-only" htmlFor={id}>{placeholder}</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="w-full pl-12 pr-5 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/50 outline-none transition text-slate-800"
                required={required}
                minLength={type === 'password' ? 6 : undefined} // Enforce min length for password
            />
        </div>
    );

    return (
        <div className="min-h-screen pt-25 flex items-center justify-center bg-slate-50 p-6">
            
            {/* Registration Card Container */}
            <div 
                className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl shadow-2xl shadow-purple-300/50 border border-gray-100"
                data-aos="zoom-in" 
                data-aos-duration="800"
            >
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
                        Join <span className={gradientTextClass}>Vidya-Setu</span>
                    </h2>
                    <p className="text-slate-500">
                        Create your account to start your career journey.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    <InputField 
                        id="full-name" 
                        type="text" 
                        placeholder="Full Name" 
                        icon={User} 
                        required={true} 
                    />
                    
                    <InputField 
                        id="email" 
                        type="email" 
                        placeholder="Email Address" 
                        icon={Mail} 
                        required={true} 
                    />
                    
                    {/* Note: In production, this would often be a single Phone Number field. 
                       Keeping two here to match the specific UI image provided. */}
                    <InputField 
                        id="phone-number" 
                        type="tel" 
                        placeholder="Phone Number" 
                        icon={Phone} 
                        required={true} 
                    />
                    
                    <InputField 
                        id="password" 
                        type="password" 
                        placeholder="Password (min 6 characters)" 
                        icon={Lock} 
                        required={true} 
                    />
                    
                    <InputField 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm Password" 
                        icon={Lock} 
                        required={true} 
                    />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-${primaryColor} to-${secondaryColor} text-white font-extrabold text-lg py-3.5 mt-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/50 transition transform hover:scale-[1.005]`}
                    >
                        Create Account 
                        <ArrowRight className="w-5 h-5 ml-1" />
                    </button>
                    
                </form>

                {/* Footer Link (Existing User) */}
                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-slate-600">
                        Already a user? 
                        <a 
                            href="/login" 
                            className={`ml-1 font-bold text-${primaryColor} hover:underline transition`}
                        >
                            Sign In
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
}