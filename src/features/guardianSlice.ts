import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticlesFromGuardian } from "../api/guardianAPI";
import {
  GuardianArticle,
  GuardianParams,
  GuardianState,
} from "../new-app.interface";

export const fetchGuardianArticles = createAsyncThunk(
  "guardian/fetchArticles",
  async (params: GuardianParams): Promise<GuardianArticle[]> => {
    const response = await fetchArticlesFromGuardian(params);
    return response.response.results;
  }
);

const initialState: GuardianState = {
  articles: [],
  loading: false,
  error: null,
};

const guardianSlice = createSlice({
  name: "guardian",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuardianArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGuardianArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchGuardianArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An unexpected error occurred";
    });
  },
});

export default guardianSlice.reducer;
