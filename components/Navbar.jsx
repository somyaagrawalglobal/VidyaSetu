"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, ChevronDown, LayoutDashboard, Settings, BookOpen } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  const pathname = usePathname();

  const toggleMenu = () => setOpen(!open);

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

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm py-2"
        : "bg-transparent py-4 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 relative flex items-center justify-center rounded-xl text-white font-bold shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0  rounded-xl opacity-100"></div>
                <Image
                  src="/assets/images/brand-logo.png"
                  alt="Brand Logo"
                  width={600}
                  height={700}
                  className="object-cover transition-all duration-1000 scale-100 group-hover:scale-105"
                />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                Vidya<span className="text-indigo-600">Setu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = item.href === pathname || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative py-2 text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"}
                    
                    after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-600 
                    after:transition-transform after:duration-300 after:ease-in-out
                    ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                  `}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="h-6 w-px bg-slate-200 mx-2" />

            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2 py-1 pl-1 pr-3 rounded-full border transition-all duration-200 
                    ${profileOpen
                      ? "bg-white border-indigo-200 shadow-md ring-2 ring-indigo-50"
                      : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.firstName?.charAt(0)}
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200 border border-slate-100 p-2 z-50">
                    <div className="px-4 py-3 mb-2">
                      <p className="text-sm font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard size={16} className="text-slate-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <Settings size={16} className="text-slate-400" />
                      Account Settings
                    </Link>

                    <div className="border-t border-slate-100 my-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 ease-in-out origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
      >
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleMenu}
              className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${item.href === pathname
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50"
                }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
            {user ? (
              <>
                <Link href="/dashboard" onClick={toggleMenu} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <Settings size={16} />
                  Account Settings
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl">
                  <LogOut size={18} /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={toggleMenu} className="block w-full py-3 text-center text-sm font-bold text-slate-700 bg-slate-50 rounded-xl">Log in</Link>
                <Link href="/register" onClick={toggleMenu} className="block w-full py-3 text-center text-sm font-bold text-white bg-indigo-600 rounded-xl">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}