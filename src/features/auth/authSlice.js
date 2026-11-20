import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/axios/ApiRequest";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const loginUrl = import.meta.env.VITE_LOGIN_USER;
      const response = await Api.post(loginUrl, userCredentials);
      // console.log(response?.data.user);
      //console.log(response?.data.accessToken);

      if (response?.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "custom error correction now",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const logoutUrl =
        import.meta.env.VITE_LOGOUT_USER || "/api/v1/auth/logout";
      // কাস্টম Api ইনস্ট্যান্স ব্যবহার করছি যাতে হেডারে Access Token এবং সাথে কুকি যায়
      const response = await Api.post(logoutUrl);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  },
);
// সাইনআপ API কল (Thunk)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const registerUrl =
        import.meta.env.VITE_CREATE_USER || "/api/v1/users/register";
      const response = await Api.post(registerUrl, userData);

      // সাইনআপের পর সাথে সাথে অটো-লগইন করাতে চাইলে:
      if (response?.data?.user) {
        console.log(response?.data?.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed!",
      );
    }
  },
);
const storedUser = JSON.parse(localStorage.getItem("user") || "null");
const initialState = {
  isAuthenticated: !!localStorage.getItem("user"), //!!storedUser?.token,
  loading: false,
  message: null,
  user: storedUser,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // এই অ্যাকশনটি টোকেন এবং ইউজার ডাটা সেট করবে
    setCredentials: (state, action) => {
      // সেফটি চেক: payload না থাকলে ক্র্যাশ করবে না
      if (!action.payload) return;
      console.log(action?.payload);
      const { user, token } = action.payload;
      if (user) {
        state.user = user;
      }
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.message = "Logout Success";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log(action?.payload?.data?.user);
        console.log(action.payload?.message);

        state.loading = false;
        state.isAuthenticated = true;
        state.user = action?.payload?.data?.user;
        state.token = action?.payload?.data?.accessToken || null;
        state.message = action.payload?.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        authSlice.caseReducers.logout(state); // সরাসরি উপরের logout রিডিউসারটিকেই কল করা হলো
      })
      .addCase(logoutUser.rejected, (state) => {
        authSlice.caseReducers.logout(state); // সার্ভার এরর দিলেও ফ্রন্টএন্ড থেকে লগআউট হবে
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action?.payload?.message);

        state.loading = false;
        state.isAuthenticated = true;
        state.user = action?.payload?.data?.user;
        state.token = action?.payload?.data?.accessToken || null;
        state.message = action.payload?.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
