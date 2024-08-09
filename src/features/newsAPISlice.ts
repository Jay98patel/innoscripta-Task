import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEverything } from "../api/newsAPI";
import { NewsAPIParams } from "../new-app.interface";

export const fetchNewsAPIArticles = createAsyncThunk(
  "newsapi/fetchArticles",
  async (params: NewsAPIParams) => {
    // Use the correct type instead of any if you have it defined
    const response = await fetchEverything(params); // Adjust according to your actual API function
    return response;
  }
);

const newsApiSlice = createSlice({
  name: "newsapi",
  initialState: {
    articles: [],
    loading: false,
    error: null as string | null, // Allow the error to be either string or null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNewsAPIArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNewsAPIArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchNewsAPIArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An unexpected error occurred";
    });
  },
});

export default newsApiSlice.reducer;
