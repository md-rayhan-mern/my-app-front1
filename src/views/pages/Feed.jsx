import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed } from "../../features/post/postSlice.js";

const Feed = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // ১. Redux স্টোর থেকে পোস্টের সমস্ত স্টেট বের করে আনা
  const {
    items: posts, // সব পোস্টের অ্যারে
    nextCursor, // পরের পেজের জন্য শেষ পোস্টের সময়
    hasMore, // ডেটাবেসে আরও পোস্ট বাকি আছে কি না (true/false)
    loading, // লোডিং অবস্থা
    error, // কোনো এরর আসলে তার মেসেজ
  } = useSelector((state) => state.posts);
  console.log(posts[0]?.media[0]?.url);

  // ২. প্রথমবার কম্পোনেন্ট লোড হলে প্রথম ১০টি পোস্ট নিয়ে আসা
  useEffect(() => {
    // যদি আগে থেকেই স্টোরে পোস্ট লোড করা না থাকে, তবেই কল করবে
    if (posts.length === 0 && hasMore && !loading) {
      dispatch(fetchNewsFeed({ cursor: null, limit: 10 }));
    }
  }, [dispatch, posts.length]);
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
  // ৪. ম্যানুয়ালি রিফ্রেশ করার লজিক (যদি কখনো রিফ্রেশ বাটন রাখতে চান)
  const handleRefreshFeed = () => {
    dispatch(fetchNewsFeed({ cursor: null, limit: 10 }));
  };
  return (
    <div>
      Feed {/* এরর হ্যান্ডলিং */}
      {error && <p style={{ color: "red" }}>সমস্যা হয়েছে: {error}</p>}
      {/* প্রথমবার লোড হওয়ার সময় লোডার */}
      {loading && posts.length === 0 && <p>নিউজফিড লোড হচ্ছে...</p>}
      {/* পোস্ট না থাকলে মেসেজ */}
      {!loading && posts.length === 0 && !error && (
        <p>দেখানোর মতো কোনো পোস্ট নেই।</p>
      )}
      {/* ৫. পোস্ট লিস্ট রেন্ডার করা */}
      {posts.map((post, index) => {
        // চেক করা হচ্ছে এটি লিস্টের একদম শেষ পোস্ট কি না
        const isLastPost = posts.length === index + 1;

        return (
          <div
            key={post._id}
            ref={isLastPost ? lastPostElementRef : null} // শেষ পোস্টে রেফারেন্স বসানো
          >
            {/* আপনার পোস্ট কার্ডের ডিজাইন এখানে বসাবেন */}
            <h4>{post.author?.name}</h4>
            <p>{post.content}</p>
            <small>
              {post.privacy} • {new Date(post.createdAt).toLocaleDateString()}
            </small>
            <hr />
          </div>
        );
      })}
      {/* পরের পেজ লোড হওয়ার সময় নিচের লোডার */}
      {loading && posts.length > 0 && <p>আরও পোস্ট লোড হচ্ছে...</p>}
      {/* সব পোস্ট শেষ হয়ে গেলে */}
      {!hasMore && posts.length > 0 && <p>আপনি সব পোস্ট দেখে ফেলেছেন!</p>}
    </div>
  );
};

export default Feed;
