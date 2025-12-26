"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { User, Mail, Phone, Calendar, GraduationCap, Send } from "lucide-react";

export default function AddStudentPage() {
  const params = useParams();
  const courseSlug = params?.slug;

  const courseTitle = courseSlug
    ? courseSlug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Selected Course";



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredStartDate: "", // New Field
    educationLevel: "", // New Field
    motivation: "", // New Field (Textarea)
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const studentData = {
      ...formData,
      course: courseTitle,
      submissionDate: new Date().toISOString(),
    };

    // --- Simulate API call or data submission ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    // ------------------------------------------

    console.log("Student Applied:", studentData);
    alert(`Thank you, ${formData.name}! Your application for "${courseTitle}" has been submitted successfully. We will contact you at ${formData.email} shortly.`);

    // Reset form and loading state
    setIsLoading(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredStartDate: "",
      educationLevel: "",
      motivation: "",
    });
  };

  // --- Helper Component for a styled input field ---
  const InputField = ({ icon: Icon, type = "text", name, placeholder, required = true, children }) => (
    <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 transition duration-150 overflow-hidden bg-white">
      <Icon className="w-5 h-5 ml-4 text-gray-400 flex-shrink-0" />
      {children ? (
        children // Render children (e.g., select or textarea)
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={formData[name]}
          onChange={handleChange}
          className="w-full p-3 text-gray-700 outline-none border-0 focus:ring-0 placeholder-gray-500"
        />
      )}
    </div>
  );
  // ----------------------------------------------------


  return (
    <div className="min-h-screen pt-25 flex items-center justify-center bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-xl space-y-6 border border-indigo-100"
      >
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Enrollment Application
          </h2>
          <p className="text-lg text-indigo-600 mt-2 p-2 bg-indigo-50 rounded-lg border border-indigo-200">
            Course: <span className="font-bold">{courseTitle}</span>
          </p>
        </div>

        {/* Form Fields Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Details</h3>

          {/* Name */}
          <InputField icon={User} name="name" placeholder="Full Name" />

          {/* Email */}
          <InputField icon={Mail} type="email" name="email" placeholder="Email Address" />

          {/* Phone */}
          <InputField icon={Phone} type="tel" name="phone" placeholder="Phone Number" />
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Course Planning</h3>

          {/* Preferred Start Date (New Field) */}
          <InputField icon={Calendar} type="date" name="preferredStartDate" placeholder="Preferred Start Date">
            <input
              type="date"
              name="preferredStartDate"
              required
              value={formData.preferredStartDate}
              onChange={handleChange}
              className="w-full p-3 text-gray-700 outline-none border-0 focus:ring-0 placeholder-gray-500"
            />
          </InputField>

          {/* Education Level (New Field - Select) */}
          <InputField icon={GraduationCap} name="educationLevel" required={true}>
            <select
              name="educationLevel"
              required
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-3 text-gray-700 outline-none border-0 focus:ring-0 bg-white"
            >
              <option value="" disabled>Select Highest Education Level *</option>
              <option value="High School">High School / GED</option>
              <option value="Associate">Associate's Degree</option>
              <option value="Bachelor">Bachelor's Degree</option>
              <option value="Master">Master's Degree or Higher</option>
              <option value="Other">Other / Self-Taught</option>
            </select>
          </InputField>

          {/* Motivation (New Field - Textarea) */}
          <div>
            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
              Why are you interested in this course?
            </label>
            <textarea
              id="motivation"
              name="motivation"
              rows="3"
              placeholder="Tell us about your goals (Optional)"
              value={formData.motivation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
            />
          </div>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent rounded-lg text-lg font-medium shadow-md transition duration-300 ${isLoading
              ? "bg-indigo-400 text-white cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
            }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Complete Enrollment Application</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center pt-2">
          * By submitting, you agree to our terms and conditions.
        </p>

      </form>
    </div>
  );
}