"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";

export default function FinalCTA() {
    return (
        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Blob/Flare for premium feel */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-50/50 rounded-full blur-[100px] opacity-50 -ml-20 -mt-20 animate-pulse-slow"></div>

            <motion.div
                className="max-w-4xl mx-auto px-4 text-center z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight">
                    Ready to achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">The Apex?</span>
                </h2>
                <p className="text-slate-600 mb-12 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Limited spots are available for the next cohort. Secure your place and start your career acceleration journey today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-5">

                    {/* Primary Button */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <PrimaryButton
                            href="/application"
                            className="h-16 px-12 rounded-2xl shadow-2xl shadow-purple-600/40 border-2 border-purple-600 text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all flex items-center gap-2"
                        >
                            Request Invite Now
                            <ArrowRight className="w-5 h-5" />
                        </PrimaryButton>
                    </motion.div>

                    {/* Secondary Button */}
                    <motion.a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-16 px-10 rounded-2xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-slate-200/50 group gap-2"
                    >
                        <MessageCircle className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
                        Connect on WhatsApp
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}