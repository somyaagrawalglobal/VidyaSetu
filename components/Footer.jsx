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
                <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.412c-1.935 0-3.83-.502-5.485-1.45L3 21l1.082-3.942C3.12 15.421 2.585 13.513 2.585 11.61c0-5.187 4.221-9.408 9.408-9.408 2.512 0 4.873.978 6.649 2.755a9.357 9.357 0 0 1 2.756 6.654c0 5.188-4.221 9.409-9.408 9.409m9.408-20.422C17.388 1.157 14.814.5 12.05.5 5.683.5.517 5.666.517 12.032c0 2.035.532 4.022 1.542 5.777L.5 23.5l5.882-1.542a11.47 11.47 0 0 0 5.669 1.493c6.366 0 11.533-5.166 11.533-11.532 0-3.104-1.201-6.023-3.382-8.204" />
                </svg>
                <a href="https://wa.me/919876543210" className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                  WhatsApp Channel
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
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}