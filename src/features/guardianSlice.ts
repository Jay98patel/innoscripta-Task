import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticlesFromGuardian } from "../api/guardianAPI";
import { GuardianParams } from "../new-app.interface";

export const fetchGuardianArticles = createAsyncThunk(
  "guardian/fetchArticles",
  async (params: GuardianParams) => {
    const response = await fetchArticlesFromGuardian(params);
    return response.results;
  }
);

const guardianSlice = createSlice({
  name: "guardian",
  initialState: {
    articles: [],
    loading: false,
    error: null as string | null, // Change here to accept string or null
  },
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
      // Ensure error is always a string
      state.error = action.error.message || "An unexpected error occurred";
    });
  },
});

export default guardianSlice.reducer;
