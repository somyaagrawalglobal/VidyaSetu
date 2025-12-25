import Navbar from "@/components/Navbar"; // Assuming you want to include the Navbar here
import CourseCard from "../../components/CourseCard";
import { courses } from "@/data/courses";
import { Zap } from "lucide-react";

// Assuming 'courses' data structure has been updated in '@/data/courses'
// and 'CourseCard' uses the 'course' prop (which it does).

export default function Courses() {
  
  // Custom gradient class for the text (using standard Tailwind colors)
  const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500";
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Header - Improved Design */}
      <header className="pt-40 relative overflow-hidden bg-white shadow-inner">
        {/* Subtle background element for visual interest */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl -z-10 opacity-30 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          
          <p className="text-lg font-semibold text-indigo-600 mb-3 flex items-center justify-center" data-aos="fade-down">
            <Zap className="w-5 h-5 mr-2" />
            Career Pipelines Designed for the Future
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6" data-aos="fade-down" data-aos-delay="100">
            Explore Our <span className={gradientTextClass}>Programs</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Industry-designed, outcome-focused career paths that bridge the skill gap, complete with guaranteed On-the-Job Training.
          </p>
        </div>
      </header>

      {/* Courses Grid - Improved Layout */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {courses.map((course, index) => (
              <div 
                key={course.id} 
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