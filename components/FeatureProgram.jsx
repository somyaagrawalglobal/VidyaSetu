import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Zap, DollarSign, BookOpen, User } from "lucide-react";
import { courses } from "../data/courses";
import ProgramBadge from "./ProgramBadge"; // Assuming this component handles the small topic badge

// Helper function to format price (moved here for completeness, though it could live outside)
const formatPrice = (price) => {
    if (price === 0) return 'Free';
    if (typeof price === 'number') return `$${price}`;
    return price || 'Price Varies';
};


export default function FeaturedProgramsSection() {
    return (
        <section className="py-20 sm:py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header and CTA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16">
                    <div className="text-left mb-6 sm:mb-0" data-aos="fade-right">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Featured <span className="text-indigo-600">Courses</span>
                        </h2>
                        <p className="text-md text-gray-600 mt-2">
                            Select your path to a new, high-demand career.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center transition-colors border border-indigo-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                        data-aos="fade-left"
                    >
                        View all courses <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.slice(0, 3).map((program, index) => {
                        // Card-specific data processing
                        const price = formatPrice(program.price);
                        const originalPrice = program.originalPrice ? formatPrice(program.originalPrice) : null;
                        const discountBadge = program.discount || "50% OFF";

                        return (
                            <div
                                key={index}
                                // Updated Card Styling: Modern, Realistic, Rounded-2xl, Stronger Hover Lift
                                className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/80 transition duration-500 flex flex-col group border border-gray-100 transform hover:-translate-y-1.5 hover:shadow-indigo-500/30 h-full"
                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                            >
                                {/* --- 1. Top Graphic Header Section (Image Background with Gradient & Badge) --- */}
                                <div className={`relative h-44 flex items-center justify-center overflow-hidden`}>

                                    {/* Course Image as Background */}
                                    <Image
                                        src={program.image}
                                        alt={program.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-all duration-700 group-hover:scale-110 filter "
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority={true}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0"></div>


                                    {/* Custom Discount Badge (Top right corner, rotated) */}
                                    {discountBadge && (
                                        <div
                                            className={`absolute top-0 right-0 py-2 px-6 bg-pink-600 text-white font-black text-sm uppercase transform translate-y-4 translate-x-4 rotate-45 shadow-lg z-20`}
                                            style={{ minWidth: '100px', textAlign: 'center' }}
                                        >
                                            {discountBadge}
                                        </div>
                                    )}
                                </div>
                                {/* --- END OF HEADER --- */}

                                {/* --- 2. Content Body Section (Refined Padding) --- */}
                                <div className="p-6 flex flex-col flex-1">

                                    {/* Topic Badge */}
                                    <div className="mb-3">
                                        {/* Assuming ProgramBadge or similar logic exists, or using inline span */}
                                        <span className="inline-block px-4 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg">
                                            {program.category || 'Development'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-slate-900 leading-snug mb-2 line-clamp-2 min-h-[3rem]">
                                        <Link href={`/courses/${program.slug}`} className="hover:text-indigo-600 transition-colors">
                                            {program.title}
                                        </Link>
                                    </h3>

                                    {/* Description/Slogan */}
                                    <p className="text-slate-500 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                                        {program.description}
                                    </p>

                                    {/* Lecturer/Author */}
                                    <p className="text-xs text-gray-500 mb-2 py-1 border-b border-gray-100">
                                        <User className="w-3.5 h-3.5 inline-block mr-1 text-indigo-400" /> By <b className="text-gray-700">{program.lecturer || 'Instructor Name'}</b>
                                    </p>

                                    {/* Meta Data Line (Reorganized for clean list) */}
                                    <div className="flex items-center space-x-5 text-sm text-gray-600 mb-2">
                                        {/* Duration */}
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                                            <span className="font-medium">{program.duration || 'N/A'}</span>
                                        </div>
                                        {/* Level (Using Zap icon for visual flair) */}
                                        <div className="flex items-center">
                                            <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                                            <span className="font-medium">{program.level || 'All'}</span>
                                        </div>
                                        {/* Modules/Videos (Reusing BookOpen for lessons count) */}
                                        <div className="flex items-center">
                                            <BookOpen className="w-4 h-4 mr-1 text-indigo-500" />
                                            <span className="font-medium">{program.videoCount || '5 Modules'}</span>
                                        </div>
                                    </div>

                                    {/* --- 3. Footer/CTA Area (Price Left, Button Right) --- */}
                                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200">

                                        {/* Price Display */}
                                        <div className="flex flex-col items-start">
                                            {originalPrice && (
                                                <span className="text-xs text-gray-400 line-through">
                                                    {originalPrice}
                                                </span>
                                            )}
                                            <span className="text-2xl font-bold font-black text-green-600">
                                                {price}
                                            </span>
                                        </div>

                                        {/* Primary CTA Button */}
                                        <Link
                                            href={`/courses/${program.slug}`}
                                            className={`inline-flex items-center bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 hover:bg-blue-700 hover:scale-[1.02]`}
                                        >
                                            Enroll Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}