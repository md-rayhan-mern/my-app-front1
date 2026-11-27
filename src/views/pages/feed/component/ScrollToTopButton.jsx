import { useState, useEffect } from "react";
import { ArrowUp, RefreshCw } from "lucide-react";

const ScrollToTopButton = ({ onRefresh, loading }) => {
  const [isVisible, setIsVisible] = useState(false);

  // প্রায় ২টি পোস্টের সমান (750px) নিচে নামলে বাটনটি ভাসবে
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 750) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // ক্লিক করলে উপরে যাবে এবং সাথে রিফ্রেশ হবে
  const handleScrollAndRefresh = () => {
    // ১. স্মুথলি উপরে স্ক্রল করবে
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // ২. যদি লোডিং অবস্থায় না থাকে, তবে রিফ্রেশ ফাংশন কল করবে
    if (onRefresh && !loading) {
      onRefresh();
    }
  };

  return (
    <button
      onClick={handleScrollAndRefresh}
      disabled={loading}
      aria-label="উপরে যান এবং রিফ্রেশ করুন"
      title="নতুন পোস্ট দেখুন"
      className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* লোডিং চললে ঘুরন্ত RefreshCw এবং স্বাভাবিক অবস্থায় ArrowUp দেখাবে */}
      {loading ? (
        <RefreshCw className="h-5 w-5 animate-spin" />
      ) : (
        <ArrowUp className="h-5 w-5" />
      )}
      <span className="text-xs sm:text-sm font-medium">
        {loading ? "আপডেট হচ্ছে..." : "নতুন পোস্ট"}
      </span>
    </button>
  );
};

export default ScrollToTopButton;
