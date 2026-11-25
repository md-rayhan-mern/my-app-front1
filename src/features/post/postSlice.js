import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/axios/ApiRequest";

// ১. নিউজফিড আনার AsyncThunk
export const fetchNewsFeed = createAsyncThunk(
  "posts/fetchNewsFeed",
  async ({ cursor = null, limit = 10 }, { rejectWithValue }) => {
    try {
      const getFeedUri = import.meta.env.VITE_POSTS;
      const response = await Api.get(getFeedUri, { params: { cursor, limit } });
      // আপনার ব্যাকএন্ডের apiResponse অনুযায়ী data অবজেক্ট রিটার্ন করছি
      //   console.log(response?.message);
      //   console.log(response?.data);
      return {
        ...response.data, // { posts, nextCursor, hasMore }
        isInitial: cursor === null, // প্রথমবার লোড হচ্ছে কি না তা বোঝার জন্য
      };
    } catch (error) {
      //console.log(error.response);

      return rejectWithValue(
        error.response?.data?.message || "ফিড লোড করতে সমস্যা হয়েছে",
      );
    }
  },
);

// ২. নতুন পোস্ট তৈরি করার AsyncThunk

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (postData, { rejectWithValue }) => {
    try {
      const createPostUri = import.meta.env.VITE_POSTS;
      const response = await Api.post(createPostUri, postData);
      console.log(response);
      return response.data; // পপুলেট হওয়া নতুন পোস্টটি
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(
        error.response?.data?.message || "পোস্ট তৈরি করা যায়নি",
      );
    }
  },
);
//initialState
const initialState = {
  items: [],
  nextCursor: null,
  hasMore: true,
  loading: false,
  creating: false,
  error: null,
};
//postSlice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // লগআউট বা রিফ্রেশ করলে ফিড রিসেট করার জন্য
    resetFeed: (state) => {
      state.items = [];
      state.nextCursor = null;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    // নিউজফিড লোডিং স্টেট
    builder
      .addCase(fetchNewsFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsFeed.fulfilled, (state, action) => {
        //console.log(action?.payload?.data);

        state.loading = false;
        // ডিফল্ট ভ্যালু হিসেবে posts = [] দেওয়া হলো যাতে কখনো undefined না হয়
        const {
          posts = [],
          nextCursor = null,
          hasMore = false,
          isInitial,
        } = action.payload || {};

        if (isInitial) {
          state.items = posts; // প্রথমবার হলে নতুন করে সেট হবে
        } else {
          // ডুপ্লিকেট পোস্ট এড়াতে ফিল্টার করে নিচে যুক্ত করা
          const existingIds = new Set(state.items.map((p) => p._id));
          const uniqueNewPosts = posts.filter((p) => !existingIds.has(p._id));
          state.items = [...state.items, ...uniqueNewPosts];
        }

        state.nextCursor = nextCursor;
        state.hasMore = hasMore;
        //console.log(state.items);
      })
      .addCase(fetchNewsFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })
      // নতুন পোস্ট তৈরির স্টেট
      .addCase(createNewPost.pending, (state) => {
        state.creating = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.creating = false;
        // নতুন পোস্টটি ফিডের একদম উপরে যুক্ত করা
        state.items.unshift(action.payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload || action.error?.message;
      });
  },
});
export const { resetFeed } = postSlice.actions;
export default postSlice.reducer;
