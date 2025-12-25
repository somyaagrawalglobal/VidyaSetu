import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function CourseCard({ course }) {
  // Define standard colors for reusability (matches the original palette)
  const primaryColor = 'indigo-600';
  const secondaryColor = 'violet-500';

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case 'Trending':
        return `bg-indigo-50 text-green-600 border-indigo-300`;
      case 'Bestseller':
        return `bg-violet-50 text-violet-700 border-violet-300`;
      case 'New':
        return `bg-pink-50 text-pink-700 border-pink-300`;
      default:
        return `bg-gray-50 text-gray-700 border-gray-300`;
    }
  };

  return (
    <div 
        // 1. Added h-full to ensure the card stretches to the height of the grid cell
        className="bg-white rounded-3xl overflow-hidden shadow-xl transition duration-500 flex flex-col group border border-gray-100 transform hover:-translate-y-1 hover:shadow-2xl hover:border-indigo-200 h-full"
    >
      {/* Image & Badge */}
      <div className="h-48 relative overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700 group-hover:scale-105 opacity-95"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {course.badge && (
          <span 
            className={`absolute top-4 right-4 backdrop-blur-sm shadow-md px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase border ${getBadgeStyle(course.badge)}`}
          >
            {course.badge}
          </span>
        )}
      </div>

      {/* Content */}
      {/* 2. Content wrapper uses flex-col flex-1 to stretch vertically */}
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-3xl font-extrabold text-slate-900 mb-3">{course.title}</h3>
        
        {/* 3. Description uses flex-1 and min-h-[4rem] to consume variable space and push the bottom elements down */}
        <p className="text-slate-600 text-base mb-6 flex-1 leading-relaxed min-h-[4rem]">
          {course.description}
        </p>

        {/* Features (Points) */}
        <ul className="space-y-3 mb-8 text-sm pt-4 border-t border-gray-100">
          {/* Using 'course.features' (standard prop name) with optional chaining. 
             If your data uses 'points', change this line to: {course.points?.map((point, i) => ( */}
          {course.points?.map((point, i) => (
            <li key={i} className="flex items-center text-slate-700 font-medium">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mr-2" />
              {point}
            </li>
          ))}
        </ul>

        {/* CTA Button (Remains correctly placed at the bottom due to flex-1 above) */}
        <Link
          href={`/courses/${course.slug}`}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-3 rounded-full font-bold shadow-lg shadow-indigo-600/30 hover:shadow-xl transition transform hover:scale-[1.01]`}
        >
          Apply Now <ArrowRight className="w-5 h-5 ml-1" />
        </Link>
      </div>
    </div>
  );
}