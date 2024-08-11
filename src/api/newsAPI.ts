import axios from "axios";

// Interfaces from your app
import {
  NewsAPI,
  NewsAPIMainHeaderResponse,
  NewsAPIParams,
  Sources,
  TopHeadLines,
} from "../new-app.interface";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWSAPI_BASEURL = "https://newsapi.org/v2";
const EVERYTHING = "everything";
const TOP_HEADLINES = "top-headlines";
const SOURCES = "sources";
const apiKeys = JSON.parse(localStorage.getItem("newsApi") || "[]");
let currentApiIndex = 0;

// Helper function to handle repetitive API request logic
async function makeApiRequest<T>(endpoint: string, params: object): Promise<T> {
  try {
    const response = await axios.get(`${NEWSAPI_BASEURL}/${endpoint}`, {
      params: { apiKey: apiKeys[currentApiIndex], ...params },
    });
    return response.data;
  } catch (error) {
    if (apiKeys.length > 0) {
      currentApiIndex = (currentApiIndex + 1) % apiKeys.length;
      setTimeout(() => makeApiRequest(endpoint, params), 4000);
    }
    throw new Error(`Failed to fetch data from ${endpoint}: ${error}`);
  }
}

export const fetchEverything = async (
  params: NewsAPIParams
): Promise<NewsAPIMainHeaderResponse> => {
  return makeApiRequest<NewsAPIMainHeaderResponse>(EVERYTHING, params);
};

export const fetchTopHeadlines = async (
  params: NewsAPIParams
): Promise<TopHeadLines> => {
  return makeApiRequest<TopHeadLines>(TOP_HEADLINES, params);
};

export const fetchSources = async (
  category: string,
  country: string
): Promise<Sources[]> => {
  return makeApiRequest<Sources[]>(SOURCES, { category, country });
};
