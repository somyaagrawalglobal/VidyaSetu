import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, GraduationCap, Briefcase, CheckCircle, Clock, MessageCircle } from "lucide-react";
// Assuming these are external components now
import FeaturedProgramsSection from "@/components/FeatureProgram";
import PrimaryButton from "@/components/PrimaryButton";
// Note: Remove the old AnimateOnLoad import if you were using it

export default function Home() {
  return (
    <>
      <main>
        {/* 1. HERO SECTION (Fades in immediately) */}
        <section 
          className="relative pt-32 pb-24 overflow-hidden bg-white/95"
          data-aos="fade" // Simple fade-in for the whole section
          data-aos-duration="1000"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 z-10">
              {/* Staggered text animation */}
              <span 
                className="inline-flex items-center py-2 px-4 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 shadow-sm border border-indigo-100"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <Zap className="w-4 h-4 mr-2" />
                Launch Your High-Value Career
              </span>

              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Learn Real Skills.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Get Real Jobs.
                </span>
              </h1>

              <p 
                className="text-xl text-slate-600 mb-10 max-w-lg"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                The gap between education and employment ends here. Master
                outcome-driven skills with guaranteed{" "}
                <strong className="text-slate-900 font-extrabold">On-the-Job Training</strong>.
              </p>

              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                {/* Note: PrimaryButton should handle its own hover animation (transform/shadow) */}
                <PrimaryButton href="/courses">
                  Explore Programs <ArrowRight className="w-5 h-5" />
                </PrimaryButton>
                <a
                  href="#how-it-works"
                  className="px-10 py-4 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
                >
                  How it Works
                </a>
              </div>
            </div>

            <div 
              className="md:w-1/2 relative flex justify-center"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden ring-4 ring-indigo-50/50">
                <Image
                  src="/assets/hero-img.jpeg"
                  alt="Students collaborating and learning in a modern environment"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. BRIDGE SECTION (How It Works) */}
        <section id="how-it-works" className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="text-center mb-16"
              data-aos="fade-up"
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800">
                The <span className="text-indigo-600">Bridge Method</span>
              </h2>
              <p className="text-xl text-slate-500 mt-3">Your structured timeline from novice to a career-ready professional.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-[52px] left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-indigo-200/50"></div>

              {/* Step 1 */}
              <div 
                className="p-8 border border-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white text-center relative pt-16 group transform hover:-translate-y-1"
                data-aos="fade-right"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-2">Phase One</p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Learn Core Skills</h3>
                <p className="text-slate-500">Master industry tools via live mentorship and project-based modules.</p>
              </div>

              {/* Step 2 */}
              <div 
                className="p-8 border border-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white text-center relative pt-16 group transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  <Briefcase className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-2">Phase Two</p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Real Practice (OJT)</h3>
                <p className="text-slate-500">Join live company projects and guaranteed On-the-Job Training simulations.</p>
              </div>

              {/* Step 3 */}
              <div 
                className="p-8 border border-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white text-center relative pt-16 group transform hover:-translate-y-1"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-indigo-600 mb-2">Phase Three</p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Get Hired</h3>
                <p className="text-slate-500">Receive personalized portfolio reviews and direct referrals to partner companies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROGRAMS SECTION (Assuming this external component handles its own cards' animations) */}
        <div data-aos="fade-up" data-aos-delay="200">
            <FeaturedProgramsSection />
        </div>

        {/* 4. WHY SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
            
            <div data-aos="fade-right" data-aos-delay="100">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
                Why Choose <span className="text-indigo-600">Vidya-Setu?</span>
              </h2>
              <ul className="space-y-6 text-xl text-slate-700">
                {/* Individual list item animation */}
                <li className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="200">
                  <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <p>
                    <strong className="font-semibold text-gray-800">Outcome-Driven:</strong> Every module is designed to solve real-world business problems.
                  </p>
                </li>
                <li className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="300">
                  <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <p>
                    <strong className="font-semibold text-gray-800">Trainer-First Marketplace:</strong> Learn directly from industry veterans and domain experts.
                  </p>
                </li>
                <li className="flex items-start gap-3" data-aos="fade-up" data-aos-delay="400">
                  <CheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <p>
                    <strong className="font-semibold text-gray-800">Guaranteed Internships:</strong> Walk straight into On-the-Job Training with our partner network.
                  </p>
                </li>
              </ul>
            </div>

            <div 
              className="relative w-full aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden"
              data-aos="zoom-in-left"
              data-aos-delay="200"
            >
              <Image
                src="/assets/hero2-img.jpeg"
                alt="Team discussing project on a modern whiteboard"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* 5. FOUNDER SECTION */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="bg-indigo-600 p-12 lg:p-16 rounded-3xl shadow-2xl shadow-indigo-600/30 transition-transform duration-300 hover:scale-[1.01] hover:shadow-indigo-600/50"
              data-aos="flip-up"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center text-white">
                <Image
                  src="/assets/founder-profile.jpg"
                  alt="Somya Agrawal, Founder of Vidya-Setu"
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white/50 flex-shrink-0 object-cover w-40 h-40 transition-transform duration-300 hover:rotate-2"
                />

                <div data-aos="fade-left" data-aos-delay="300">
                  <p className="uppercase text-indigo-200 font-bold text-sm tracking-widest mb-2">Meet the Founder</p>
                  <blockquote className="text-2xl font-semibold italic border-l-4 border-white pl-4">
                    "Real experience is the currency of the modern job market. Vidya-Setu is the bridge to that value."
                  </blockquote>
                  <p className="text-lg font-bold mt-4">Somya Agrawal</p>
                  <p className="text-indigo-200">CEO & Founder, Vidya-Setu</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CTA (Final Conversion Block) */}
        <section 
          className="py-24 text-center bg-white"
          data-aos="fade-in"
          data-aos-offset="50" // Trigger animation sooner
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6" data-aos="fade-up">
              Ready to <span className="text-indigo-600">Level Up?</span>
            </h2>
            <p className="text-xl text-slate-600 mb-10" data-aos="fade-up" data-aos-delay="100">
              Join the ecosystem where skills meet opportunity. Your future starts now.
            </p>

            <div className="flex justify-center flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="200">
              <PrimaryButton href="/contact">
                Start Your Journey Today
              </PrimaryButton>
              <a
                href="https://wa.me/"
                className="px-10 py-4 border border-green-500 text-green-600 rounded-full font-bold hover:bg-green-50 transition-colors duration-300 flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />  Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}