"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
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
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight transition-transform duration-300 hover:scale-[1.02]">
          {/* Vidya<span className="text-indigo-600">-Setu</span> */}
          COM<span className="text-indigo-600">-ED</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 font-medium text-md relative group transition-colors duration-200 hover:text-indigo-600"
            >
              {item.name}
              <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}

          {/* Auth Section */}
          {user ? (
            <div className="relative ml-4" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <User size={18} />
                </div>
                <span>{user.firstName}</span>
                <ChevronDown size={16} className={`transform transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User size={16} />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="ml-4 py-2 px-6 text-white font-semibold bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
              <Link href={"/login"}>Get Started</Link>
            </button>
          )}

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
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-[500px] opacity-100 py-2 border-b border-gray-100 shadow-xl" : "max-h-0 opacity-0"
          } bg-white`}
      >
        <div className="px-4 sm:px-6 space-y-3 flex flex-col pb-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMenu}
              className="text-gray-700 font-medium text-lg py-2 hover:bg-indigo-50/50 px-3 rounded-lg transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}

          {user ? (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="px-3 py-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {user.firstName[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={toggleMenu}
                className="flex items-center gap-2 text-gray-700 font-medium text-lg py-2 hover:bg-indigo-50/50 px-3 rounded-lg transition-colors duration-200"
              >
                <User size={18} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-red-600 font-medium text-lg py-2 hover:bg-red-50 px-3 rounded-lg transition-colors duration-200 text-left"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          ) : (
            <button className="mt-2 w-full py-2 px-6 text-white font-semibold bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200">
              <Link href={"/login"} onClick={toggleMenu} className="block w-full h-full">Get Started</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}