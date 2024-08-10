// src/pages/NYTimesPage.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import ArticleCard from "../components/ArticleCard";
import FilterDropdown from "../components/FilterDropdown";
import PaginationComponent from "../components/Pagination";
import SearchBox from "../components/SearchBox"; // Import the SearchBox component
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import { fetchNYTArticles } from "../features/nytimesSlice";
import DateSelector from "../components/DateSelector";
import NewYorkTimesCard from "../components/NewYorkTimesCard";

const NYTimesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, loading, error } = useSelector(
    (state: RootState) => state.nytimes
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [beginDate, setBeginDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(
      fetchNYTArticles({
        page: currentPage,
        sort: sortOrder,
        q: searchQuery,
      })
    );
  }, [dispatch, currentPage, sortOrder, searchQuery]);

  useEffect(() => {
    if (beginDate && endDate && beginDate < endDate) {
      dispatch(
        fetchNYTArticles({
          page: currentPage,
          sort: sortOrder,
          q: searchQuery,
          begin_date: beginDate,
          end_date: endDate,
        })
      );
    }
  }, [dispatch, currentPage, sortOrder, searchQuery, beginDate, endDate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <DateSelector label="From Date" onDateChange={setBeginDate} />
      <DateSelector label="To Date" onDateChange={setEndDate} />
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
          console.log(article),
          <NewYorkTimesCard
            key={article._id}
            _id={article._id}
            headline={article.headline}
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
        totalPages={10} // Update based on API response
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NYTimesPage;
