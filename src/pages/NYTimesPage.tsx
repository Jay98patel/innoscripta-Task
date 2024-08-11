import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import DateSelector from "../components/DateSelector";
import FilterDropdown from "../components/FilterDropdown";
import NewYorkTimesCard from "../components/NewYorkTimesCard";
import PaginationComponent from "../components/Pagination";
import SearchBox from "../components/SearchBox"; 
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import { fetchNYTArticles } from "../features/nytimesSlice";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../components/Loading";

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
    <Container className="py-3 py-lg-5">
      <div className="d-flex gap-3 mb-4">
        <div className="flex-grow-1">
          <SearchBox onSearch={handleSearch} />
        </div>
        <FilterDropdown
          isNewApiPage={false}
          options={NEW_API_CONSTANTS.sortKeys}
          onSelect={handleSortChange}
          placeholder="Sort by"
        />
      </div>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <DateSelector label="From Date" onDateChange={setBeginDate} />
        </Col>
        <Col md={4}>
          <DateSelector label="To Date" onDateChange={setEndDate} />
        </Col>
      </Row>
      {loading && (
        <Loading />
      )}
      {error && <p>Error: {error}</p>}
      <div className="news-cards">
        {!loading &&
          !error &&
          articles.map((article) => (
            <NewYorkTimesCard
              key={article._id}
              _id={article._id}
              headline={article.headline}
              title={article.headline.main}
              description={article.snippet}
              document_type={article.document_type}
              lead_paragraph={article.lead_paragraph}
              snippet={article.snippet}
              web_url={article.web_url}
              imageUrl={
                article.multimedia.length > 0
                  ? `https://www.nytimes.com/${article.multimedia[0].url}`
                  : undefined
              }
              articleUrl={article.web_url}
            />
          ))}
      </div>
      <div className="d-flex justify-content-end mt-4">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
};

export default NYTimesPage;
