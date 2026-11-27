import React from "react";
import { Share2 } from "lucide-react";

const Share = ({ post }) => {
  return (
    <button className="flex-1 py-2 hover:bg-gray-100/80 rounded-lg transition flex items-center justify-center gap-1.5">
      <Share2 className="w-4 h-4" />
      <span>শেয়ার</span>
    </button>
  );
};

export default Share;
