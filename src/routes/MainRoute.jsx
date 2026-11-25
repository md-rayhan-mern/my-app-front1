import { createBrowserRouter } from "react-router";
import { UniversalRoute } from "./Routes";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import PublicRoute from "./publicRoute/PublicRoute";
import { ProtectedRoutes } from "./protectedRoute/Routes";
import { PublicRoutes } from "./publicRoute/Routes";
import Feed from "../views/pages/Feed";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      ...UniversalRoute,
      {
        element: <PublicRoute />,
        children: [...PublicRoutes],
      },
      {
        element: <ProtectedRoute />,
        children: [...ProtectedRoutes],
      },
    ],
  },
]);
