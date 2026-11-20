import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { logoutUser } from "../../features/auth/authSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "Other",
    birthDate: "",
    address: {
      addressType: "home",
      addressText: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "Other",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        address: {
          addressType: user.address?.addressType || "home",
          addressText: user.address?.addressText || "",
        },
      });
    }
  }, [user]);

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address.addressText) {
      toast.error("Name, phone, and address are required!");
      return;
    }

    toast.success("প্রোফাইল তথ্য আপডেট হয়েছে!");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("সফলভাবে লগআউট হয়েছেন!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-200/20 bg-white/5 shadow-lg">
        {/* প্রোফাইল হেডার ব্যানার */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {user.profilePicture &&
            user.profilePicture !== "https://placeholder.com" ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-white/30 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-2xl sm:text-3xl font-bold text-white uppercase">
                {user.name?.charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <h1 className="truncate text-xl sm:text-2xl font-bold text-white">
                {user.name}
              </h1>
              <p className="break-all text-xs sm:text-sm text-blue-100">
                {user.email}
              </p>
              <span className="mt-1.5 inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium text-white capitalize">
                {user.role || "User"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-3 sm:mt-0">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="flex-1 sm:flex-none rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 sm:flex-none rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* প্রোফাইল বডি */}
        <div className="p-5 sm:p-8">
          {!isEditing ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">Full Name</p>
                <p className="mt-1 text-base font-semibold text-gray-100">
                  {user.name}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">Email</p>
                <p className="mt-1 break-all text-base font-semibold text-gray-100">
                  {user.email}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">Phone</p>
                <p className="mt-1 text-base font-semibold text-gray-100">
                  {user.phone}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">Gender</p>
                <p className="mt-1 text-base font-semibold text-gray-100">
                  {user.gender || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Date of Birth
                </p>
                <p className="mt-1 text-base font-semibold text-gray-100">
                  {user.birthDate
                    ? new Date(user.birthDate).toLocaleDateString()
                    : "Not added"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Address Type
                </p>
                <span className="mt-1 inline-block rounded-lg bg-blue-500/20 px-2.5 py-0.5 text-sm font-medium text-blue-400 capitalize">
                  {user.address?.addressType || "Home"}
                </span>
              </div>

              <div className="sm:col-span-2 rounded-xl border border-gray-200/20 p-4">
                <p className="text-xs font-medium text-gray-400">
                  Detailed Address
                </p>
                <p className="mt-1 text-base font-medium text-gray-100">
                  {user.address?.addressText || "No address provided"}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-300">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Address Type
                </label>
                <div className="flex flex-wrap gap-6">
                  {["home", "office", "other"].map((type) => (
                    <label
                      key={type}
                      className="flex cursor-pointer items-center text-sm font-medium text-gray-200 capitalize"
                    >
<input
type="radio"
name="addressType"
value={type}
checked={formData.address.addressType === type}
onChange={handleChange}
className="h-4 w-4 text-blue-600 focus:ring-blue-500"
/>
{type}

))}
<button
type="button"
onClick={() => setIsEditing(false)}
className="w-full sm:w-auto rounded-xl border border-gray-400 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/10"
>
Cancel


{loading ? "Saving..." : "Save Changes"}



)}



);
};