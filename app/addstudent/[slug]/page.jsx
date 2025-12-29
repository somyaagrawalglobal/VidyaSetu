"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  DollarSign,
  BookOpen,
  ClipboardCheck,
  Banknote,
} from "lucide-react";

// --- Main Component ---
export default function AddStudentPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  // 1. Data Retrieval and Formatting
  const slug = params.slug;
  const priceParam = searchParams.get("price");

  // Convert slug → Course Name
  const courseName = slug
    ? slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Selected Course";

  // Format price
  const coursePrice = priceParam
    ? `₹${Number(priceParam).toLocaleString()}`
    : "Price Not Available";

  // 2. State Management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    qualification: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      ...formData,
      courseName,
      coursePrice,
    };

    console.log("Student Data:", data);

    // Realistic Feedback
    alert(`Enrollment for ${formData.firstName} ${formData.lastName} in ${courseName} submitted successfully!`);
    // Reset form after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      qualification: "",
    });
  };

  // 3. Render
  return (
    // Background: Solid light gray for a clean, professional look
    <div className="min-h-screen pt-25 flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        // Container: Wider, smoother corners, subtle border, enhanced shadow
        className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl shadow-indigo-200/50 border border-gray-100 space-y-8"
      >
        {/* --- Header & Course Info --- */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Enrollment Application
          </h1>
          <p className="text-lg text-gray-500">
            Secure your seat in the program by filling out the details below.
          </p>
        </div>

        {/* Course Card: Prominent and well-defined */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-inner">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <p className="text-sm font-medium text-indigo-700 uppercase">
                Selected Program
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {courseName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-white p-2 px-4 rounded-full border border-green-300 shadow-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-3xl font-extrabold text-green-700">
              {coursePrice}
            </span>
          </div>
        </div>
        
        {/* --- Form Fields Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input 
            icon={User} 
            name="firstName" 
            placeholder="First Name *" 
            onChange={handleChange} 
            value={formData.firstName}
            type="text"
            autoComplete="given-name"
          />
          <Input 
            icon={User} 
            name="lastName" 
            placeholder="Last Name *" 
            onChange={handleChange} 
            value={formData.lastName}
            type="text"
            autoComplete="family-name"
          />
          <Input 
            icon={Mail} 
            type="email" 
            name="email" 
            placeholder="Email Address *" 
            onChange={handleChange} 
            value={formData.email}
            autoComplete="email"
          />
          <Input 
            icon={Phone} 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number *" 
            onChange={handleChange} 
            value={formData.mobile}
            autoComplete="tel"
          />
        </div>

        {/* Full-width fields */}
        <Input 
          icon={MapPin} 
          name="address" 
          placeholder="Full Address *" 
          onChange={handleChange} 
          value={formData.address}
          type="text"
          autoComplete="street-address"
        />

        {/* Dropdown with enhanced styling */}
        <div className="relative flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-white transition-all duration-200">
          <GraduationCap className="w-5 h-5 ml-4 text-gray-400 absolute pointer-events-none" />
          <select
            name="qualification"
            required
            onChange={handleChange}
            value={formData.qualification}
            className="w-full p-3 pl-12 text-gray-700 bg-transparent outline-none appearance-none cursor-pointer"
          >
            <option value="" disabled className="text-gray-500">Highest Qualification *</option>
            <option value="10th" className="text-gray-900">10th Pass</option>
            <option value="12th" className="text-gray-900">12th Pass</option>
            <option value="Diploma" className="text-gray-900">Diploma</option>
            <option value="Graduate" className="text-gray-900">Graduate</option>
            <option value="Post Graduate" className="text-gray-900">Post Graduate</option>
          </select>
          {/* Custom dropdown arrow (replaces default browser one) */}
          <svg className="w-5 h-5 text-gray-400 absolute right-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

        {/* --- Submit Button --- */}
        <button
          type="submit"
          // Modern button: gradient, strong shadow, slight hover shift
          className="w-full py-4 flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xl font-bold rounded-xl shadow-lg shadow-indigo-500/50 transition-all duration-300 transform hover:scale-[1.01] active:scale-100"
        >
          <ClipboardCheck className="w-6 h-6" />
          <span>Pay Now</span>
        </button>

        <p className="text-xs text-center text-gray-400 pt-2">
            By submitting, you agree to our <a href="#" className="underline hover:text-indigo-500">Terms and Conditions</a>.
        </p>

      </form>
    </div>
  );
}

// --- Reusable Input Component (Light Mode Optimized) ---
function Input({ icon: Icon, value, type = "text", ...props }) {
  return (
    // Input Container: Focus states, smooth border, better background
    <div className="relative flex items-center border border-gray-300 rounded-xl overflow-hidden shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-white transition-all duration-200">
      {/* Icon: Absolute positioning for better input alignment */}
      <Icon className="w-5 h-5 ml-4 text-gray-400 absolute" />
      <input
        {...props}
        required
        value={value}
        type={type}
        // Input styling: Increased padding for icon, better text color
        className="w-full p-3.5 pl-12 text-gray-900 bg-transparent outline-none placeholder-gray-500"
      />
    </div>
  );
}