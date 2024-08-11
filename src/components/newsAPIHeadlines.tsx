import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import {
  fetchNewsAPIHeadlines,
  setSelectedCountry,
} from "../features/newsAPISlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Article, NewsAPI } from "../new-app.interface";

interface Country {
  countryShortCode: string;
  countryName: string;
}

const NewsAPIHeadlines = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.newsapi);

  const { headlines } = useAppSelector((state) => state.newsapi) as {
    articles: NewsAPI[];
    headlines: Article[];
  };
  const [country, setCountry] = useState<string>(
    NEW_API_CONSTANTS.countries[13].countryShortCode
  );

  useEffect(() => {
    if (!loading) {
      dispatch(fetchNewsAPIHeadlines({ country, pageSize: 10 }));
    }
  }, [country, dispatch]);

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
          {headlines &&
            headlines.map((headline: Article) => (
              <li key={headline.url || headline.title}>
                {" "}
                {/* Using URL or title as key */}
                <h2>{headline.author}</h2>
                <p>{headline.description || "No description available."}</p>
                <a
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
