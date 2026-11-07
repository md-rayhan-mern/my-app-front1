import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    addressType: "home", // ডিফল্ট সিলেক্টেড
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // বেসিক ভ্যালিডেশন চেক
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.address
    ) {
      toast.error("অনুগ্রহ করে সব ফিল্ড সঠিকভাবে পূরণ করুন!");
      return;
    }

    // সফল সাইনআপ টোস্ট
    toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-md border border-gray-100">
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            নতুন অ্যাকাউন্ট
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            সাইনআপ করতে নিচের তথ্যগুলো প্রদান করুন
          </p>
        </div>

        {/* সাইনআপ ফর্ম */}
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* নাম ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              নাম
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
              placeholder="আপনার পুরো নাম"
            />
          </div>

          {/* ফোন নাম্বার ফিল্ড */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              ফোন নাম্বার
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
              ইমেইল এড্রেস
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
              পাসওয়ার্ড
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
              ঠিকানার ধরন
            </label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={formData.addressType === "home"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">বাসা</span>
              </label>

              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  checked={formData.addressType === "office"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">অফিস</span>
              </label>

              <label className="flex items-center text-sm font-medium text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value="other"
                  checked={formData.addressType === "other"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2">অন্যান্য</span>
              </label>
            </div>
          </div>

          {/* বিস্তারিত ঠিকানা (Address) */}
          <div>
            <label className="block text-sm font-medium text-gray-750 mb-1">
              বিস্তারিত ঠিকানা
            </label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-955 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base resize-none"
              placeholder="আপনার পুরো ঠিকানা লিখুন..."
            />
          </div>

          {/* সাবমিট বাটন */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              সাইনআপ করুন
            </button>
          </div>
        </form>

        {/* লগইন লিঙ্ক */}
        <p className="text-center text-sm text-gray-650 mt-2">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};
