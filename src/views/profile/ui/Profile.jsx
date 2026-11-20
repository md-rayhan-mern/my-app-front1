import React from "react";
import { MapPin, Mail, Edit3 } from "lucide-react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className=" max-w-md w-full rounded-2xl shadow-md overflow-hidden p-6 text-center">
        {/* প্রোফাইল ছবি */}
        <img
          src="https://unsplash.com"
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-100"
        />

        {/* নাম ও পেশা */}
        <h2 className="mt-4 text-xl font-bold text-gray-50">
          {user?.name.toUpperCase()}
        </h2>
        <p className="text-sm text-indigo-600 font-medium">Web Developer</p>

        {/* ছোট বায়ো */}
        <p className="mt-3 text-gray-600 text-sm">
          আমি React এবং Tailwind CSS দিয়ে ওয়েবসাইট তৈরি করতে ভালোবাসি।
        </p>

        {/* লোকেশন ও ইমেইল */}
        <div className="mt-4 flex justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            ঢাকা, বাংলাদেশ
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" />
            {user?.email}
          </span>
        </div>

        {/* এডিট বাটন */}
        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition">
          <Edit3 className="w-4 h-4" />
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
