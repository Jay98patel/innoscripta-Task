import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { fetchSources } from "../api/newsAPI";
import ArticleCard from "../components/ArticleCard";
import NewsAPIFilters from "../components/NewsAPIFilters";
import NoArticleFound from "../components/NoArticleFound";
import PaginationComponent from "../components/Pagination";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import {
  clearArticlesAndSources,
  fetchNewsAPIArticles,
  setCurrentPage,
  setSelectedCategory,
  setSelectedCountry,
  setSelectedSource,
  startLoading,
  stopLoading,
} from "../features/newsAPISlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { NewsAPI, Sources } from "../new-app.interface";

const NewsAPIPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles }: { articles: NewsAPI[] } = useAppSelector(
    (state) => state.newsapi
  );
  const { filters, pagination, loading } = useAppSelector(
    (state) => state.newsapi
  );
  const [sourcesForNews, setSourcesForNews] = useState<Sources[]>([]);

  useEffect(() => {
    if (!loading) {
      dispatch(startLoading());
      dispatch(
        fetchNewsAPIArticles({
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
          sources: filters.selectedSource ?? sourcesForNews[0]?.id,
        })
      ).finally(() => dispatch(stopLoading()));
    }
  }, [dispatch, pagination.currentPage, filters, pagination.pageSize]);

  useEffect(() => {
    dispatch(startLoading());
    fetchSources(filters.selectedCategory, filters.selectedCountry)
      .then((retrievedSources: any) => {
        setSourcesForNews(retrievedSources?.sources);
        console.log(retrievedSources);
        dispatch(stopLoading());
      })
      .catch((error: Error) => {
        console.error("Failed to fetch sources:", error);
        dispatch(stopLoading());
      });
  }, [filters.selectedCategory, filters.selectedCountry, dispatch]);
  return (
    <>
      <Container className="py-3 py-lg-5">
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
        <div className="d-grid news-cards gap-4">
          {articles.map((article, index) => (
            <ArticleCard
              key={index} // Remember to use a key when mapping
              title={article.title}
              description={article.description || "No description available"}
              imageUrl={article.urlToImage}
              articleUrl={article.url}
            />
          ))}
        </div>
        {articles.length === 0 && <NoArticleFound />}
        <div className="d-flex justify-content-end mt-4">
          <PaginationComponent
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </div>
      </Container>
    </>
  );
};

export default NewsAPIPage;
