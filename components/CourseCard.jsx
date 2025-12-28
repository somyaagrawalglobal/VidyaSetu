"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, BookOpen, User, Tag, ShieldCheck } from "lucide-react"; // Added Tag and ShieldCheck

export default function CourseCard({ course, searchParamPrice }) {
  const router = useRouter();

  // Price handling
  const effectivePrice =
    searchParamPrice !== undefined && searchParamPrice !== null
      ? searchParamPrice
      : course.price;

  const formatPrice = price => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    if (!isNaN(num)) return `₹${num.toLocaleString()}`;
    return "Price Varies";
  };

  const price = formatPrice(effectivePrice);
  // Default values are maintained for robustness
  const lecturer = course.lecturer || "Dr. Angela Yu";
  const duration = course.duration || "1h";
  const videoCount = course.videoCount || "3 videos";


  // --- Render ---
  return (
    // Card Container: Subtle blue background for depth, larger rounded corners, defined shadow
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col max-w-sm mx-auto group border border-gray-100 overflow-hidden">
      
      {/* Image Section */}
      <div className="relative h-48 w-full">
        {/* Placeholder for the badge/tag */}
        {course.tag && (
          <span className="absolute top-3 left-3 z-10 flex items-center bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            <Tag className="w-3 h-3 mr-1" />
            {course.tag}
          </span>
        )}
        
        <Image
          src={course.image}
          alt={course.title}
          fill
          // Ensure image is slightly larger on hover
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient Overlay for professional contrast with title (optional but modern) */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Title and Description */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-snug">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description || "A comprehensive course designed to quickly bring you up to speed with modern practices and technologies."}
        </p>

        {/* Metadata (Lecturer, Duration, Videos) */}
        <div className="space-y-2 mb-3 text-sm">
          <p className="flex items-center text-gray-700 font-medium">
            <User className="w-3.5 h-3.5 inline-block mr-1 text-indigo-400"/> By <span className="text-cyan-600">{course.lecturer}</span>
          </p>

          <div className="flex justify-between text-gray-500">
            <span className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1 text-gray-400" /> 
              {videoCount}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" /> 
              {duration}
            </span>
          </div>
        </div>

        {/* Footer: Price and Button */}
        <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-2">
          
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Investment
            </span>
            <span className="text-3xl font-black text-green-600 tracking-tight">
              {price}
            </span>
          </div>

          {/* ✅ ENROLL BUTTON: Gradient, strong shadow, and hover effect */}
          <button
            onClick={`/courses/${course.slug}?price=${course.price}`}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl  transition-all duration-300 transform hover:scale-[1.03]"
          >
            Enroll Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}