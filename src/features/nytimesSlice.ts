// src/features/nytimesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticlesFromNYT } from "../api/nytimesAPI";

export const fetchNYTArticles = createAsyncThunk(
  "nytimes/fetchArticles",
  async (
    params: { page: number; sort: string; q?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchArticlesFromNYT(params);
      return response;
    } catch (err) {
      return rejectWithValue("Failed to fetch articles");
    }
  }
);
interface Article {
  _id: string;
  headline: { main: string };
  snippet: string;
  multimedia: { url: string }[];
  web_url: string;
}

interface NYTimesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NYTimesState = {
  articles: [],
  loading: false,
  error: null,
};

const nytimesSlice = createSlice({
  name: "nytimes",
  initialState,
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
      state.error = action.error.message || "Failed to fetch articles";
    });
  },
});

export default nytimesSlice.reducer;
