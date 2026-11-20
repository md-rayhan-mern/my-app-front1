import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation(); // ইউজার বর্তমানে যেই রাউটে যেতে চাচ্ছে
  // ইউজার যদি লগইন না থাকে, তবে তাকে রিডাইরেক্ট করে লগইন পেজে পাঠিয়ে দেবে
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
