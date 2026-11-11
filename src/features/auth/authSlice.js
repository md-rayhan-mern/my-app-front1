import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/axios/ApiRequest";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const loginUrl = import.meta.env.VITE_LOGIN_USER;
      console.log(loginUrl);
      console.log(userCredentials);

      const response = await Api.post(loginUrl, userCredentials);
      //localStorage.setItem('token', response.data.token);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "custom error correction now",
      );
    }
  },
);
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
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
