// src/pages/NYTimesPage.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import ArticleCard from "../components/ArticleCard";
import FilterDropdown from "../components/FilterDropdown";
import PaginationComponent from "../components/Pagination";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import { fetchNYTArticles } from "../features/nytimesSlice";

const NYTimesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.nytimes
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    dispatch(fetchNYTArticles({ page: currentPage, sort: sortOrder }));
  }, [dispatch, currentPage, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

  return (
    <div>
      <FilterDropdown
        options={NEW_API_CONSTANTS.sortKeys}
        onSelect={handleSortChange}
        placeholder="Sort by"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading &&
        !error &&
        articles.map((article) => (
          <ArticleCard
            key={article._id}
            title={article.headline.main}
            description={article.snippet}
            imageUrl={
              article.multimedia.length > 0
                ? `https://www.nytimes.com/${article.multimedia[0].url}`
                : undefined
            }
            articleUrl={article.web_url}
          />
        ))}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />{" "}
      {/* totalPages should be dynamic based on API response */}
    </div>
  );
};

export default NYTimesPage;
