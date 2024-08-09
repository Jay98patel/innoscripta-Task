import axios from "axios";
import { GuardianParams } from "../new-app.interface";

const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const BASE_URL = "https://content.guardianapis.com/search";

export const fetchArticlesFromGuardian = async (params: GuardianParams) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        "api-key": API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch articles from The Guardian");
  }
};
