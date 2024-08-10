import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchEverything, sources } from "../api/newsAPI";
import ArticleCard from "./ArticleCard";
import NewsAPIFilters from "./NewsAPIFilters";
import PaginationComponent from "./Pagination";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import { Country, NewsAPI, Sources } from "../new-app.interface";
import { useAppSelector } from "../hooks/hooks";

const NewsAPIPage: React.FC = () => {
  const status = useAppSelector((state: any) => state.newsapi?.loading);

  const [articles, setArticles] = useState<NewsAPI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode] = useState("grid");

  const [categories] = useState<string[]>(NEW_API_CONSTANTS.categoryList);
  const [countries] = useState<Country[]>(NEW_API_CONSTANTS.countries);

  const [selectedCountry, setSelectedCountry] = useState<string>(
    NEW_API_CONSTANTS.countries[0].countryShortCode
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sourcesForNews, setSourcesForNews] = useState<Sources[]>([]);

  const [selectedSources, setSelectedSources] = useState<string>();

  useEffect(() => {
    console.log(status);
    if (status) {
      fetchEverything({
        page: currentPage,
        pageSize: pageSize,
        sources: selectedSources,
      })
        .then((response) => {
          setArticles(response?.articles);
          setTotalPages(Math.ceil(response.totalResults / 10));
          console.log(totalPages);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [status, currentPage, selectedSources, pageSize]);

  useEffect(() => {
    if (status) {
      sources(selectedCategory, selectedCountry).then((sources) => {
        setSourcesForNews(sources);
      });
    }
  }, [status, selectedCategory, selectedCountry]);

  useEffect(() => {
    console.log(selectedSources);
  }, [selectedSources]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
  };

  return (
    <>
      <NewsAPIFilters
        categories={categories}
        countries={countries}
        sources={sourcesForNews}
        selectedCountry={selectedCountry}
        selectedCategory={selectedCategory}
        onCountrySelect={handleCountrySelect}
        onCategorySelect={handleCategorySelect}
        onSourceSelect={setSelectedSources}
      />
      <Row>
        {articles.length
          ? articles.map((article, index) => (
              <Col key={index} sm={12} md={viewMode === "grid" ? 4 : 12}>
                <ArticleCard
                  title={article.title}
                  description={
                    article.description || "No description available"
                  }
                  imageUrl={article.urlToImage}
                  articleUrl={article.url}
                />
              </Col>
            ))
          : articles?.length === 0 && <p>No articles found</p>}
      </Row>
      <Row>
        <Col>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewsAPIPage;
