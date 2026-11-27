import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed } from "../../../features/post/feedSlice.js";
import PostCard from "./component/PostCard.jsx";
import ScrollToTopButton from "./component/ScrollToTopButton.jsx";

const Feed = () => {
  const { user, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // ১. Redux স্টোর থেকে পোস্টের সমস্ত স্টেট বের করে আনা
  const {
    items: posts, // সব পোস্টের অ্যারে
    nextCursor, // পরের পেজের জন্য শেষ পোস্টের সময়
    hasMore, // ডেটাবেসে আরও পোস্ট বাকি আছে কি না (true/false)
    loading, // লোডিং অবস্থা
    error, // কোনো এরর আসলে তার মেসেজ
  } = useSelector((state) => state.posts);
  //console.log(posts[0]?.media[0]?.url);

  // ২. প্রথমবার কম্পোনেন্ট লোড হলে প্রথম ১০টি পোস্ট নিয়ে আসা
  useEffect(() => {
    // যদি আগে থেকেই স্টোরে পোস্ট লোড করা না থাকে, তবেই কল করবে
    if (posts.length === 0 && hasMore && !loading && !error) {
      dispatch(fetchNewsFeed({ cursor: null, limit: 10 }));
    }
  }, [dispatch, token, posts.length, hasMore, loading, error]);
  // ৩. ইনফিনিট স্ক্রল লজিক (একদম নিচের পোস্টে পৌঁছালে পরের পোস্ট আনবে)
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return; // ইতিমধ্যে লোড হতে থাকলে নতুন রিকোয়েস্ট পাঠাবে না
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // শেষ পোস্টটি স্ক্রিনে দেখা গেলে এবং আরও পোস্ট বাকি থাকলে কল করবে
        if (entries[0].isIntersecting && hasMore && nextCursor) {
          dispatch(fetchNewsFeed({ cursor: nextCursor, limit: 10 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, nextCursor, dispatch],
  );
  // কম্পোনেন্ট আনমাউন্ট হলে অবজার্ভার বন্ধ করা
  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);
  // ৪. ম্যানুয়ালি রিফ্রেশ করার লজিক (যদি কখনো রিফ্রেশ বাটন রাখতে চান)
  const handleRefreshFeed = () => {
    dispatch(fetchNewsFeed({ cursor: null, limit: 10 }));
  };
  return (
    <>
      <PostCard
        posts={posts}
        loading={loading}
        error={error}
        hasMore={hasMore}
        handleRefreshFeed={handleRefreshFeed}
        lastPostElementRef={lastPostElementRef}
        user={user}
      />

      {/* লুপের বাইরে একদম নিচে বাটনটি থাকবে */}
      <ScrollToTopButton onRefresh={handleRefreshFeed} loading={loading} />
    </>
  );
};

export default Feed;
