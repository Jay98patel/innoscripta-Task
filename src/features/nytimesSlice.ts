// src/features/nytimesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticlesFromNYT } from "../api/nytimesAPI";

export const fetchNYTArticles = createAsyncThunk(
  "nytimes/fetchArticles",
  async (
    params: {
      page: number;
      sort: string;
      q?: string;
      begin_date?: string;
      end_date?: string;
    },
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
export interface Article {
  title: string;
  _id: string;
  headline: { main: string };
  snippet: string;
  multimedia: { url: string }[];
  web_url: string;
  description: string;
  imageUrl?: string;
  articleUrl?: string;
}

interface NYTimesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  currentArticle: Article | null;
}

const initialState: NYTimesState = {
  articles: [],
  loading: false,
  error: null,
  currentArticle: null,
};

const nytimesSlice = createSlice({
  name: "nytimes",
  initialState,
  reducers: {
    setCurrentArticle: (state, action: PayloadAction<Article>) => {
      state.currentArticle = action.payload;
    },
  },
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
export const { setCurrentArticle } = nytimesSlice.actions;
export default nytimesSlice.reducer;
