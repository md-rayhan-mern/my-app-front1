import React from "react";
import { RefreshCw, Globe, Users, Lock } from "lucide-react";
import Like from "./Like";
import Comment from "./Comment";
import Share from "./Share";

const PostCard = ({
  posts,
  loading,
  error,
  hasMore,
  handleRefreshFeed,
  lastPostElementRef,
  user,
}) => {
  //console.log(posts[0]?.media[0].type);

  // প্রাইভেসি অনুযায়ী আইকন রিটার্ন করার ছোট হেল্পার
  const renderPrivacyIcon = (privacy) => {
    if (privacy === "public") return <Globe className="w-3.5 h-3.5" />;
    if (privacy === "only_me") return <Lock className="w-3.5 h-3.5" />;
    return <Users className="w-3.5 h-3.5" />;
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-4 bg-transparent min-h-screen">
      {/* রিফ্রেশ বাটন */}
      <div className="flex justify-between items-center mb-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">নিউজফিড</h2>
        <button
          onClick={handleRefreshFeed}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "লোড হচ্ছে..." : "রিফ্রেশ"}</span>
        </button>
      </div>

      {/* এরর মেসেজ */}
      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">
          সমস্যা হয়েছে: {error}
        </div>
      )}

      {/* প্রথমবার লোড হওয়ার সময় লোডার (Skeleton বা টেক্সট) */}
      {loading && posts.length === 0 && (
        <div className="text-center py-10 text-gray-500 animate-pulse">
          নিউজফিড লোড হচ্ছে...
        </div>
      )}

      {/* পোস্ট না থাকলে মেসেজ */}
      {!loading && posts.length === 0 && !error && (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm text-gray-500">
          দেখানোর মতো কোনো পোস্ট নেই।
        </div>
      )}

      {/* পোস্ট লিস্ট রেন্ডার করা */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const isLastPost = posts.length === index + 1;

          return (
            <article
              key={post._id}
              ref={isLastPost ? lastPostElementRef : null}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* ১. পোস্টের হেডার (ইউজারের নাম, প্রোফাইল পিকচার ও সময়) */}
              <div className="flex items-center gap-3 p-3 sm:p-4">
                <img
                  src={
                    post.author?.avatar ||
                    `https://images.unsplash.com/photo-1791394813021-06bb982238ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D`
                  }
                  alt={post.author?.name}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {post.author?.name || "অজানা ব্যবহারকারী"}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("bn-BD", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 capitalize">
                      {renderPrivacyIcon(post.privacy)}
                      {post.privacy === "only_me" ? "Only me" : post.privacy}
                    </span>
                  </div>
                </div>
              </div>

              {/* ২. পোস্টের টেক্সট কন্টেন্ট */}
              {post.content && (
                <p className="px-3 sm:px-4 pb-3 text-sm sm:text-base text-gray-800 whitespace-pre-line break-words">
                  {post.content}
                </p>
              )}

              {/* ৩. মিডিয়া সেকশন (ছবি এবং ভিডিও উভয় সাপোর্ট) */}
              {post.media && post.media.length > 0 && (
                <div
                  className={`grid gap-1 bg-black ${
                    post.media.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {post.media.map((item, idx) => {
                    // ভিডিও কি না তা চেক করা (type দিয়ে অথবা url-এর শেষের অংশ দিয়ে)
                    const isVideo =
                      item.type === "video" ||
                      item.url?.match(/\.(mp4|webm|ogg)$/i);

                    return (
                      <div
                        key={idx}
                        className="relative w-full overflow-hidden flex items-center justify-center bg-gray-900"
                      >
                        {isVideo ? (
                          <video
                            src={item.url}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full max-h-[500px] object-contain"
                          />
                        ) : (
                          <img
                            src={item.url}
                            alt="Post media"
                            loading="lazy"
                            className="w-full max-h-[550px] object-cover"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ৪. লাইক, কমেন্ট ও শেয়ার বাটন (মোবাইল ফ্রেন্ডলি টাচ এরিয়া) */}
              <div className="flex items-center justify-around border-t border-gray-100 py-1.5 px-2 text-gray-600 text-xs sm:text-sm font-medium">
                {/* Like */}
                <Like post={post} />
                {/* Comment */}
                <Comment post={post} />
                {/* Share */}
                <Share post={post} />
              </div>
            </article>
          );
        })}
      </div>

      {/* নিচের ইনফিনিট স্ক্রল লোডার */}
      {loading && posts.length > 0 && (
        <div className="text-center py-6 text-sm text-blue-600 font-medium">
          আরও পোস্ট লোড হচ্ছে...
        </div>
      )}

      {/* সব পোস্ট শেষ হয়ে গেলে */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-6 text-xs sm:text-sm text-gray-500">
          আপনি সব পোস্ট দেখে ফেলেছেন! 🎉
        </div>
      )}
    </div>
  );
};

export default PostCard;
