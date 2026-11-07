import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // ইউজার যদি লগইন না থাকে, তবে তাকে রিডাইরেক্ট করে লগইন পেজে পাঠিয়ে দেবে
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
