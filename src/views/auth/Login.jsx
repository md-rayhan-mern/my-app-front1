import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, user, message, error, token, loading } = useSelector(
    (state) => state.auth,
  );
  // console.log(token);
  // console.log(user);

  const handleLogin = async (e) => {
    e.preventDefault();

    // সিম্পল ভ্যালিডেশন চেক
    if (!email || !password) {
      toast.error("Please fill in all the fields!");
      return;
    }

    // .unwrap() ব্যবহার করলে সফল না হওয়া পর্যন্ত পরের লাইনে যাবে না
    await toast.promise(
      dispatch(loginUser({ identifier: email, password })).unwrap(),
      {
        loading: "Logging in...",
        // ব্যাকএন্ডের রেসপন্স অবজেক্ট থেকে message প্রপার্টিটি নেবে
        success: (res) => res?.message || "Login successful!",
        error: (err) => err?.message || err || "Login failed!",
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent  px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-transparent p-6 shadow-md border border-gray-100">
        {/* হেডার বা লোগো সেকশন */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-400">
            Welcome
          </h2>
          <p className="mt-2 text-sm text-gray-600">Log in to your account</p>
        </div>

        {/* লগইন ফর্ম */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md">
            {/* ইমেইল ইনপুট */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-50 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-50 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                placeholder="example@mail.com"
              />
            </div>

            {/* পাসওয়ার্ড ইনপুট */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-50 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-xl border border-gray-300 px-3 py-3 text-gray-50 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* পাসওয়ার্ড ভুলে গেছেন লিঙ্ক */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* সাবমিট বা লগইন বাটন */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </form>

        {/* রেজিস্টার বা সাইন আপ লিঙ্ক */}
        <p className="text-center text-sm text-gray-650 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};
