import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { router } from "./routes/MainRoute.jsx";
import "./index.css";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
