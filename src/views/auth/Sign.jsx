import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router";
import { registerUser } from "../../features/auth/authSlice.js";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Redux থেকে loading স্টেট নেওয়া হলো
  const { loading } = useSelector((state) => state.auth);
  // ইউজার যেই পেইজ থেকে এসেছে সেই পাথ ধরা (না থাকলে ডিফল্ট "/")
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: {
      addressType: "home", // ডিফল্ট সিলেক্টেড
      addressText: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "addressType" || name === "addressText") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // বেসিক ভ্যালিডেশন চেক
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.address.addressText
    ) {
      toast.error("Please fill in all fields correctly!");
      return;
    }
    console.log(formData);
    // সফল সাইনআপ টোস্ট
    try {
      await toast.promise(dispatch(registerUser(formData)).unwrap(), {
        loading: "Logging in...",
        // ব্যাকএন্ডের রেসপন্স অবজেক্ট থেকে message প্রপার্টিটি নেবে
        success: (res) => res?.message || "Signup successful! front",
        error: (err) => err?.message || err || "Signup failed! front",
      });
      // সাইনআপ সফল হলে ইউজার যেই পেইজ থেকে এসেছিল সেখানেই নিয়ে যাবে
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <div
      className="flex min-h-[calc(100vh-115px)] md:min-h-[calc(100vh-80px)] items-start md:items-center justify-center px-4 pt-6 pb-8 md:py-8 sm:px-6 lg:px-8
"
    >
      <div className="w-full max-w-md space-y-6 rounded-2xl  p-6 shadow-md border border-gray-100">
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-50">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please provide the following information to sign up.
          </p>
        </div>

        {/* সাইনআপ ফর্ম */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* নাম ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              placeholder="Enter your full name..."
            />
          </div>

          {/* ফোন নাম্বার ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* ইমেইল ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              placeholder="example@mail.com"
            />
          </div>

          {/* পাসওয়ার্ড ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              placeholder="••••••••"
            />
          </div>

          {/* এড্রেস টাইপ (রেডিও বাটন) */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-2">
              Address type
            </label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={formData.address.addressType === "home"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">Home</span>
              </label>

              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  checked={formData.address.addressType === "office"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">Office</span>
              </label>

              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="other"
                  checked={formData.address.addressType === "other"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>

          {/* বিস্তারিত ঠিকানা (Address) */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              Detailed address
            </label>
            <textarea
              name="addressText"
              rows="2"
              value={formData.address.addressText}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base resize-none"
              placeholder="Enter your full address..."
            />
          </div>

          {/* সাবমিট বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>

        {/* লগইন লিঙ্ক */}
        <p className="text-center text-sm text-gray-650 mt-2">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
