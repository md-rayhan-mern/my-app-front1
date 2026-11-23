import { useState } from "react";
import { Heart, MessageCircle, Play, Sparkles, X } from "lucide-react";

const ProfileTabContent = ({ activeTab, items, isLoading, user }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Smooth popup open animation
  const openModal = (item) => {
    setSelectedItem(item);
    setTimeout(() => setIsModalOpen(true), 10); // Quite delay
  };
  // Smooth popup close animation
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // 300ms animation ending
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-gray-400 animate-pulse">
        Loading Data...
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        Not yet any {activeTab} Not added.
      </div>
    );
  }

  return (
    <div className="mt-2">
      {/* 1. POSTS TAB */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {items.map((post) => (
            <div
              key={post.id}
              onClick={() => openModal(post)}
              className="bg-gray-800/60 border border-gray-700/70 rounded-xl p-3.5 cursor-pointer"
            >
              <p className="text-sm text-gray-200">{post.caption}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-2.5 w-full h-44 object-cover rounded-lg"
                />
              )}
              <div className="mt-3 pt-2 border-t border-gray-700/50 flex justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400" />{" "}
                  {post.comments}
                </span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 2. REELS TAB (Plays in a muted state on hover, Click to open the player) */}
      {activeTab === "reels" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          {items.map((reel) => (
            <div
              key={reel.id}
              onClick={() => openModal(reel)}
              className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden group cursor-pointer border border-gray-800"
            >
              {/* Video preview in a grid */}
              <video
                src={reel.videoUrl}
                poster={reel.thumbnail}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                  e.target.pause();
                  e.target.currentTime = 0;
                }}
                className="w-full h-full object-cover"
              />

              {/* View count and play icon below */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 pointer-events-none">
                <span className="flex items-center gap-1 text-[11px] font-medium text-white">
                  <Play className="w-3 h-3 fill-white" /> {reel.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 3. PHOTOS TAB */}
      {activeTab === "photos" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 ">
          {items.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openModal(photo)}
              className="aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                src={photo.url}
                alt="Photo"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {/* 4. HIGHLIGHTS TAB*/}
      {activeTab === "highlights" && (
        <div className="grid grid-cols-3 gap-3 py-2">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full p-0.5 border-2 border-indigo-500">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-xs text-gray-300 truncate max-w-[80px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />{" "}
                {item.title}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* ✅ of all content (Posts, Reel, Photo, Highlight)  Common Details Popup */}
      {selectedItem && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col md:flex-row max-h-[85vh] transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-white p-1.5 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. Left side: Will display a video or an image */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center max-h-[50vh] md:max-h-[85vh]">
              {selectedItem.videoUrl ? (
                <video
                  src={selectedItem.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={
                    selectedItem.url || selectedItem.cover || selectedItem.image
                  }
                  alt="Detail"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* 2. Right side: User profile, name, and post details */}
            <div className="w-full md:w-2/5 p-4 flex flex-col justify-between text-left bg-gray-900">
              <div>
                {/* User's profile picture and name */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-800">
                  <img
                    src={user?.avatar || "https://placeholder.com"}
                    alt={user?.name || "User"}
                    className="w-9 h-9 rounded-full object-cover border border-indigo-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user?.name || "User Name"}
                    </p>
                    {selectedItem.date && (
                      <p className="text-[11px] text-gray-400">
                        {selectedItem.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Caption or Title */}
                <div className="mt-3 space-y-1.5 overflow-y-auto max-h-48">
                  {selectedItem.title && (
                    <h4 className="text-sm font-bold text-indigo-400">
                      {selectedItem.title}
                    </h4>
                  )}
                  <p className="text-sm text-gray-200">
                    {selectedItem.caption ||
                      selectedItem.description ||
                      "There is no detailed information."}
                  </p>
                </div>
              </div>

              {/* Number of likes, comments, and views below */}
              <div className="pt-3 mt-3 border-t border-gray-800 flex items-center gap-4 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-rose-500" />{" "}
                  {selectedItem.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-blue-400" />{" "}
                  {selectedItem.comments || 0}
                </span>
                {selectedItem.views && (
                  <span className="ml-auto text-gray-400">
                    {selectedItem.views} views
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTabContent;
