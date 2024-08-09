import axios from "axios";
import { NYTParams } from "../new-app.interface";

const API_KEY = process.env.REACT_APP_NYT_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const fetchArticlesFromNYT = async (params: NYTParams) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        "api-key": API_KEY,
        ...params,
      },
    });
    return response.data.response.docs;
  } catch (error) {
    throw new Error("Failed to fetch articles from The New York Times");
  }
};
