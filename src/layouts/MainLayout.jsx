import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* গ্লোবাল মেনুবার */}
      <Navbar />
      {/* রাউটারের অন্যান্য পেজগুলো এখানে রেন্ডার হবে */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
