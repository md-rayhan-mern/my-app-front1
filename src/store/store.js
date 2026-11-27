import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import postReducer from "../features/post/feedSlice.js";
import reactions from "../features/reactions/reactionSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    reactions: reactions,
  },
});
