import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticlesFromNYT } from "../api/nytimesAPI";
import { NYTParams } from "../new-app.interface"; // Ensure this interface is correctly defined

export const fetchNYTArticles = createAsyncThunk(
  "nytimes/fetchArticles",
  async (params: NYTParams) => {
    const response = await fetchArticlesFromNYT(params);
    return response; // Assuming response is structured correctly for direct use
  }
);

const nytimesSlice = createSlice({
  name: "nytimes",
  initialState: {
    articles: [],
    loading: false,
    error: null as string | null, // Updated to allow null or string
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNYTArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNYTArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchNYTArticles.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An unexpected error occurred"; // Handling undefined case
    });
  },
});

export default nytimesSlice.reducer;
