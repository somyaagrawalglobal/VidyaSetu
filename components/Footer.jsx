import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

// Define the accent color for better management
const ACCENT_COLOR_CLASSES = "text-indigo-400 hover:text-indigo-300 transition-colors duration-200";

// Define footer links for cleaner rendering
const footerLinks = {
  Explore: [
    { name: "Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "How it Works", href: "/#how-it-works" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-indigo-900/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">

          {/* 1. Brand & Tagline */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="text-3xl font-extrabold text-white mb-4 block tracking-tight">
              Com<span className="text-indigo-400">-ED</span>
            </Link>
            <p className="text-base leading-relaxed max-w-sm">
              Bridging the gap between education and employability. Master real skills, land real jobs.
            </p>
            {/* Added Newsletter Sign-up for modern footers */}
            
          </div>

          {/* 2. Explore Links (Mapped for cleanliness) */}
          <div>
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.Explore.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal Links (Mapped for cleanliness) */}
          <div>
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider">Legal</h4>
            <ul className="space-y-4">
              {footerLinks.Legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors duration-200">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Connect/Contact Info */}
          <div>
            <h4 className="text-indigo-400 font-bold text-lg mb-6 tracking-wider">Connect</h4>
            <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <a href="mailto:info@vidya-setu.com" className="text-sm hover:text-white transition-colors">
                        info@vidya-setu.com
                    </a>
                </li>
                <li className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-indigo-400" />
                    <a href="tel:+1234567890" className="text-sm hover:text-white transition-colors">
                        +91 98765 43210
                    </a>
                </li>
            </ul>

            {/* Social Icons - Bigger and Accent-Colored */}
            <div className="flex space-x-6 mt-6">
              <a
                href="#"
                className={`${ACCENT_COLOR_CLASSES}`}
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className={`${ACCENT_COLOR_CLASSES}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Bottom Separator */}
        <div className="text-center text-sm text-slate-600 border-t border-slate-800 pt-8 mt-4">
          <p>
            &copy; {new Date().getFullYear()} Vidya-Setu. All rights reserved. | Built for the Future.
          </p>
        </div>
      </div>
    </footer>
  );
}