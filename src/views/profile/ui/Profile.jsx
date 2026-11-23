import { useState, useEffect } from "react";
import { MapPin, Mail, Edit3, Grid, Film, Image, Sparkles } from "lucide-react";
import ProfileTabContent from "../component/ProfileTabContent";
import { useSelector } from "react-redux";
// Dummy Data
const DUMMY_DATA = {
  posts: [
    {
      id: 1,
      caption:
        "আজকে React এবং Tailwind CSS দিয়ে নতুন প্রোফাইল পেজ ডিজাইন করলাম! 🚀 কেমন হয়েছে সবাই জানাবেন।",
      image:
        "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      likes: 42,
      comments: 9,
      date: "২ ঘণ্টা আগে",
    },
    {
      id: 2,
      caption: "সকালের এক কাপ গরম কফি আর কোডিং—দিনটা শুরু করার সেরা উপায় ☕💻",
      image:
        "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      likes: 65,
      comments: 14,
      date: "৫ ঘণ্টা আগে",
    },
    {
      id: 3,
      caption:
        "জীবনে বড় কিছু করতে হলে প্রতিদিন একটু একটু করে নিজেকে আপডেট করতে হয়। Keep learning, keep growing! ✨",
      image:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D", // ফেসবুকের মতো শুধু টেক্সট স্ট্যাটাস
      likes: 89,
      comments: 21,
      date: "গতকাল রাত ৯:৩০",
    },
    {
      id: 4,
      caption:
        "বিকেলের আকাশটা আজ অসাধারণ সুন্দর ছিল 🌅 প্রকৃতির মাঝে কিছুক্ষণ সময় কাটানো।",
      image:
        "https://plus.unsplash.com/premium_photo-1661963063875-7f131e02bf75?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      likes: 112,
      comments: 18,
      date: "২ দিন আগে",
    },
    {
      id: 5,
      caption:
        "নতুন প্রজেক্টের ব্যাকএন্ড আর্কিটেকচার সাজানো শেষ। Express আর MongoDB-র কম্বিনেশন আসলেই দারুণ! 🔥",
      image:
        "https://images.unsplash.com/photo-1775701262135-58eaba3f0724?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      likes: 54,
      comments: 7,
      date: "৪ দিন আগে",
    },
    {
      id: 6,
      caption:
        "সফলতা একদিনে আসে না, কিন্তু নিয়মিত পরিশ্রম করলে একদিন ঠিকই ধরা দেয়। শুভ রাত্রি সবাইকে 🌙",
      image:
        "https://images.unsplash.com/photo-1720884413532-59289875c3e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      likes: 95,
      comments: 16,
      date: "১ সপ্তাহ আগে",
    },
  ],
  reels: [
    {
      id: 1,
      videoUrl: "https://assets.mixkit.co/rnep1pfrzq76c5xcb1lk869qegwy",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/abstract-painting-of-santa-claus-free-photo.jpg?w=600&quality=80",
      views: "1.2K",
    },
    {
      id: 2,
      videoUrl: "https://assets.mixkit.co/dw27r0mkvb3e3zhstyp0n2km2l4y",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/preparing-christmas-sweets-lovely-hearts-free-photo.jpg?w=600&quality=80",
      views: "850",
    },
    {
      id: 3,
      videoUrl: "https://assets.mixkit.co/pr1hln5jy12699ev3hy7p92fkhfv",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/christmas-gifts-still-life-with-beautiful-bokeh-free-photo.jpg?w=600&quality=80",
      views: "3.4K",
    },
    {
      id: 4,
      videoUrl: "https://assets.mixkit.co/videos/49348/49348-720.mp4",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/romantic-snowy-mountain-village-free-image.jpeg?w=600&quality=80",
      views: "2.1K",
    },
    {
      id: 5,
      videoUrl: "https://assets.mixkit.co/videos/49355/49355-720.mp4",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-sunset-over-the-ocean-free-photo.jpg?w=600&quality=80",
      views: "940",
    },
    {
      id: 6,
      videoUrl: "https://assets.mixkit.co/videos/52199/52199-720.mp4",
      thumbnail:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/cup-of-coffee-on-a-white-table-free-photo.jpg?w=600&quality=80",
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
    {
      id: 1,
      title: "Coding",
      description: "somthing dummy Data 1",
      cover:
        "data:image/webp;base64,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",
    },
    {
      id: 2,
      title: "Travel",
      description: "somthing dummy Data 2",
      cover:
        "data:image/webp;base64,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",
    },
    {
      id: 3,
      title: "Setup",
      description: "somthing dummy Data 3",
      cover:
        "data:image/webp;base64,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",
    },
  ],
};
const ProfilePage = () => {
  // State for tracking which tab is active
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useSelector((state) => state.auth);
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(user);
  // 4 menu items and their Lucide icons
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
    <div className="min-h-[calc(100vh-115px)] lg:min-h-[calc(100vh-80px)] w-full flex items-start justify-center pt-4 pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full rounded-2xl shadow-md overflow-hidden p-4 sm:p-6 lg:p-8 text-center">
        {/* Profile picture */}
        <img
          src={user?.avatar || "https://unsplash.com"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-indigo-100"
        />

        {/* Name & Profession */}
        <h2 className="mt-4 text-xl font-bold text-gray-50">
          {user?.name?.toUpperCase()}
        </h2>
        <p className="text-sm text-indigo-600 font-medium">Web Developer</p>

        {/* Short bio */}
        <p className="mt-3 text-gray-400 text-sm">
          আমি React এবং Tailwind CSS দিয়ে ওয়েবসাইট তৈরি করতে ভালোবাসি।
        </p>

        {/* Location and Email */}
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
          {/* 4 Responsive Profile Tab Menus */}
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

          {/* Content below, based on the selected menu */}
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
        {/* Edit button */}
        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition">
          <Edit3 className="w-4 h-4" />
          Edit profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
