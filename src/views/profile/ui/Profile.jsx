import { useState, useEffect } from "react";
import { MapPin, Mail, Edit3, Grid, Film, Image, Sparkles } from "lucide-react";
import ProfileTabContent from "../component/ProfileTabContent";
import { useSelector } from "react-redux";
// ডামি ডেটা (কম্পোনেন্টের বাইরে রাখুন)
const DUMMY_DATA = {
  posts: [
    {
      id: 1,
      caption:
        "আজকে React এবং Tailwind CSS দিয়ে নতুন প্রোফাইল পেজ ডিজাইন করলাম! 🚀 কেমন হয়েছে সবাই জানাবেন।",
      image: "https://unsplash.com",
      likes: 42,
      comments: 9,
      date: "২ ঘণ্টা আগে",
    },
    {
      id: 2,
      caption: "সকালের এক কাপ গরম কফি আর কোডিং—দিনটা শুরু করার সেরা উপায় ☕💻",
      image: "https://unsplash.com",
      likes: 65,
      comments: 14,
      date: "৫ ঘণ্টা আগে",
    },
    {
      id: 3,
      caption:
        "জীবনে বড় কিছু করতে হলে প্রতিদিন একটু একটু করে নিজেকে আপডেট করতে হয়। Keep learning, keep growing! ✨",
      image: null, // ফেসবুকের মতো শুধু টেক্সট স্ট্যাটাস
      likes: 89,
      comments: 21,
      date: "গতকাল রাত ৯:৩০",
    },
    {
      id: 4,
      caption:
        "বিকেলের আকাশটা আজ অসাধারণ সুন্দর ছিল 🌅 প্রকৃতির মাঝে কিছুক্ষণ সময় কাটানো।",
      image: "https://unsplash.com",
      likes: 112,
      comments: 18,
      date: "২ দিন আগে",
    },
    {
      id: 5,
      caption:
        "নতুন প্রজেক্টের ব্যাকএন্ড আর্কিটেকচার সাজানো শেষ। Express আর MongoDB-র কম্বিনেশন আসলেই দারুণ! 🔥",
      image: "https://unsplash.com",
      likes: 54,
      comments: 7,
      date: "৪ দিন আগে",
    },
    {
      id: 6,
      caption:
        "সফলতা একদিনে আসে না, কিন্তু নিয়মিত পরিশ্রম করলে একদিন ঠিকই ধরা দেয়। শুভ রাত্রি সবাইকে 🌙",
      image: "https://unsplash.com",
      likes: 95,
      comments: 16,
      date: "১ সপ্তাহ আগে",
    },
  ],
  reels: [
    {
      id: 1,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "1.2K",
    },
    {
      id: 2,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "850",
    },
    {
      id: 3,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "3.4K",
    },
    {
      id: 4,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "2.1K",
    },
    {
      id: 5,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "940",
    },
    {
      id: 6,
      videoUrl: "https://mixkit.co",
      thumbnail: "https://unsplash.com",
      views: "5.7K",
    },
  ],
  photos: [
    { id: 1, url: "https://unsplash.com" },
    { id: 2, url: "https://unsplash.com" },
    { id: 3, url: "https://unsplash.com" },
    { id: 4, url: "https://unsplash.com" },
    { id: 5, url: "https://unsplash.com" },
    { id: 6, url: "https://unsplash.com" },
  ],
  highlights: [
    { id: 1, title: "Coding", cover: "https://unsplash.com" },
    { id: 2, title: "Travel", cover: "https://unsplash.com" },
    { id: 3, title: "Setup", cover: "https://unsplash.com" },
  ],
};
const ProfilePage = () => {
  // কোন ট্যাবটি অ্যাক্টিভ আছে তা ট্র্যাক করার জন্য স্টেট
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useSelector((state) => state.auth);
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(user);
  // ৪টি মেনু আইটেম এবং তাদের Lucide আইকন
  const menuItems = [
    { id: "posts", label: "POSTS", icon: Grid },
    { id: "reels", label: "REELS", icon: Film },
    { id: "photos", label: "PHOTOS", icon: Image },
    { id: "highlights", label: "HIGHLIGHT", icon: Sparkles },
  ];
  useEffect(() => {
    setIsLoading(true);
    setTabData(DUMMY_DATA[activeTab] || []);
    setIsLoading(false);
  }, [activeTab]);

  return (
    <div className="min-h-screen  flex items-start sm:items-center justify-center pt-4 pb-8 px-2 sm:p-4">
      <div className="max-w-[1000px] w-full rounded-2xl shadow-md overflow-hidden p-3 sm:p-6 text-center">
        {/* প্রোফাইল ছবি */}
        <img
          src={user?.avatar || "https://unsplash.com"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-100"
        />

        {/* নাম ও পেশা */}
        <h2 className="mt-4 text-xl font-bold text-gray-50">
          {user?.name?.toUpperCase()}
        </h2>
        <p className="text-sm text-indigo-600 font-medium">Web Developer</p>

        {/* ছোট বায়ো */}
        <p className="mt-3 text-gray-400 text-sm">
          আমি React এবং Tailwind CSS দিয়ে ওয়েবসাইট তৈরি করতে ভালোবাসি।
        </p>

        {/* লোকেশন ও ইমেইল */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            ঢাকা, বাংলাদেশ
          </span>
          <span className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-400" />
            {user?.email}
          </span>
        </div>
        {/* menu section*/}
        <div className="w-full mx-auto mt-4 sm:mt-6">
          {/* ৪টি রেসপন্সিভ প্রোফাইল ট্যাব মেনু */}
          <div className="flex items-center justify-between border-b border-gray-700/70 w-full">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 sm:py-3 px-1 text-[10px] min-[370px]:text-xs sm:text-sm font-medium border-b-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* সিলেক্ট করা মেনু অনুযায়ী নিচের কন্টেন্ট */}
          <div className="py-6 px-2 text-gray-200">
            {activeTab === "posts" && (
              <ProfileTabContent
                activeTab={activeTab}
                items={tabData}
                isLoading={isLoading}
                user={user}
              />
            )}
            {activeTab === "reels" && (
              <ProfileTabContent
                activeTab={activeTab}
                items={tabData}
                isLoading={isLoading}
                user={user}
              />
            )}
            {activeTab === "photos" && (
              <ProfileTabContent
                activeTab={activeTab}
                items={tabData}
                isLoading={isLoading}
                user={user}
              />
            )}
            {activeTab === "highlights" && (
              <ProfileTabContent
                activeTab={activeTab}
                items={tabData}
                isLoading={isLoading}
                user={user}
              />
            )}
          </div>
        </div>

        {/* menu section*/}
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
