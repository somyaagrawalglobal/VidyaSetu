"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200/60 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              href="/" 
              className="flex items-center gap-2 group"
            >
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Vidya<span className="text-indigo-600">-Setu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200 mx-4" />

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-3 py-1.5 pl-2 pr-3 rounded-full border transition-all duration-200 ${
                    profileOpen 
                      ? "bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100" 
                      : "border-transparent hover:bg-slate-100"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <span className="text-xs font-bold">{user.firstName?.charAt(0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-700">{user.firstName}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                    
                    {/* User Header in Dropdown */}
                    <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="p-2 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User size={16} />
                        My Profile
                      </Link>
                      
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard size={16} />
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
              <div className="flex items-center gap-4">
                 <Link 
                   href="/login"
                   className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                 >
                   Log in
                 </Link>
                 <Link 
                   href="/register"
                   className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
                 >
                   Get Started
                 </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMenu}
              className="block px-4 py-3 text-base font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4 px-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm">
                  {user.firstName[0]}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
                >
                  <Settings size={18} />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl text-left"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-slate-100 px-4 space-y-3">
              <Link 
                href="/login" 
                onClick={toggleMenu}
                className="block w-full py-3 text-center text-sm font-semibold text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link 
                href="/register" 
                onClick={toggleMenu}
                className="block w-full py-3 text-center text-sm font-semibold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200"
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