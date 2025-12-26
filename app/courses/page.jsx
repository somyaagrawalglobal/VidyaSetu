"use client"; // Must be a client component to use useState

import { useState } from "react";
import CourseCard from "../../components/CourseCard";
import { courses } from "@/data/courses";
import { Zap, SlidersHorizontal, ChevronDown } from "lucide-react";

// Assuming 'courses' data structure includes: level, price, duration, etc.

export default function Courses() {
    
    // State for filtering (UI elements only, filtering logic omitted for brevity)
    const [filter, setFilter] = useState({
        level: "All",
        price: "All",
        sort: "Recommended",
    });

    const handleChange = (name, value) => {
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    // Custom gradient class for the text (using standard Tailwind colors)
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500";

    // Options for the dropdowns
    const levelOptions = ["All", "Beginner", "Intermediate", "Advanced"];
    const priceOptions = ["All", "Free", "Paid"];
    const sortOptions = ["Recommended", "Newest", "Duration (Shortest)"];
    
    // --- Helper Component for Styled Dropdown ---
    const FilterDropdown = ({ name, options, value, onChange }) => (
        <div className="relative text-gray-700">
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-indigo-500 focus:border-indigo-500 transition-colors cursor-pointer hover:border-gray-400"
            >
                {options.map(option => (
                    <option key={option} value={option}>
                        {name.charAt(0).toUpperCase() + name.slice(1)}: {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
        </div>
    );
    // ------------------------------------------

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            
            {/* Navbar is assumed to be outside or placed here */}
            {/* <Navbar /> */}

            {/* Header - Reduced H1 size and cleaner design */}
            <header className="pt-40 pb-20 relative overflow-hidden bg-white border-b border-indigo-100">
                {/* Subtle background element for visual interest (moved slightly higher/smaller) */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl -z-10 opacity-40"></div>
                
                <div className="max-w-7xl mx-auto px-4 text-center">
                    
                    <p className="text-base font-semibold text-indigo-600 mb-3 flex items-center justify-center" data-aos="fade-down">
                        <Zap className="w-5 h-5 mr-2 text-indigo-500" />
                        Career Pipelines Designed for the Future
                    </p>

                    {/* H1: Reduced size from 7xl to 6xl/5xl */}
                    <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6" data-aos="fade-down" data-aos-delay="100">
                        Explore Our <span className={gradientTextClass}>Programs</span>
                    </h1>
                    
                    <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Industry-designed, outcome-focused career paths that bridge the skill gap, complete with guaranteed On-the-Job Training.
                    </p>
                </div>
            </header>

            {/* Courses Grid with Filtering Controls */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {/* Only rendering the CourseCard, filtering logic would go here */}
                        {courses.map((course, index) => (
                            <div 
                                key={course.id || index} 
                                data-aos="fade-up" 
                                data-aos-delay={index * 100} // Staggered animation effect
                            >
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </div>
                    


                </div>
            </section>
        </div>
    );
}