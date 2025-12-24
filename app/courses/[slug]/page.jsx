import CourseSlugButton from "@/components/CourseSlugButton";
import { courses } from "@/data/courses";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, CheckCircle } from "lucide-react"; // Importing new icons for UI

export default async function CourseDetailPage({ params }) {
    // Ensure params is awaited to fix the hydration/Next.js dynamic route error
    const { slug } = await params;

    const course = courses.find(
        (course) => course.slug === slug
    );

    if (!course) {
        notFound();
    }

    // --- Helper Component for displaying a single detail ---
    const DetailItem = ({ icon: Icon, title, value }) => (
        <div className="flex items-start space-x-3 p-4 bg-indigo-50/50 rounded-lg">
            <Icon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-lg font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
    // --------------------------------------------------------

    return (
        // Enhanced overall container
        <div className="bg-gray-100 pt-25 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-3xl overflow-hidden border border-gray-200">

                {/* Course Image Section */}
                <div className="relative w-full h-80 sm:h-96 bg-gray-200">
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        className="transition duration-500 hover:scale-[1.03] transform"
                    />
                </div>

                {/* Content Section (Padded) */}
                <div className="p-8 sm:p-12 lg:p-16 space-y-12">
                    
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                        {course.title}
                    </h1>

                    {/* Key Details Grid (Replacing the repetitive border-t divs) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-8">
                        
                        <DetailItem 
                            icon={Clock} 
                            title="Course Duration" 
                            value={course.duration || "Not specified"} 
                        />
                        
                        <DetailItem 
                            icon={CheckCircle} 
                            title="Achievement Points" 
                            value={course.points || "N/A"} 
                        />

                    </div>

                    {/* Description Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">
                            Course Overview
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-10 pt-6 border-t flex justify-center">
                        <CourseSlugButton course={course}/>
                    </div>
                </div>

            </div>
        </div>
    );
}