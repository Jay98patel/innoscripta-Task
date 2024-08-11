// newsAPIHeadlines.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopHeadlines } from "../api/newsAPI";
import { RootState } from "../app/store";
import {
  setSelectedCountry,
  startLoading,
  stopLoading,
} from "../features/newsAPISlice";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import { NewsAPI } from "../new-app.interface";
import { useAppSelector } from "../hooks/hooks";

interface Country {
  countryShortCode: string;
  countryName: string;
}

const NewsAPIHeadlines = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.newsapi);

  const { articles }: { articles: NewsAPI[] } = useAppSelector(
    (state) => state.newsapi
  );
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    // if (country) {
    dispatch(startLoading());
    fetchTopHeadlines({ country, pageSize: 10 })
      .then((data) => {
        dispatch({
          type: "newsapi/fetchHeadlinesFulfilled",
          payload: data.articles,
        });
      })
      .catch((error) => {
        dispatch({
          type: "newsapi/fetchHeadlinesRejected",
          error: error.toString(),
        });
      })
      .finally(() => {
        dispatch(stopLoading());
      });
    // }
  }, [dispatch]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
    dispatch(setSelectedCountry(event.target.value));
  };

  return (
    <div>
      <h1>Top Headlines</h1>
      <select value={country} onChange={handleCountryChange}>
        {NEW_API_CONSTANTS.countries.map((country: Country) => (
          <option
            key={country.countryShortCode}
            value={country.countryShortCode}
          >
            {country.countryName}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsAPIHeadlines;
