import React from "react";
import Products from "../../features/products/pages/Products.jsx";
import About from "../../views/About.jsx";
import { Login } from "../../views/auth/Login.jsx";
import { Register } from "../../views/auth/Sign.jsx";
export const PublicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
