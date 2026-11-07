import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ইউজার ইতিমধ্যে লগইন থাকলে সে আর লগইন/সাইনআপ পেজে যেতে পারবে না, সরাসরি ড্যাশবোর্ডে চলে যাবে
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
