import React, { useState } from "react";
import { NavLink, Link } from "react-router"; // react-router থেকে সরাসরি ইমপোর্ট
import { Menu, X, ChevronDown, Bell, User, ShoppingBag } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // NavLink এর জন্য কমন স্টাইলিং ফাংশন
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-cyan-400 font-semibold transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-cyan-400"
      : "text-slate-300 hover:text-white transition-colors duration-300";

  const mobileNavLinkStyles = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-xl bg-slate-800 text-cyan-400 font-medium"
      : "block px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors";

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* ১. লোগো সেকশন */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-md shadow-cyan-500/20">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              NEXUS
            </span>
          </Link>

          {/* ২. ডেস্কটপ মেনু আইটেম (বড় স্ক্রিনের জন্য) */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <NavLink to="/" className={navLinkStyles} end>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkStyles}>
              Products
            </NavLink>

            {/* ক্যাটাগরি ড্রপডাউন মেনু */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors duration-300 focus:outline-none"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`h-4 w-4 transform transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-3 w-48 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-2 z-50 transition-all duration-200">
                  <Link
                    to="/categories/electronics"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/categories/fashion"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/categories/gadgets"
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Gadgets
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/about" className={navLinkStyles}>
              About
            </NavLink>
          </div>

          {/* ৩. রাইট সাইড অ্যাকশন বাটন (ডেস্কটপ) */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-slate-900"></span>
            </button>

            <Link
              to="/login"
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>

          {/* ৪. মোবাইল মেনু টগল বাটন (Hamburger) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 ৫. মোবাইল রেস্পন্সিভ ড্রয়ার মেনু (মোবাইলের জন্য) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 bg-slate-900 border-t border-slate-800 shadow-inner">
          <NavLink
            to="/"
            className={mobileNavLinkStyles}
            end
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>

          {/* মোবাইল ড্রপডাউন সাব-মেনু */}
          <div className="px-4 py-2 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Categories
            </p>
            <Link
              to="/categories/electronics"
              className="block pl-4 py-2 text-slate-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Electronics
            </Link>
            <Link
              to="/categories/fashion"
              className="block pl-4 py-2 text-slate-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Fashion
            </Link>
          </div>

          <NavLink
            to="/about"
            className={mobileNavLinkStyles}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-4">
            <button className="flex items-center space-x-2 text-slate-400 hover:text-white">
              <Bell className="h-6 w-6" />
              <span>Notifications</span>
            </button>
            <Link
              to="/login"
              className="w-1/2 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl font-medium"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
