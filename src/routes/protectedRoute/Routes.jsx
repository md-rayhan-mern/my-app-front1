import React from "react";
import ProfilePage from "../../views/profile/ui/Profile";

export const ProtectedRoutes = [
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];
