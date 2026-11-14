import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/axios/ApiRequest";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const loginUrl = import.meta.env.VITE_LOGIN_USER;
      const response = await Api.post(loginUrl, userCredentials);
      if (response?.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "custom error correction now",
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
  token: storedUser?.token || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
        // console.log(action.payload.data);
        // console.log(action.payload.data?.token);
        // console.log(action.payload.message);

        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.data?.token || null;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
