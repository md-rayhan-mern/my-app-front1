import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // ইউজার ইতিমধ্যে লগইন থাকলে সে আর লগইন/সাইনআপ পেজে যেতে পারবে না, সরাসরি ড্যাশবোর্ডে চলে যাবে
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  return !isAuthenticated ? <Outlet /> : <Navigate to={from} replace />;
};

export default PublicRoute;
