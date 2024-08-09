import axios from "axios";

const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
const BASE_URL = "https://content.guardianapis.com/search";

interface GuardianParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  useDate?: string;
  fromDate?: string;
  toDate?: string;
}

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
