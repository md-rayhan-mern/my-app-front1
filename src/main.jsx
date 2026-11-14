import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { router } from "./routes/MainRoute.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          // সব টোস্টের ডিফল্ট সময় (৯ সেকেন্ড)
          duration: 9000,
          style: {
            background: "#333",
            color: "#fff",
          },
          // শুধু সাকসেস টোস্টের জন্য আলাদা স্টাইল
          success: {
            iconTheme: { primary: "#10B981", secondary: "#fff" },
          },
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
