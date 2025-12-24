"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing modern icons

// Array of navigation items for cleaner mapping
const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Toggle function for mobile menu
  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-[1.02]">
          Vidya<span className="text-indigo-600">-Setu</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 font-medium text-lg relative group transition-colors duration-200 hover:text-indigo-600"
            >
              {item.name}
              {/* Impressive Underline Effect */}
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
          {/* Call-to-Action Button */}
          <button className="ml-4 py-2 px-6 text-white font-semibold bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
            <Link href={"/register"}>Get Started</Link>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Use conditional classes for smooth transition and better visual */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-96 opacity-100 py-2 border-b border-gray-100 shadow-xl" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <div className="px-4 sm:px-6 space-y-3 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMenu} // Close menu on link click
              className="text-gray-700 font-medium text-lg py-2 hover:bg-indigo-50/50 px-3 rounded-lg transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
          {/* Mobile CTA */}
          <button className="mt-2 w-full py-2 px-6 text-white font-semibold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}