import React from "react";
import { Row, Col, Badge, Form } from "react-bootstrap";
import FilterDropdown from "../components/FilterDropdown";
import { Country, Sources } from "../new-app.interface";

interface NewsAPIFiltersProps {
  categories: string[];
  countries: Country[];
  sources: Sources[];
  selectedCountry: string;
  selectedSource?: string;
  selectedCategory?: string;
  onCountrySelect: (countryCode: string) => void;
  onCategorySelect: (category: string) => void;
  onSourceSelect: (sourceId: string) => void;
}

const NewsAPIFilters: React.FC<NewsAPIFiltersProps> = ({
  categories,
  countries,
  sources,
  selectedCountry,
  selectedSource,
  onCountrySelect,
  onCategorySelect,
  onSourceSelect,
}) => {
  return (
    <>
      <Form>
        <div>
          <Form.Label>Country:</Form.Label>
        </div>
        {countries.map((country, index) => (
          <Badge
            key={index}
            bg={
              selectedCountry === country.countryShortCode ? "primary" : "light"
            }
            text="dark"
            onClick={() => onCountrySelect(country.countryShortCode)}
            style={{ cursor: "pointer", marginRight: "5px" }}
          >
            {country.countryName}
          </Badge>
        ))}
        <Row className="my-4">
          <Col lg={10}>
            <Form.Label>
              Please select a source to view its articles:
            </Form.Label>
            <Form.Select
              value={selectedSource}
              onChange={(e) => onSourceSelect(e.target.value)}
            >
              {sources.length > 0 ? (
                sources.map((source, index) => (
                  <option key={index} value={source.id}>
                    {source.name}
                  </option>
                ))
              ) : (
                <option value="">No sources available</option>
              )}
            </Form.Select>
          </Col>
          <Col lg={2}>
            <FilterDropdown
              placeholder="Filter by Category"
              options={categories}
              isNewApiPage={true}
              onSelect={onCategorySelect}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default NewsAPIFilters;
