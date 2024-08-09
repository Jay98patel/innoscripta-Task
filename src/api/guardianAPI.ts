import axios from "axios";
import { GuardianParams } from "../new-app.interface";

const BASE_URL = "https://content.guardianapis.com/search";
const API_KEY = process.env.REACT_APP_GUARDIAN_API ;

export const fetchArticlesFromGuardian = async (
  params: Partial<GuardianParams>
) => {
  console.log(API_KEY, BASE_URL, params);
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        "api-key": API_KEY,
        ...params,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch articles from The Guardian", error);
    throw new Error("Failed to fetch articles");
  }
};
