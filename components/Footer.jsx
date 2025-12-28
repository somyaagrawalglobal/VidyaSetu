import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, Send } from "lucide-react";

// Define the accent color for better management
const ACCENT_COLOR_CLASSES = "text-indigo-400 hover:text-indigo-300 transition-colors duration-200";

// Define footer links for cleaner rendering
const footerLinks = {
  Explore: [
    { name: "Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "How it Works", href: "/#methodology" }, // Updated ID to match previous component
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 1. Footer Container: Darker background, border, and position relative for texture/gradient
    <footer className="bg-slate-900 text-slate-400 pt-16 border-t border-indigo-900/50 shadow-inner relative overflow-hidden">
      
      {/* Decorative Gradient Background Element */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,#1e1b4b_0%,transparent_50%)] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 mb-16">

          {/* 1. Brand & Contact (Larger Column on Desktop) */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="text-4xl font-extrabold text-white block tracking-tight">
              Vidya<span className="text-indigo-400">-Setu</span>
            </Link>
            <p className="text-base leading-relaxed max-w-sm text-slate-300">
              Bridging the gap between education and employability. Master real skills, land real jobs.
            </p>

            {/* Contact Info (Grouped) */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:info@vidya-setu.com" className="text-sm hover:text-white transition-colors">
                  info@vidya-setu.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* 2. Explore Links (Responsive: Col 1 on Mobile, Col 3 on Desktop) */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.Explore.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-base text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal Links (Responsive: Col 2 on Mobile, Col 4 on Desktop) */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.Legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-base text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter Sign-up & Social Icons (New CTA block) */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Stay Updated</h4>
            <p className="text-sm mb-4">
              Get the latest industry insights and program updates delivered to your inbox.
            </p>
            
            {/* Newsletter Form */}
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="w-full p-3 rounded-l-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-3 bg-indigo-600 rounded-r-lg text-white font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            {/* Social Icons - Increased Size and better focus on the hover effect */}
            <div className="flex space-x-6 pt-8">
              <a
                href="#"
                className={`p-2 rounded-full bg-slate-800 ${ACCENT_COLOR_CLASSES} hover:bg-indigo-900/50`}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/vidya-setu"
                className={`p-2 rounded-full bg-slate-800 ${ACCENT_COLOR_CLASSES} hover:bg-indigo-900/50`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Bottom Separator (Improved Layout) */}
        <div className="border-t border-slate-700 pt-5 pb-5">
          <div className="flex flex-col sm:flex-row justify-center items-center text-sm text-slate-500">
            <p className="order-2 sm:order-1 mt-4 sm:mt-0">
              &copy; {currentYear} Vidya-Setu. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}