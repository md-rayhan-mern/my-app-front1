import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  Bell,
  User,
  ShoppingBag,
  LogOut,
  Gauge,
  LayoutGrid,
  Home,
  SquarePen,
  Package,
  Info,
  MoreVertical,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logoutUser } from "../../features/auth/authSlice.js";
import MessengerDrawer from "./MessengerDrawer.jsx";
import NotificationDropdown from "./NotificationWidget/NotificationDropdown.jsx";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "New Order Confirmed!",
      description:
        "Your order #NX-1042 has been confirmed and is being packed.",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "Ariful Islam commented on your post",
      description: "“Brother, is the gadget still available for delivery?”",
      time: "28 mins ago",
      read: false,
    },
    {
      id: 3,
      type: "promo",
      title: "Flash Sale 30% Off!",
      description: "Grab your favorite electronics before midnight tonight.",
      time: "2 hours ago",
      read: true,
    },
  ]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const profileDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const mobileCatRef = useRef(null);
  const threeDotRef = useRef(null);
  const desktopNotifRef = useRef(null);
  const mobileNotifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileCatRef.current &&
        !mobileCatRef.current.contains(event.target)
      ) {
        setIsMobileCatOpen(false);
      }
      if (threeDotRef.current && !threeDotRef.current.contains(event.target)) {
        setIsThreeDotOpen(false);
      }
      const clickedDesktopNotif =
        desktopNotifRef.current &&
        desktopNotifRef.current.contains(event.target);
      const clickedMobileNotif =
        mobileNotifRef.current && mobileNotifRef.current.contains(event.target);

      if (!clickedDesktopNotif && !clickedMobileNotif) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Count the number of unread notifications
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Logout function (import the logout action according to your Redux slice)
  const handleLogout = async () => {
    try {
      // Logout function (import the logout action according to your Redux slice)
      await toast.promise(dispatch(logoutUser()).unwrap(), {
        loading: "Logging out...",
        success: (res) => res?.message || "Logged out successfully!",
        error: (err) =>
          err?.message || err || "Logout failed. Please try again.",
      });
      // Will close the menu and dropdown
      setIsProfileOpen(false);
      setIsThreeDotOpen(false);
      // Upon successful logout, you will be redirected to the login page (you can also specify "/" if you wish).
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  // Desktop Facebook-Style Compact Icon Tab Style
  const desktopTabStyles = ({ isActive }) =>
    `lg:w-16 xl:w-20 h-20 flex flex-col items-center justify-center text-[11px] font-medium transition-all duration-200 relative group ${
      isActive
        ? "text-cyan-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[3px] after:bg-cyan-400 after:rounded-t-full"
        : "text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl my-2 h-16"
    }`;

  // Facebook-style Mobile Horizontal Tab Style
  const mobileTabStyles = ({ isActive }) =>
    `flex-1 flex flex-col items-center justify-center py-2.5 text-[11px] font-medium transition-colors relative ${
      isActive
        ? "text-cyan-400 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2.5px] after:bg-cyan-400 after:rounded-t-full"
        : "text-slate-400 hover:text-slate-200"
    }`;

  return (
    <>
      {/* ... All the code inside your navbar... */}
      <nav className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 1. Logo Section */}
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

            {/* 2. Desktop menu items (Facebook-Style Icon Tabs) */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <NavLink to="/" className={desktopTabStyles} end title="Home">
                <Home className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" />
                <span>Feed</span>
              </NavLink>

              <NavLink to="/post" className={desktopTabStyles} title="Post">
                <SquarePen className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" />
                <span>Post</span>
              </NavLink>

              <NavLink
                to="/products"
                className={desktopTabStyles}
                title="Products"
              >
                <Package className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" />
                <span>Products</span>
              </NavLink>

              {/* Desktop Category Dropdown Tab */}
              <div className="relative" ref={categoryDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsProfileOpen(false);
                  }}
                  className={`w-24 h-[68px] my-1.5 rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 relative group focus:outline-none ${
                    isDropdownOpen
                      ? "text-cyan-400 bg-slate-800/80"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center space-x-0.5 mb-1">
                    <LayoutGrid className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </div>
                  <span>Categories</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-2 z-50">
                    <Link
                      to="/categories/electronics"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                    >
                      Electronics
                    </Link>
                    <Link
                      to="/categories/fashion"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                    >
                      Fashion
                    </Link>
                    <Link
                      to="/categories/gadgets"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700 hover:text-cyan-400 transition-colors"
                    >
                      Gadgets
                    </Link>
                  </div>
                )}
              </div>

              <NavLink to="/about" className={desktopTabStyles} title="About">
                <Info className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </NavLink>
            </div>

            {/* 3. Right-side action button (desktop) */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
              {/* Messenger Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please log in before sending a message!");
                      navigate("/login");
                      return;
                    }
                    setIsMessengerOpen(true);
                  }}
                  title="Messenger"
                  className="group relative p-2.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-transparent hover:border-cyan-500/50 transition-all duration-300"
                >
                  <MessageCircle className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300" />
                  {/* The count badge will be displayed only when logged in. */}
                  {isAuthenticated && (
                    <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                      2
                    </span>
                  )}
                </button>
              </div>
              {/* Bell Button */}
              <div className="relative" ref={desktopNotifRef}>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please log in to view notifications!");
                      navigate("/login");
                      return;
                    }
                    setIsNotifOpen((prev) => !prev);
                    setIsProfileOpen(false);
                    setIsDropdownOpen(false);
                    // setIsMessengerOpen(true);
                  }}
                  title="Notifications"
                  className="group relative p-2.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800/60 border border-transparent hover:border-cyan-500/50 transition-all duration-300"
                >
                  <Bell className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300" />
                  {/* The count badge will be displayed only when logged in. */}
                  {isAuthenticated && unreadNotifCount > 0 && (
                    <span className="absolute top-1 right-1 h-4 w-4 min-w-[18px] px-1 rounded-full bg-rose-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                      {unreadNotifCount > 99 ? "99+" : unreadNotifCount}
                    </span>
                  )}
                </button>
                {/* Notification Dropdown Box */}
                {isAuthenticated && (
                  <NotificationDropdown
                    isOpen={isNotifOpen}
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllRead={handleMarkAllRead}
                    onClose={() => setIsNotifOpen(false)}
                  />
                )}
              </div>
              {isAuthenticated ? (
                <div className="relative" ref={profileDropdownRef}>
                  {/* Profile Trigger Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen((prev) => !prev);
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center space-x-2.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 px-3 py-1.5 rounded-xl transition-all duration-200 focus:outline-none"
                  >
                    {/* Profile picture (if no image is available, the first letter of the name will be displayed ) */}
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
                    {/* Username */}
                    <span className="text-slate-200 font-medium text-sm max-w-[120px] truncate">
                      {user?.name?.trim().split(" ")[0]?.toUpperCase() ||
                        "Profile"}
                    </span>
                    {/* Dropdown icon */}
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>
                  {/* Dropdown menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2.5 w-48 bg-slate-900 border border-slate-700/80 rounded-xl shadow-xl shadow-black/50 py-1.5 z-50">
                      {/* Profile Menu */}
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      {/* Profile Menu */}
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                      >
                        <Gauge className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>

                      {/* Logout menu */}
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

            {/* 4. Mobile Top-Right Actions (Notification Bell + Three-Dot Menu) */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Messenger Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please log in before sending a message!");
                      navigate("/login");
                      return;
                    }
                    setIsMessengerOpen(true);
                  }}
                  title="Messenger"
                  className="relative p-2 rounded-full bg-slate-800/90 text-slate-300 active:scale-95 border border-slate-700/80 transition-transform"
                >
                  <MessageCircle className="h-5 w-5" />
                  {isAuthenticated && (
                    <span className="absolute top-0.5 -right-0.5 h-4 w-4  rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                      2
                    </span>
                  )}
                </button>
              </div>
              {/* Notification Bell */}
              <div className="relative" ref={mobileNotifRef}>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please log in to view notifications!");
                      navigate("/login");
                      return;
                    }
                    setIsNotifOpen((prev) => !prev);
                    setIsThreeDotOpen(false);
                    setIsMobileCatOpen(false);
                    // setIsMessengerOpen(true);
                  }}
                  title="Notifications"
                  className="relative p-2 rounded-full bg-slate-800/90 text-slate-300  border border-slate-700/80 transition-transform active:scale-95"
                >
                  <Bell className="h-5 w-5" />
                  {isAuthenticated && unreadNotifCount > 0 && (
                    <span className="absolute top-0.5 -right-0.5 h-4 w-4 min-w-[18px] px-1 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">
                      {unreadNotifCount > 99 ? "99+" : unreadNotifCount}
                    </span>
                  )}
                </button>
                {/* Mobile Notification Dropdown Box */}
                {isAuthenticated && (
                  <NotificationDropdown
                    isOpen={isNotifOpen}
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllRead={handleMarkAllRead}
                    onClose={() => setIsNotifOpen(false)}
                  />
                )}
              </div>
              {/* Three-Dot Dropdown Menu */}
              <div className="relative" ref={threeDotRef}>
                <button
                  onClick={() => {
                    setIsThreeDotOpen((prev) => !prev);
                    setIsMobileCatOpen(false);
                  }}
                  className="relative p-2 rounded-full bg-slate-800/90 text-slate-300   border border-slate-700/80 active:scale-95 transition-transform"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>

                {isThreeDotOpen && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/60 py-2 z-50">
                    {isAuthenticated ? (
                      <>
                        {/* User Info Header */}
                        <div className="px-4 py-2.5 border-b border-slate-800 flex items-center space-x-3">
                          {user?.avatar || user?.photoURL || user?.image ? (
                            <img
                              src={
                                user?.avatar || user?.photoURL || user?.image
                              }
                              alt={user?.name || "User"}
                              className="h-9 w-9 rounded-full object-cover border border-cyan-400"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                              {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {user?.email || "Member"}
                            </p>
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsThreeDotOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>

                        <Link
                          to="/dashboard"
                          onClick={() => setIsThreeDotOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <div className="px-3 py-1.5">
                        <Link
                          to="/login"
                          onClick={() => setIsThreeDotOpen(false)}
                          state={{ from: location }}
                          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 rounded-xl font-medium text-sm"
                        >
                          <User className="h-4 w-4" />
                          <span>Login / Register</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 5. FACEBOOK-STYLE MOBILE HORIZONTAL ICON BAR */}
        <div className="lg:hidden border-t border-slate-800/90 bg-slate-900/95">
          <div className="flex items-center justify-around px-1">
            <NavLink to="/" className={mobileTabStyles} end>
              <Home className="h-5 w-5 mb-0.5" />
              <span>Feed</span>
            </NavLink>

            <NavLink to="/post" className={mobileTabStyles}>
              <SquarePen className="h-5 w-5 mb-0.5" />
              <span>Post</span>
            </NavLink>

            <NavLink to="/products" className={mobileTabStyles}>
              <Package className="h-5 w-5 mb-0.5" />
              <span>Products</span>
            </NavLink>

            {/* Mobile Categories Popover */}
            <div className="relative flex-1" ref={mobileCatRef}>
              <button
                type="button"
                onClick={() => {
                  setIsMobileCatOpen((prev) => !prev);
                  setIsThreeDotOpen(false);
                }}
                className={`w-full flex flex-col items-center justify-center py-2.5 text-[11px] font-medium transition-colors ${
                  isMobileCatOpen
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <LayoutGrid className="h-5 w-5 mb-0.5" />
                <span>Categories</span>
              </button>

              {isMobileCatOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-1.5 z-50">
                  <Link
                    to="/categories/electronics"
                    onClick={() => setIsMobileCatOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/categories/fashion"
                    onClick={() => setIsMobileCatOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/categories/gadgets"
                    onClick={() => setIsMobileCatOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-cyan-400"
                  >
                    Gadgets
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/about" className={mobileTabStyles}>
              <Info className="h-5 w-5 mb-0.5" />
              <span>About</span>
            </NavLink>
          </div>
        </div>
      </nav>
      {/* Messenger Slide-over Side Panel */}
      <MessengerDrawer
        isOpen={isMessengerOpen}
        onClose={() => setIsMessengerOpen(false)}
      />
    </>
  );
};

export default Navbar;
