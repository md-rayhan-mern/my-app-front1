import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../config/axios/ApiRequest";
// পোস্ট বা কমেন্টে রিঅ্যাকশন টগল করার AsyncThunk
export const toggleReaction = createAsyncThunk(
  "reactions/toggleReaction",
  async ({ targetId, targetType, type }, { rejectWithValue }) => {
    try {
      const reactionUri = import.meta.env.VITE_REACTIONS;
      //console.log(reactionUri);

      const response = await Api.post(reactionUri, {
        targetId,
        targetType,
        type,
      });
      //console.log(response?.data);

      return {
        targetId,
        targetType,
        data: response.data || response.data?.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "রিঅ্যাক্ট করতে সমস্যা হয়েছে",
      );
    }
  },
);
const initialState = {
  loadingIds: {}, // কোন কোন পোস্ট/কমেন্টে এই মুহূর্তে রিকোয়েস্ট চলছে তা ট্র্যাক করার জন্য
  error: null,
};

const reactionSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleReaction.pending, (state, action) => {
        const { targetId } = action.meta.arg;
        state.loadingIds[targetId] = true;
        state.error = null;
      })
      .addCase(toggleReaction.fulfilled, (state, action) => {
        const { targetId } = action.payload;
        delete state.loadingIds[targetId];
      })
      .addCase(toggleReaction.rejected, (state, action) => {
        const { targetId } = action.meta.arg;
        delete state.loadingIds[targetId];
        state.error = action.payload || action.error?.message;
      });
  },
});

export default reactionSlice.reducer;
