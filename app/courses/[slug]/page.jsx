import CourseSlugButton from "@/components/CourseSlugButton";
import { courses } from "@/data/courses";
// Assuming the VideoModal component is correctly imported and located at "@/components/VideoModal"
import VideoModal from "@/components/VideoModal"; 
import { notFound } from "next/navigation";
import { Clock, CheckCircle, Calendar, User, List, Layers3, Zap, PlayCircle } from "lucide-react";

// The component remains an async Server Component, assuming 'VideoModal' is a client component ('use client') handling its internal state.
export default async function CourseDetailPage({ params }) {
    const { slug } = await params;

    const course = courses.find((course) => course.slug === slug);

    if (!course) {
        notFound();
    }

    // --- Data Placeholders (Using actual course properties where possible) ---
    // Note: If course.lecturer, course.startingdate, etc., are empty, the placeholders are used.
    const lecturer = course.lecturer || "Dr. Somya Agrawal";
    const startDate = course.startingdate || "October 1, 2025";
    const duration = course.duration || "N/A";
    const level = course.level || "Intermediate";
    const price = course.price || "999";
    
    const topics = course.topics || [
        "Phase 1: Foundational Theory",
        "Phase 2: Project Simulation (OJT)",
        "Phase 3: Career Launchpad",
    ];
    // We assume 'course.videoSrc' holds the YouTube ID for the VideoModal
    const videoId = course.videoSrc || "dQw4w9WgXcQ"; 
    // --------------------------------------------------------

    // --- Helper Component for displaying a single detail ---
    const DetailItem = ({ icon: Icon, title, value }) => (
        <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm transition hover:shadow-md">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">{title}</p>
                <p className="text-base sm:text-lg font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
    // --------------------------------------------------------

    // --- Helper Component for list sections ---
    const SectionBlock = ({ title, children, icon: Icon }) => (
        <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                {title}
            </h2>
            {children}
        </div>
    );
    // --------------------------------------------------------

    return (
        <div className="bg-white min-h-screen">
            
            {/* 1. HERO HEADER SECTION (Course Title & Key Meta Data) */}
            <header className="relative pt-24 sm:pt-32 pb-8 sm:pb-16 bg-gray-50 overflow-hidden border-b border-indigo-200/50">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 blur-sm" style={{ backgroundImage: `url(${course.image})` }}></div>
                
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {/* Responsive Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">
                        {course.title}
                    </h1>
                    {/* Responsive Description */}
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mb-8 sm:mb-10">
                        {course.description}
                    </p>

                    {/* Key Meta Data Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <DetailItem icon={User} title="Taught By" value={lecturer} />
                        <DetailItem icon={Clock} title="Course Duration" value={duration} />
                        <DetailItem icon={Calendar} title="Next Start Date" value={startDate} />
                        <DetailItem icon={Layers3} title="Level" value={level} />
                    </div>
                </div>
            </header>


            {/* 2. MAIN BODY: TWO-COLUMN LAYOUT */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                {/* Main Content Grid: Switches from 1 column on mobile/tablet to 3 columns on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                    
                    {/* LEFT COLUMN (2/3 width) - Content */}
                    <div className="lg:col-span-2 space-y-10 sm:space-y-12">
                        
                        {/* 2.1 ABOUT THE COURSE */}
                        <SectionBlock title="About This Course" icon={Layers3}>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                {course.longDescription || course.description}
                            </p>
                            <p className="text-sm sm:text-md text-gray-600 italic mt-4">
                                This pipeline moves beyond theory, focusing heavily on hands-on project execution and industry best practices to ensure job readiness from day one.
                            </p>
                        </SectionBlock>

                        {/* 2.2 WHY CHOOSE IT */}
                        <SectionBlock title={`Why Choose ${course.title}?`} icon={Zap}>
                            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mr-3 mt-1" />
                                    <span>**Guaranteed OJT:** Direct placement into a live project simulation with one of our industry partners.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mr-3 mt-1" />
                                    <span>**Industry Mentors:** Weekly 1:1 sessions with domain experts currently working in high-growth companies.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mr-3 mt-1" />
                                    <span>**Portfolio Focus:** Graduate with a job-ready portfolio of 4-6 completed, professional-grade projects.</span>
                                </li>
                            </ul>
                        </SectionBlock>
                        
                        {/* 2.3 COURSE BENEFITS / WHAT YOU WILL LEARN */}
                        <SectionBlock title="Key Learning Outcomes" icon={CheckCircle}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.points && course.points.map((point, i) => (
                                    <div key={i} className="flex items-start space-x-2 text-gray-700">
                                        <span className="text-indigo-600 font-extrabold text-lg">›</span>
                                        <span className="text-sm sm:text-base">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionBlock>
                    </div>

                    {/* RIGHT COLUMN (1/3 width) - Sidebar: Sticky Enrollment/Video Block */}
                    <div className="lg:col-span-1 space-y-8 sm:space-y-10">
                        
                        {/* Enrollment Card with Video and CTA (Sticky on desktop) */}
                        <div className="bg-white p-6 rounded-xl lg:top-8 space-y-4">
                            
                            {/* Video Preview */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <PlayCircle className="w-5 h-5 text-indigo-600" />
                                    Course Preview
                                </h3>
                                {/* VideoModal is now used here */}
                                <VideoModal videoId={course.src}/>

                                <p className="text-sm text-gray-500 text-center mt-3">
                                    Watch this video to understand course flow & outcomes.
                                </p>
                            </div>
                            
                            {/* Price & CTA Section */}
                            
                        </div>
                        
                        {/* TOPICS COVERED */}
                        <SectionBlock title="Topics Covered" icon={List}>
                            <ol className="space-y-3 pl-0 list-none">
                                {topics.map((topic, i) => (
                                    <li key={i} className="flex items-start text-gray-700 border-b border-gray-100 pb-2">
                                        <span className="text-indigo-600 font-bold mr-3">{i + 1}.</span>
                                        <span className="text-sm font-medium">{topic}</span>
                                    </li>
                                ))}
                            </ol>
                        </SectionBlock>

                        {/* Additional Info Box */}
                        <div className="p-6 bg-gray-100 rounded-xl border border-gray-200 shadow-inner">
                            <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                Time Commitment
                            </p>
                            <p className="text-sm text-gray-600">
                                Requires approximately 10-15 hours per week of dedicated study and project work.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed/Sticky Mobile CTA Footer (Kept the original logic and structure) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-2xl lg:hidden z-50">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div>
                        <p className="text-xs text-gray-500">Starting At</p>
                        <p className="text-xl font-extrabold text-indigo-700">${price}</p>
                    </div>
                    <div className="w-2/3">
                        <CourseSlugButton course={course} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}