"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { MailCheck, RotateCw } from "lucide-react";

/* ================= OTP INPUT COMPONENT (UI Enhanced) ================= */

const OtpInput = ({ length = 6 }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const [focusedIndex, setFocusedIndex] = useState(-1); // Tracks which input is focused
    const inputRefs = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input automatically
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move back on backspace if the current field is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex justify-center space-x-2 sm:space-x-3 mt-4 mb-8"> {/* Added sm:space-x-3 for better spacing on wider screens */}
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text" // Use text for better mobile keyboard handling (inputMode="numeric" is key)
                    inputMode="numeric"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(-1)}
                    
                    // --- UI Enhancements ---
                    className={`
                        w-10 h-14 sm:w-12 sm:h-16 text-center text-xl font-extrabold text-gray-800
                        rounded-xl transition duration-200
                        border-2 
                        ${focusedIndex === index 
                            ? "border-indigo-600 ring-4 ring-indigo-100/50 shadow-lg scale-[1.05]" // Focused style: Highlight, shadow, slight scale
                            : "border-gray-200 hover:border-gray-400 bg-gray-50/50 shadow-sm" // Default style: Soft background, subtle border
                        }
                    `}
                    // --- End UI Enhancements ---
                />
            ))}
        </div>
    );
};

/* ================= MAIN PAGE (UI Enhanced) ================= */

export default function EmailVerificationPage({
    email = "user.name@example.com",
}) {
    // Timer logic would make this disabled true for a period
    const isResendDisabled = false; 

    return (
        <div className="min-h-screen pt-25 flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6"> {/* Brighter background, better padding */}
            <div 
                className="max-w-md w-full bg-white p-10 sm:p-12 shadow-2xl rounded-2xl text-center border border-gray-100" // Elevated card design
            >

                {/* Icon Section (More pronounced visual) */}
                <div className="flex justify-center mb-7">
                    <div className="p-5 bg-indigo-50 rounded-full shadow-inner">
                        <MailCheck className="w-8 h-8 text-indigo-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Verify Your Email Address
                </h1>

                <p className="text-md text-gray-600 mb-8">
                    We've sent a 6-digit code to:
                    <br />
                    <strong className="text-indigo-700 font-semibold break-all">{email}</strong>
                </p>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("OTP verified (demo)");
                    }}
                    className="space-y-8"
                >
                    <OtpInput />

                    <button
                        type="submit"
                        className={`w-full py-3.5 bg-indigo-600 text-white font-bold text-lg
                            rounded-xl shadow-lg shadow-indigo-500/50 hover:bg-indigo-700
                            focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 transform hover:scale-[1.01]`} // Stronger CTA styling
                    >
                        Confirm Code
                    </button>
                </form>

                {/* Resend + Back Links - Clear visual separation */}
                <div className="mt-10 pt-6 border-t border-gray-200 space-y-4">
                    <button
                        onClick={() => alert("Resend OTP")}
                        disabled={isResendDisabled}
                        className={`text-sm font-medium flex items-center justify-center gap-2 mx-auto
                            transition-colors duration-200
                            ${
                                isResendDisabled
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-indigo-600 hover:text-indigo-800"
                            }`}
                    >
                        <RotateCw className="w-4 h-4" />
                        {isResendDisabled ? "Resend in 0:59" : "Resend Code"}
                    </button>

                    <Link
                        href="/register"
                        className="text-sm text-gray-500 hover:text-gray-900 hover:underline block" // Changed to block for full-width click area
                    >
                        Change email address or go back to Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}