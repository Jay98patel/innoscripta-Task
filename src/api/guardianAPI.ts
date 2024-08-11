import axios from "axios";
import { GuardianParams, GuardianResponse } from "../new-app.interface";

const BASE_URL = "https://content.guardianapis.com/search";
let index = 0;

export const fetchArticlesFromGuardian = async (
  params: Partial<GuardianParams>
): Promise<GuardianResponse> => {
  const apiKeys = JSON.parse(localStorage.getItem("guardianApi")!);

  if (!apiKeys || apiKeys.length === 0) {
    throw new Error("API keys not found in localStorage");
  }

  try {
    const response = await axios.get<GuardianResponse>(BASE_URL, {
      params: {
        "api-key": apiKeys[index],
        ...params,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch articles from The Guardian with key",
      apiKeys[index],
      error
    );
    index = (index + 1) % apiKeys.length;
    if (index === 0) {
      throw new Error("All API keys failed to fetch articles");
    }
    return fetchArticlesFromGuardian(params);
  }
};
