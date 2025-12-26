import Image from "next/image";
import Link from "next/link";
// Using specific Lucide icons for a cleaner look
import { ArrowRight, Clock, BookOpen, User } from "lucide-react"; 

export default function CourseCard({ course }) {
    // Helper function to format price
    const formatPrice = (price) => {
        if (price === 0) return 'Free';
        if (typeof price === 'number') return `$${price}`;
        return price || 'Price Varies';
    };

    // Helper function to get the topic badge content based on course category
    const getTopicBadge = (category) => {
        return course.category || 'Web Development';
    };

    // Custom logic for the "50% OFF" badge (using a strong sale color)
    const discountBadge = course.discount || "50% OFF";

    // Data mapping for consistency
    const videoCount = course.videoCount || "3 videos";
    const duration = course.duration || "1h";
    const lecturer = course.lecturer || "Dr. Angela Yu";
    const price = formatPrice(course.price); 
    const originalPrice = course.originalPrice ? formatPrice(course.originalPrice) : null;


    return (
        <div 
            // 1. Base Card Structure: Smoother rounded corners, elevated appearance, stronger shadow.
            className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/80 transition duration-500 flex flex-col group border border-gray-100 transform hover:-translate-y-1.5 hover:shadow-indigo-500/30 h-full max-w-sm mx-auto"
        >
            {/* --- 1. Top Graphic Header Section (Premium Image Background with Gradient & Blur) --- */}
            <div className={`relative h-44 flex items-center justify-center overflow-hidden`}>
                
                {/* Course Image as Background */}
                <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    // Increased transition time and subtle blur for depth
                    className="transition-all duration-700 group-hover:scale-110 filter "
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={true} 
                />

                {/* Modern Gradient Overlay: Deep blue to light violet for a tech feel */}
                <div className="absolute inset-0 "></div>
                
                {/* Optional: Placeholder Icon for the visual center */}

                {/* Custom Discount Badge (Top right corner, high-contrast, sharp) */}
                {discountBadge && (
                    <div 
                        // Using magenta/pink for a vibrant sale tag
                        className={`absolute top-0 right-0 py-2 px-6 bg-pink-600 text-white font-black text-sm uppercase transform translate-y-4 translate-x-4 rotate-45 shadow-lg z-20`}
                        style={{ minWidth: '100px', textAlign: 'center' }}
                    >
                        {discountBadge}
                    </div>
                )}
            </div>

            {/* --- 2. Content Body Section (Clean, well-spaced) --- */}
            <div className="p-6 flex flex-col flex-1">
                
                {/* Topic Badge (Softer corners, lighter background) */}
                <div className="mb-3">
                    <span className="inline-block px-4 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg">
                        {getTopicBadge(course.category)}
                    </span>
                </div>
                
                {/* Title (Modern font weight and line height) */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 min-h-[2rem]"> 
                    {course.title}
                </h3>
                
                {/* Description/Slogan (More subtle) */}
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 min-h-[2.5rem]"> 
                    {course.description}
                </p>

                {/* Lecturer/Author with icon */}
                <p className="text-xs font-semibold text-gray-600 mb-2 border-b border-gray-100 pb-2">
                    <User className="w-3.5 h-3.5 inline-block mr-1 text-indigo-400"/> By <span className="text-cyan-600">{lecturer}</span>
                </p>
                
                {/* Meta Data Line (Icon-driven, compact layout) */}
                <div className="flex items-center space-x-5 text-sm text-gray-600 mb-2 py-1">
                    {/* Videos */}
                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1 text-indigo-500" />
                        <span className="font-medium">{videoCount}</span>
                    </div>
                    {/* Duration */}
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                        <span className="font-medium">{duration}</span>
                    </div>
                </div>

                {/* --- 3. Footer/CTA Area (Separated by a hairline) --- */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    
                    {/* Price Display: Prominent, green/sale price, with optional original price strike-through */}
                    <div className="flex flex-col items-start">
                        {originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                {originalPrice}
                            </span>
                        )}
                        <span className="text-2xl font-black text-green-600">
                            {price}
                        </span>
                    </div>
                    
                    {/* Primary CTA Button: Full rounded edges, stronger hover lift */}
                    <Link
                        href={`/courses/${course.slug}`}
                        className={`inline-flex items-center bg-blue-600 text-white font-bold py-3 px-5 rounded-full transition duration-300 hover:bg-blue-700 hover:scale-[1.02]`}
                    >
                        Enroll Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </div>
    );
}