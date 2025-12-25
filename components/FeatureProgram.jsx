import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import {courses} from "../data/courses"
import ProgramBadge from "./ProgramBadge";

export default function FeaturedProgramsSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div className="text-left">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Featured <span className="text-indigo-600">Programs</span>
                        </h2>
                        <p className="text-lg text-gray-600 mt-2">
                            Select your path to a new career.
                        </p>
                    </div>
                    <Link
                        href="/courses"
                        className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center transition-colors"
                    >
                        View all pipelines <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.slice(0,3).map((program, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                        >
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={program.image}
                                    alt={program.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="group-hover:opacity-95 transition-opacity duration-300"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {program.badge && <ProgramBadge {...program.badge} />}
                            </div>
                            <div className="p-6 pb-2">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {program.title}
                                </h3>
                                <p className="text-gray-600 text-base min-h-[4rem]">
                                    {program.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 mt-2">
                                <div className="flex items-center text-sm text-gray-500 font-medium">
                                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                                    {program.duration}
                                </div>
                                <Link
                                    href={program.id}
                                    className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 transform group-hover:scale-105"
                                    aria-label={`View details for ${program.title}`}
                                >
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}