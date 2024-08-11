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
import { Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <>
      <h3 className="mb-3">Top Headlines</h3>
      <Form.Select className="mb-4" value={country} onChange={handleCountryChange}>
        {NEW_API_CONSTANTS.countries.map((country: Country) => (
          <option
            key={country.countryShortCode}
            value={country.countryShortCode}
          >
            {country.countryName}
          </option>
        ))}
      </Form.Select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex gap-4 flex-nowrap overflow-x-auto overflow-y-hidden p-2">
          {headlines &&
            headlines.map((headline: Article, index) => (
              <Card className="headlines-card flex-shrink-0">
                <Card.Body className="d-flex flex-column gap-3">
                  <Card.Title>{headline.title}</Card.Title>
                  <Link className="mt-auto ms-auto" to={headline.url} key={index}>
                    Read more
                  </Link>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </>
  );
};

export default NewsAPIHeadlines;
