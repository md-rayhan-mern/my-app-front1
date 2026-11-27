import React from "react";
import { MessageCircle } from "lucide-react";

const Comment = ({ post }) => {
  return (
    <button className="flex-1 py-2 hover:bg-gray-100/80 rounded-lg transition flex items-center justify-center gap-1.5">
      <MessageCircle className="w-4 h-4" />
      <span>কমেন্ট ({post.commentsCount || 0})</span>
    </button>
  );
};

export default Comment;
