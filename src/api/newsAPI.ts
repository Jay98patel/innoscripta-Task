import axios from "axios";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const EVERYTHING_URL = "https://newsapi.org/v2/everything";
const TOP_HEADLINES_URL = "https://newsapi.org/v2/top-headlines";

interface NewsAPIParams {
  q?: string;
  country?: string;
  category?: string;
  sources?: string;
  pageSize?: number;
  page?: number;
}

export const fetchEverything = async (params: NewsAPIParams) => {
  try {
    const response = await axios.get(EVERYTHING_URL, {
      params: { apiKey: API_KEY, ...params },
    });
    return response.data.articles;
  } catch (error) {
    throw new Error("Failed to fetch news from NewsAPI");
  }
};

export const fetchTopHeadlines = async (params: NewsAPIParams) => {
  try {
    const response = await axios.get(TOP_HEADLINES_URL, {
      params: { apiKey: API_KEY, ...params },
    });
    return response.data.articles;
  } catch (error) {
    throw new Error("Failed to fetch top headlines from NewsAPI");
  }
};
