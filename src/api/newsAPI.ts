import axios from "axios";
import { NewsAPI, NewsAPIParams, Sources } from "../new-app.interface";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWSAPI_BASEURL = "https://newsapi.org/v2";
const EVERYTHING = "everything";
const TOP_HEADLINES = "top-headlines";
const SOURCES = "sources";

export const fetchEverything = async (params: NewsAPIParams) => {
  try {
    const response = await axios.get(`${NEWSAPI_BASEURL}/${EVERYTHING}`, {
      params: { apiKey: API_KEY, ...params },
    });
    return response.data.articles;
  } catch (error) {
    throw new Error("Failed to fetch news from NewsAPI");
  }
};

export const fetchTopHeadlines = async (params: NewsAPIParams) => {
  try {
    const response = await axios.get(`${NEWSAPI_BASEURL}/${TOP_HEADLINES}`, {
      params: { apiKey: API_KEY, ...params },
    });
    return response.data.articles as NewsAPI[];
  } catch (error) {
    throw new Error("Failed to fetch top headlines from NewsAPI");
  }
};

export const sources = async (category: string, country: string) => {
  try {
    const response = await axios.get(`${NEWSAPI_BASEURL}/${SOURCES}`, {
      params: { apiKey: API_KEY, category, country },
    });
    return response.data.sources as Sources[];
  } catch (error) {
    throw new Error("Failed to fetch sources from NewsAPI");
  }
};
