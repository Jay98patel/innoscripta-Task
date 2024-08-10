import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { fetchEverything, sources } from "../api/newsAPI";
import ArticleCard from "../components/ArticleCard";
import PaginationComponent from "../components/Pagination";
import { Country, NewsAPI, Sources } from "../new-app.interface";
import Form from "react-bootstrap/Form";
import { NEW_API_CONSTANTS } from "../constants/new-api.constants";
import Badge from "react-bootstrap/Badge";
import { useDispatch } from "react-redux";
import { setSelectedfilters } from "../features/newsAPISlice";
import FilterDropdown from "../components/FilterDropdown";

const NewsAPIPage: React.FC = () => {
  const dispatch = useDispatch();

  const [articles, setArticles] = useState<NewsAPI[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [sourcesForNews, setSourcesForNews] = useState<Sources[]>([]);
  const [categories] = useState<string[]>(NEW_API_CONSTANTS.categoryList);
  const [countries] = useState<Country[]>(NEW_API_CONSTANTS.countries);
  const [selectedSources, setSelectedSources] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    NEW_API_CONSTANTS.categoryList[0]
  );
  const [selectedCountry, setSelectedCountry] = useState<string>(
    NEW_API_CONSTANTS.countries[0].countryShortCode
  );

  useEffect(() => {
    fetchEverything({ page: currentPage })
      .then((response) => {
        setArticles(response.articles);
        setTotalPages(Math.ceil(response.totalResults / 10));
      })
      .catch((error) => console.error("Failed to fetch articles:", error));
  }, [currentPage]);

  useEffect(() => {
    console.log(selectedCountry, selectedCategory);
    // sources(selectedCategory, selectedCountry)
    //   .then((response) => {
    //     console.log(response);
    //     setSourcesForNews(response);
    //   })
    //   .catch((error) => console.error("Failed to fetch sources:", error));
  }, [selectedCountry, selectedCategory]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleViewMode = (value: string) => {
    setViewMode(value);
  };

  return (
    <>
      <Form>
        <Row>
          <Col md={6}>
            <FilterDropdown
              placeholder="Filter by Category"
              options={categories}
              onSelect={setSelectedCategory}
            ></FilterDropdown>
          </Col>
        </Row>
        <Row>
          <Col>
            {countries.map((country, index) => (
              <Badge
                key={index}
                bg={
                  selectedCountry === country.countryShortCode
                    ? "primary"
                    : "secondary"
                }
                onClick={() => setSelectedCountry(country.countryShortCode)}
                style={{ cursor: "pointer", marginRight: "5px" }}
              >
                {country.countryName}
              </Badge>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Select
              onChange={(event) => {
                setSelectedSources(event.target.value);
              }}
            >
              {sourcesForNews.length > 0 ? (
                sourcesForNews.map((source, index) => (
                  <option key={index} value={source.id}>
                    {source.name}
                  </option>
                ))
              ) : (
                <option value="">No sources available</option>
              )}
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <ToggleButtonGroup
              type="radio"
              name="viewMode"
              defaultValue={viewMode}
              onChange={toggleViewMode}
            >
              <ToggleButton
                id="grid-view"
                value="grid"
                variant="outline-secondary"
              >
                Grid View
              </ToggleButton>
              <ToggleButton
                id="list-view"
                value="list"
                variant="outline-secondary"
              >
                List View
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </Form>
      <Row>
        {articles.map((article, index) => (
          <Col key={index} sm={12} md={viewMode === "grid" ? 4 : 12}>
            <ArticleCard
              title={article.title}
              description={article.description || "No description available"}
              imageUrl={article.urlToImage}
              articleUrl={article.url}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default NewsAPIPage;
