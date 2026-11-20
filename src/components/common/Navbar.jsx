import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router"; // react-router থেকে সরাসরি ইমপোর্ট
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../../features/auth/authSlice.js";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // প্রোফাইল ড্রপডাউনের বাইরে ক্লিক শনাক্ত করার জন্য Ref
  const profileDropdownRef = useRef(null);

  // বাইরে ক্লিক করলে প্রোফাইল ড্রপডাউন বন্ধ করার ফাংশন
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // লগআউট ফাংশন (আপনার Redux slice অনুযায়ী logout অ্যাকশনটি ইম্পোর্ট করে নেবেন)
  const handleLogout = async () => {
    try {
      // লগআউট চলাকালীন লোডিং, সফল হলে সাকসেস এবং ব্যর্থ হলে এরর টোস্ট দেখাবে
      await toast.promise(dispatch(logoutUser()).unwrap(), {
        loading: "Logging out...",
        success: (res) => res?.message || "Logged out successfully!",
        error: (err) =>
          err?.message || err || "Logout failed. Please try again.",
      });
      // মেনু ও ড্রপডাউন বন্ধ করবে
      setIsProfileOpen(false);
      setIsOpen(false);
      // লগআউট সফল হলে লগইন পেজে নিয়ে যাবে (চাইলে "/" ও দিতে পারেন)
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsProfileOpen(false);
                }}
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

            {isAuthenticated ? (
              <div className="relative">
                {/* প্রোফাইল ট্রিগার বাটন */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen((prev) => !prev);
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center space-x-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 px-3 py-1.5 rounded-xl transition-all duration-200 focus:outline-none"
                >
                  {/* প্রোফাইল পিকচার (ছবি না থাকলে নামের প্রথম অক্ষর দেখাবে) */}
                  {user?.avatar || user?.photoURL || user?.image ? (
                    <img
                      src={user?.avatar || user?.photoURL || user?.image}
                      alt={user?.name || "User"}
                      className="h-8 w-8 rounded-full object-cover border border-cyan-400"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}

                  {/* ইউজারের নাম */}
                  <span className="text-slate-200 font-medium text-sm max-w-[120px] truncate">
                    {user?.name?.trim().split(" ")[0]?.toUpperCase() ||
                      "Profile"}
                  </span>

                  {/* ড্রপডাউন আইকন */}
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>

                {/* ড্রপডাউন মেনু */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2.5 w-48 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl shadow-black/50 py-1.5 z-50">
                    {/* প্রোফাইল মেনু */}
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>

                    <div className="my-1 border-t border-slate-800"></div>

                    {/* লগআউট মেনু */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all duration-200"
                state={{ from: location }}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
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
          <NavLink
            to="/profile"
            className="flex items-center space-x-2.5 px-4 py-2.5"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </NavLink>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between px-4">
            <button className="flex items-center space-x-2 text-slate-400 hover:text-white">
              <Bell className="h-6 w-6" />
              <span>Notifications</span>
            </button>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-1/2 flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white p-3 rounded-xl font-medium transition-all duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="w-1/2 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-xl font-medium"
                onClick={() => setIsOpen(false)}
                state={{ from: location }}
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
