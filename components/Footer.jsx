import Link from "next/link";
import { Instagram, Linkedin, Mail, Send } from "lucide-react";

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
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    // { name: "Refund Policy", href: "/refund-policy" },
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

        {/* --- MAIN GRID LAYOUT (Responsive Columns) --- */}
        {/* Mobile: 2 columns (2x2) | Tablet (md): 4 columns | Desktop (lg): 6 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16">

          {/* 1. Brand & Contact (Takes 2/6 on desktop, 4/4 on tablet, 2/2 on mobile/stacked) */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            {/* Title size is consistent */}
            <Link href="/" className="text-3xl sm:text-4xl font-extrabold text-white block tracking-tight transition-colors hover:text-indigo-300">
              Vidya<span className="text-indigo-400">-Setu</span>
            </Link>
            <p className="text-sm sm:text-base leading-relaxed max-w-sm text-slate-300">
              Bridging the gap between education and employability. Master real skills, land real jobs.
            </p>

            {/* Contact Info (Grouped) */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <a href="mailto:info@vidya-setu.com" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                  info@vidya-setu.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
                <a href="https://chat.whatsapp.com/JYFLAGoLN9pDGn8iMwCRDc" target="_blank" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                  VidyaSetu
                </a>
              </div>
            </div>
          </div>

          {/* 2. Explore Links (Takes 1 column) */}
          <div className="col-span-1">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.Explore.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal Links (Takes 1 column) */}
          <div className="col-span-1">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.Legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter Sign-up & Social Icons (Takes 2/6 on desktop, 4/4 on tablet, 2/2 on mobile/stacked) */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider uppercase">Stay Updated</h4>
            <p className="text-sm mb-4">
              Get the latest industry insights and program updates delivered to your inbox.
            </p>

            {/* Social Icons - Increased Size and better focus on the hover effect */}
            <div className="flex space-x-6 pt-2">
              <a
                href="https://www.instagram.com/vidyasetu2026/"
                className={`p-2 rounded-full bg-slate-800 ${ACCENT_COLOR_CLASSES} hover:bg-indigo-900/50 transform hover:scale-110 transition-all duration-300`}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/vidya-setu"
                className={`p-2 rounded-full bg-slate-800 ${ACCENT_COLOR_CLASSES} hover:bg-indigo-900/50 transform hover:scale-110 transition-all duration-300`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        {/* --- BOTTOM ROW: Copyright & Bottom Separator (Improved Layout) --- */}
        <div className="border-t border-slate-700 pt-5 pb-8">
          {/* Default to stack (flex-col) on mobile, spread out (sm:flex-row justify-between) on larger screens */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-slate-500">
            <p className="order-2 sm:order-1 mt-4 sm:mt-0">
              &copy; {currentYear} Vidya-Setu. All rights reserved.
            </p>
            {/* You could optionally add a small bottom nav here for mobile if needed, e.g., */}
            <div className="order-1 sm:order-2 flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}