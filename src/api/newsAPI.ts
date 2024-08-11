import axios from "axios";

import {
  NewsAPIMainHeaderResponse,
  NewsAPIParams,
  Sources,
  TopHeadLines,
} from "../new-app.interface";

const NEWSAPI_BASEURL = "https://newsapi.org/v2";
const EVERYTHING = "everything";
const TOP_HEADLINES = "top-headlines";
const SOURCES = "sources";
const apiKeys = JSON.parse(localStorage.getItem("newsApi") || "[]");
let currentApiIndex = 0;

async function makeApiRequest<T>(
  endpoint: string,
  params: object,
  startTime?: number
): Promise<T> {
  const maxRetryDuration = 7000;

  if (!startTime) startTime = Date.now();

  try {
    const response = await axios.get(`${NEWSAPI_BASEURL}/${endpoint}`, {
      params: { apiKey: apiKeys[currentApiIndex], ...params },
    });
    return response.data;
  } catch (error: any) {
    const currentTime = Date.now();
    if (
      apiKeys.length > 0 &&
      currentTime - startTime < maxRetryDuration &&
      error?.response?.data?.code !== "parametersMissing"
    ) {
      currentApiIndex = (currentApiIndex + 1) % apiKeys.length;
      return makeApiRequest<T>(endpoint, params, startTime);
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
