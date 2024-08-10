import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ArticleCard from "./ArticleCard";
import NewsAPIFilters from "./NewsAPIFilters";
import PaginationComponent from "./Pagination";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  fetchNewsAPIArticles,
  setCurrentPage,
  setSelectedCountry,
  setSelectedCategory,
  setSelectedSource,
  startLoading,
  stopLoading,
  clearArticlesAndSources,
} from "../features/newsAPISlice";
import { sources } from "../api/newsAPI";
import { NewsAPI, Sources } from "../new-app.interface";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";

const NewsAPIPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles }: { articles: NewsAPI[] } = useAppSelector(
    (state) => state.newsapi
  );
  const { filters, pagination, loading } = useAppSelector(
    (state) => state.newsapi
  );
  const [sourcesForNews, setSourcesForNews] = useState<Sources[]>([]);
  const [loadingSources, setLoadingSources] = useState(false);

  useEffect(() => {
    // Dispatch fetch only if it's not already loading
    if (!loading) {
      dispatch(startLoading());
      dispatch(
        fetchNewsAPIArticles({
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          sources: filters.selectedSource,
        })
      ).finally(() => dispatch(stopLoading()));
    }
  }, [dispatch, pagination.currentPage, filters, pagination.pageSize]);

  useEffect(() => {
    dispatch(startLoading());
    sources(filters.selectedCategory, filters.selectedCountry)
      .then((retrievedSources) => {
        setSourcesForNews(retrievedSources);
        dispatch(stopLoading());
      })
      .catch((error) => {
        console.error("Failed to fetch sources:", error);
        dispatch(stopLoading());
      });
  }, [filters.selectedCategory, filters.selectedCountry, dispatch]);

  return (
    <>
      <NewsAPIFilters
        categories={NEW_API_CONSTANTS.categoryList}
        countries={NEW_API_CONSTANTS.countries}
        sources={sourcesForNews}
        selectedCountry={filters.selectedCountry}
        selectedCategory={filters.selectedCategory}
        selectedSource={filters.selectedSource}
        onCountrySelect={(country) => {
          dispatch(setSelectedCountry(country));
          dispatch(clearArticlesAndSources());
        }}
        onCategorySelect={(category) => {
          dispatch(setSelectedCategory(category));
          dispatch(clearArticlesAndSources());
        }}
        onSourceSelect={(source) => dispatch(setSelectedSource(source))}
      />
      <Row>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <Col
              key={index}
              sm={12}
              md={pagination.viewMode === "grid" ? 4 : 12}
            >
              viewMode: "grid" | "list";
              <ArticleCard
                title={article.title}
                description={article.description || "No description available"}
                imageUrl={article.urlToImage}
                articleUrl={article.url}
              />
            </Col>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </Row>
      <Row>
        <Col>
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewsAPIPage;
