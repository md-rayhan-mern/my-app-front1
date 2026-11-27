import { useState, useEffect, useRef } from "react";
import { ThumbsUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toggleReaction } from "../../../../features/reactions/reactionSlice";

// আপনার Mongoose স্কিমা অনুযায়ী ৬টি রিঅ্যাকশন
const REACTIONS = [
  { type: "like", label: "Like", emoji: "👍", color: "text-blue-600" },
  { type: "love", label: "Love", emoji: "❤️", color: "text-red-500" },
  { type: "haha", label: "Haha", emoji: "😂", color: "text-yellow-500" },
  { type: "wow", label: "Wow", emoji: "😮", color: "text-yellow-500" },
  { type: "sad", label: "Sad", emoji: "😢", color: "text-yellow-600" },
  { type: "angry", label: "Angry", emoji: "😡", color: "text-orange-600" },
];

const Like = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  // লগইন ইউজারের রিঅ্যাকশন
  const [currentReaction, setCurrentReaction] = useState(
    post?.userReaction || null,
  );

  // পুরো reactionCounts অবজেক্টটি স্টেটে রাখা হলো
  const [counts, setCounts] = useState(post?.reactionCounts || {});

  // হোভার ও মোবাইল লং-প্রেস পপ-আপ স্টেট
  const [showPicker, setShowPicker] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const longPressTimeoutRef = useRef(null);

  // Redux স্টোর বা রিফ্রেশ থেকে নতুন ডাটা আসলে স্টেট সিঙ্ক রাখা
  useEffect(() => {
    setCurrentReaction(post?.userReaction || null);
    setCounts(post?.reactionCounts || {});
  }, [post?.userReaction, post?.reactionCounts]);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setShowPicker(true), 250);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setShowPicker(false), 300);
  };

  const handleTouchStart = () => {
    longPressTimeoutRef.current = setTimeout(() => setShowPicker(true), 400);
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimeoutRef.current);
  };

  // ৬টি রিঅ্যাকশনের যেকোনো একটি সিলেক্ট করলে
  const handleSelectReaction = (selectedType) => {
    setShowPicker(false);
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }
    const prevReaction = currentReaction;
    // Optimistic UI আপডেট (প্রতিটি আলাদা রিঅ্যাকশনের সংখ্যাও আপডেট হবে)
    const updatedCounts = { ...counts };
    if (prevReaction === selectedType) {
      setCurrentReaction(null);
      updatedCounts[selectedType] = Math.max(
        0,
        (updatedCounts[selectedType] || 0) - 1,
      );
      updatedCounts.total = Math.max(0, (updatedCounts.total || 0) - 1);
    } else {
      setCurrentReaction(selectedType);
      updatedCounts[selectedType] = (updatedCounts[selectedType] || 0) + 1;
      if (prevReaction) {
        updatedCounts[prevReaction] = Math.max(
          0,
          (updatedCounts[prevReaction] || 0) - 1,
        );
      } else {
        updatedCounts.total = (updatedCounts.total || 0) + 1;
      }
    }
    setCounts(updatedCounts);

    // ব্যাকএন্ডে ডাটা পাঠানো
    dispatch(
      toggleReaction({
        targetId: post._id,
        targetType: "Post",
        type: selectedType,
      }),
    );
  };

  const handleMainButtonClick = () => {
    if (currentReaction) {
      handleSelectReaction(currentReaction);
    } else {
      handleSelectReaction("like");
    }
  };

  const activeReactionObj = REACTIONS.find((r) => r.type === currentReaction);

  // যে রিঅ্যাকশনগুলো ০-এর বেশি আছে সেগুলো বের করা
  const activeReactions = REACTIONS.filter((r) => (counts[r.type] || 0) > 0);
  // সব রিঅ্যাকশনের আসল যোগফল
  const realTotal = activeReactions.reduce(
    (sum, r) => sum + (counts[r.type] || 0),
    0,
  );

  return (
    <div
      className="relative flex-1 flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ভাসমান রিঅ্যাকশন বার (Hover / Long-press করলে সিরিয়ালে ভাসবে) */}
      {showPicker && (
        <div
          onMouseEnter={() => clearTimeout(hoverTimeoutRef.current)}
          className="absolute bottom-full left-0 sm:left-2 mb-2 z-50 flex items-center gap-1.5 sm:gap-2 bg-white px-3 py-1.5 rounded-full shadow-xl border border-gray-200"
        >
          {REACTIONS.map((reaction) => (
            <button
              key={reaction.type}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSelectReaction(reaction.type);
              }}
              title={reaction.label}
              className="text-2xl sm:text-3xl hover:scale-125 active:scale-110 transition-transform duration-150 cursor-pointer select-none"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}

      {/* মূল বাটন */}
      <button
        type="button"
        onClick={handleMainButtonClick}
        className={`w-full py-2 hover:bg-gray-100/80 rounded-lg transition flex items-center justify-center gap-1.5 select-none ${
          activeReactionObj
            ? `${activeReactionObj.color} font-semibold`
            : "text-gray-600"
        }`}
      >
        {activeReactionObj ? (
          <>
            <span className="text-base leading-none">
              {activeReactionObj.emoji}
            </span>
            <span>{activeReactionObj.label}</span>
          </>
        ) : (
          <>
            <ThumbsUp className="w-4 h-4" />
            <span>রিঅ্যাক্ট</span>
          </>
        )}

        {/* মাল্টি-টাইপ ইমোজি ও মোট সংখ্যা (এর ওপর মাউস নিলে কোন রিঅ্যাক্ট কয়টা তা ভাসবে) */}
        {realTotal > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative group/counts flex items-center gap-1 ml-1 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-full text-xs text-gray-700"
          >
            <span className="flex -space-x-1">
              {activeReactions.map((r) => (
                <span key={r.type}>{r.emoji}</span>
              ))}
            </span>
            <span className="font-semibold">{realTotal}</span>

            {/* হোভার পপ-আপ: প্রতিটি রিঅ্যাকশনের নাম ও আলাদা সংখ্যা */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/counts:flex flex-col gap-1 bg-gray-900/95 text-white text-xs px-3 py-2 rounded-lg shadow-xl z-50 min-w-[120px] pointer-events-none">
              {activeReactions.map((r) => (
                <div
                  key={r.type}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-1">
                    <span>{r.emoji}</span>
                    <span>{r.label}</span>
                  </span>
                  <span className="font-bold text-gray-200">
                    {counts[r.type]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Like;
