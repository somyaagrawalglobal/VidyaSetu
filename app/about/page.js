"use client";

import Image from "next/image";
import { Eye, Target, CheckCircle, Award, Users, Lightbulb } from "lucide-react";

export default function About() {
    // Custom classes for consistent brand colors
    const primaryColor = 'indigo-600';
    const secondaryColor = 'violet-500';
    const gradientTextClass = `bg-clip-text text-transparent bg-gradient-to-r from-${primaryColor} to-${secondaryColor}`;

    return (
        <main className="text-slate-800">

            {/* 1. Header - Clean & Focused */}
            <section className={`pt-36 relative overflow-hidden bg-gradient-to-b from-white to-indigo-50/50 border-b border-indigo-100`}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className={`text-xl font-semibold mb-3 text-${primaryColor}`} data-aos="fade-down">
                        Our Story, Our Purpose
                    </p>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6" data-aos="fade-down" data-aos-delay="100">
                        The Vidya-<span className={gradientTextClass}>Setu</span> Difference
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                        Empowering the next generation with real skills for real careers. We are committed to building the bridge between academic potential and industry success.
                    </p>
                </div>
            </section>

            {/* 2. Vision & Mission - Dedicated Section with Clean Blocks */}
            <section className="py-28 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Vision Block */}
                        <div className="bg-white p-10 lg:p-12 rounded-2xl shadow-2xl shadow-indigo-100/50 border border-indigo-100 h-full" data-aos="fade-right">
                            <div className={`w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-${primaryColor} border-4 border-indigo-100`}>
                                <Eye className="w-8 h-8" />
                            </div>

                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Vision</h2>

                            <p className="text-slate-600 leading-relaxed text-lg">
                                To build an outcome-driven ed-tech platform where learners do not
                                just gain certificates, but **real skills, real experience,** and
                                real career opportunities through structured learning and
                                guaranteed On-the-Job Training.
                            </p>
                        </div>

                        {/* Mission Block */}
                        <div className="bg-white p-10 lg:p-12 rounded-2xl shadow-2xl shadow-purple-100/50 border border-purple-100 h-full" data-aos="fade-left">
                            <div className={`w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600 border-4 border-purple-100`}>
                                <Target className="w-8 h-8" />
                            </div>

                            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Mission</h2>

                            <ul className="space-y-4 text-slate-600 text-lg">
                                <li className="flex items-start">
                                    <CheckCircle className={`w-6 h-6 text-${primaryColor} flex-shrink-0 mr-3 mt-1`} />
                                    Bridge the critical gap between academic training and industry demands.
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className={`w-6 h-6 text-${primaryColor} flex-shrink-0 mr-3 mt-1`} />
                                    Provide a project-based ecosystem that fosters job-aligned capability.
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className={`w-6 h-6 text-${primaryColor} flex-shrink-0 mr-3 mt-1`} />
                                    Enable students and companies to grow together through effective skill transfer.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Founder Story - Modern Two-Column Layout */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-16">

                        {/* Content */}
                        <div className="md:w-1/2 md:order-2" data-aos="fade-left">
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
                                Meet the <span className={gradientTextClass}>Founder</span>
                            </h2>

                            <h3 className="text-2xl font-bold mb-4 text-slate-800">
                                Somya Agrawal
                            </h3>
                            <p className={`text-sm font-semibold mb-6 text-${primaryColor} uppercase tracking-widest`}>
                                Founder & CEO, Vidya-Setu
                            </p>

                            <p className="text-slate-600 mb-6 leading-relaxed text-lg border-l-4 border-indigo-200 pl-4">
                                Somya identified a critical gap: students were graduating with
                                degrees but without immediate employability. The traditional model
                                focused on certification, neglecting real-world capability.
                            </p>

                            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                                Driven by a vision to change this, she founded Vidya-Setu.
                                Her goal is to create a single, seamless ecosystem where learning meets
                                practice, and verified practice leads directly to hiring.
                            </p>

                            <div className={`bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-inner`}>
                                <p className="italic text-slate-700 text-lg">
                                    "We are building a future where your skills define your worth,
                                    not just your degree."
                                </p>
                            </div>
                        </div>

                        {/* Image - Clean Profile Look */}
                        <div className="md:w-1/2 md:order-1" data-aos="fade-right">
                            <div className="relative w-full h-[550px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.01] transition duration-500">
                                <Image
                                    src="/assets/images/founder-profile2.jpg"
                                    alt="Somya Agrawal, Founder of Vidya-Setu"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="object-top filter grayscale hover:grayscale-0 transition duration-700"
                                    priority
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. Core Values - Modern Icon-Based Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center" data-aos="fade-up">
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-12">Our Guiding Principles</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <ValueCard
                            Icon={Award}
                            title="Excellence"
                            description="Committing to the highest standards of quality in education, mentorship, and project delivery."
                            color="indigo"
                        />
                        <ValueCard
                            Icon={Users}
                            title="Community"
                            description="Fostering a supportive ecosystem where learners and industry partners grow together."
                            color="purple"
                        />
                        <ValueCard
                            Icon={Lightbulb}
                            title="Innovation"
                            description="Constantly updating our curriculum to reflect the latest tools and trends in technology."
                            color="teal"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

// Helper Component for Core Values
const ValueCard = ({ Icon, title, description, color }) => {
    let iconClasses = '';
    let textClasses = '';

    if (color === 'indigo') {
        iconClasses = 'bg-indigo-100 text-indigo-600';
        textClasses = 'text-indigo-600';
    } else if (color === 'purple') {
        iconClasses = 'bg-purple-100 text-purple-600';
        textClasses = 'text-purple-600';
    } else if (color === 'teal') {
        iconClasses = 'bg-teal-100 text-teal-600';
        textClasses = 'text-teal-600';
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full transition duration-300 hover:shadow-2xl hover:border-gray-300">
            <div className={`w-16 h-16 ${iconClasses} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <Icon className="w-8 h-8" />
            </div>
            <h3 className={`text-xl font-bold mb-3 ${textClasses}`}>{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    );
};