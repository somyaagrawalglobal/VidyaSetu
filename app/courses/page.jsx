"use client";

import { useState, useEffect, useMemo } from "react";
import CourseCard from "@/components/CourseCard";
import { Zap, Search, Filter, SlidersHorizontal, ChevronDown, BookOpen, Sparkles, GraduationCap } from "lucide-react";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/courses');
                const data = await res.json();
                if (data.success) {
                    setCourses(data.courses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const categories = useMemo(() => {
        const cats = courses.map(c => c.category).filter(Boolean);
        return ["All", ...new Set(cats)];
    }, [courses]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCategory = selectedCategory === "All" || course.category === selectedCategory;
            const matchLevel = selectedLevel === "All" || course.level === selectedLevel;

            return matchSearch && matchCategory && matchLevel;
        });
    }, [courses, searchQuery, selectedCategory, selectedLevel]);

    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600";

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">

            {/* --- HERO BANNER SECTION --- */}
            <section className="relative pt-28 pb-10 overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-indigo-100 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Sparkles className="w-4 h-4 text-indigo-500" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Premium Learning Experience</span>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-black font-bold text-slate-00 mb-4 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            Elevate Your <span className={gradientTextClass}>Skillset</span> With Industry Experts <br className="hidden md:block" />

                        </h1>

                        <p className="max-w-2xl mx-auto text-md text-slate-500 leading-relaxed mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            Access our world-class courses designed to bridge the gap between academic theory and practical industry excellence.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <GraduationCap className="w-5 h-5 text-indigo-600" />
                                <span className="text-sm font-bold text-slate-700">{courses.length}+ Courses</span>
                            </div>
                            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <span className="text-sm font-bold text-slate-700">Lifetime Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FILTER & SEARCH HUD --- */}
            <div className="sticky top-20 z-40 px-4 mb-12">
                <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[1.2rem] md:rounded-[2.2rem] p-2 transition-all duration-500 hover:shadow-[0_20px_48px_rgba(79,70,229,0.1)]">
                    <div className="flex flex-col lg:flex-row items-center gap-3">

                        {/* Search Input Container */}
                        <div className="relative flex-1 w-full lg:w-auto">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-indigo-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-14 pr-6 py-2 bg-slate-50/50 border-none rounded-full text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-base font-medium"
                                placeholder="Search our premium catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filters Group */}
                        <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto lg:pr-2">
                            {/* Category Filter */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-400">
                                    <Filter className="w-4 h-4" />
                                </div>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="appearance-none bg-slate-50 hover:bg-white border-none text-slate-700 py-2 pl-10 pr-10 rounded-full text-sm font-bold cursor-pointer focus:ring-2 focus:ring-indigo-500/20 transition-all min-w-[160px]"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat === "All" ? "Categories" : cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
                            </div>

                            {/* Level Filter */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-400">
                                    <SlidersHorizontal className="w-4 h-4" />
                                </div>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="appearance-none bg-slate-50 hover:bg-white border-none text-slate-700 py-2 pl-10 pr-10 rounded-full text-sm font-bold cursor-pointer focus:ring-2 focus:ring-indigo-500/20 transition-all min-w-[160px]"
                                >
                                    <option value="All">All Levels</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- COURSE GRID SECTION --- */}
            <section className="pb-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-indigo-600" />
                                </div>
                            </div>
                            <p className="text-slate-500 font-bold tracking-widest text-xs uppercase">Curating the best content...</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-12 px-2">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Available Programs
                                    <span className="ml-3 text-sm font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{filteredCourses.length}</span>
                                </h2>
                                <div className="flex gap-2">
                                    {/* Additional view toggles could go here */}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, index) => (
                                        <div
                                            key={course._id}
                                            className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <CourseCard course={course} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-24 text-center">
                                        <div className="bg-white w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/5 rotate-3 border border-slate-50">
                                            <Search className="w-10 h-10 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No programs found</h3>
                                        <p className="text-slate-500 max-w-sm mx-auto mb-10">We couldn't find any courses matching your specific criteria. Try adjusting your filters.</p>
                                        <button
                                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedLevel("All") }}
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-200 active:scale-95"
                                        >
                                            Reset All Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
