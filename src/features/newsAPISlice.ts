import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEverything, fetchTopHeadlines } from "../api/newsAPI";
import { Article, NewsAPI, NewsAPIParams } from "../new-app.interface";

// Fetch articles thunk
export const fetchNewsAPIArticles = createAsyncThunk(
  "newsapi/fetchArticles",
  async (params: NewsAPIParams, { rejectWithValue }) => {
    try {
      const response = await fetchEverything(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.toString());
      }
    }
  }
);

export const fetchNewsAPIHeadlines = createAsyncThunk(
  "newsapi/fetchHeadlines",
  async (params: NewsAPIParams, { rejectWithValue }) => {
    try {
      const response = await fetchTopHeadlines(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.toString());
      }
    }
  }
);

const initialState = {
  articles: [] as NewsAPI[],
  headlines: [] as Article[],
  filters: {
    selectedCountry: "",
    selectedSource: "",
    selectedCategory: "",
  },
  sources: [],
  pagination: {
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    viewMode: "grid",
  },
  loading: false,
  error: null as string | null,
};

const newsApiSlice = createSlice({
  name: "newsapi",
  initialState,
  reducers: {
    clearArticlesAndSources: (state) => {
      state.articles = [];
      state.sources = [];
      state.headlines = [];
      state.pagination.totalPages = 0;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.filters.selectedCountry = action.payload;
      state.articles = [];
      state.sources = [];
    },
    setSelectedSource: (state, action: PayloadAction<string>) => {
      state.filters.selectedSource = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.filters.selectedCategory = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.pagination.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAPIArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsAPIArticles.fulfilled, (state, action) => {
        if (action.payload) {
          // Check for undefined payload
          state.articles = action.payload.articles;
          state.pagination.totalPages = Math.ceil(
            action.payload.totalResults / state.pagination.pageSize
          );
        }
        state.loading = false;
      })
      .addCase(fetchNewsAPIHeadlines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsAPIHeadlines.fulfilled, (state, action) => {
        if (action.payload && action.payload.articles) {
          state.headlines = action.payload.articles;
          state.pagination.totalPages = Math.ceil(
            action.payload.totalResults / state.pagination.pageSize
          );
        }
        state.loading = false;
      })
      .addCase(fetchNewsAPIHeadlines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unexpected error occurred";
      });
  },
});

export const {
  setSelectedCountry,
  setSelectedSource,
  setSelectedCategory,
  setCurrentPage,
  setTotalPages,
  startLoading,
  stopLoading,
  clearArticlesAndSources,
} = newsApiSlice.actions;

export default newsApiSlice.reducer;
