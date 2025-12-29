"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard, Settings } from "lucide-react";
import { useAuth } from "./AuthProvider";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setOpen(false);
  };

  return (
    // UI Improvement 1: Add backdrop-blur and a subtle shadow for a modern "glassy" sticky effect
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18"> {/* Increased height slightly */}

          {/* Logo Section - UI Improvement 2: Refine logo container and size */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="relative w-15 h-15 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-105">
                <Image
                  src="/assets/images/brand-logo.png"
                  alt="Vidya-Setu Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Vidya<span className="text-indigo-600 font-bold">-Setu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href));

              // Refined active link styling (using a slightly bolder look)
              const linkClasses = isActive
                ? "px-4 py-2 text-base font-bold text-indigo-700 bg-indigo-100 rounded-full transition-all duration-200"
                : "px-4 py-2 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200";

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={linkClasses}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="h-6 w-px bg-slate-200 mx-4" />

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={profileRef}>
                {/* UI Improvement 3: Polished Profile Button */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 py-1.5 pl-1 pr-3 rounded-full border transition-all duration-200 
                    ${profileOpen
                      ? "bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200 shadow-md"
                      : "border-gray-200 hover:bg-slate-50"
                    }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-300/50">
                    <span className="text-sm font-bold">{user.firstName?.charAt(0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-slate-800 hidden lg:inline">{user.firstName}</span>
                    <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu (Minor class update for elevation/modernization) */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">

                    {/* User Header in Dropdown */}
                    <div className="px-5 py-4 bg-indigo-50/50 border-b border-indigo-100">
                      <p className="text-sm font-extrabold text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-indigo-700 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User size={16} />
                        My Profile
                      </Link>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard size={16} />
                        {/* Logic unchanged */}
                        {user.roles.includes('Admin') ? 'Admin Dashboard' :
                          user.roles.includes('Instructor') ? 'Instructor Console' : 'Student Dashboard'}
                      </Link>
                    </div>

                    <div className="p-2 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // UI Improvement 4: Use the premium button style for Get Started
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 text-base font-semibold text-white bg-indigo-600 rounded-full shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition-all duration-200 active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button (No major change needed, already clean) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Minor class update for better mobile separation) */}
      <div
        className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[600px] opacity-100 shadow-xl" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href));

            // Mobile link styling consistency
            const mobileLinkClasses = isActive
              ? "block px-4 py-3 text-base font-bold text-indigo-700 bg-indigo-100 rounded-xl transition-colors"
              : "block px-4 py-3 text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors";

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={toggleMenu}
                className={mobileLinkClasses}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Auth Sections for Mobile */}
          {user ? (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-4 px-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {user.firstName[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-indigo-50 rounded-xl hover:text-indigo-600"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-indigo-50 rounded-xl hover:text-indigo-600"
                >
                  <Settings size={18} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl text-left"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            // Mobile Auth Buttons (Style unified)
            <div className="mt-6 pt-6 border-t border-slate-200 px-4 space-y-3">
              <Link
                href="/login"
                onClick={toggleMenu}
                className="block w-full py-3 text-center text-base font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={toggleMenu}
                className="block w-full py-3 text-center text-base font-semibold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}