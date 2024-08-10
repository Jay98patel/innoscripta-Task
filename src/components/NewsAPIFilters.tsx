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
        <Row>
          <Col md={6}>
            <FilterDropdown
              placeholder="Filter by Category"
              options={categories}
              onSelect={onCategorySelect}
            />
          </Col>
          <Col>
            {countries.map((country, index) => (
              <Badge
                key={index}
                bg={
                  selectedCountry === country.countryShortCode
                    ? "primary"
                    : "secondary"
                }
                onClick={() => onCountrySelect(country.countryShortCode)}
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
        </Row>
      </Form>
    </>
  );
};

export default NewsAPIFilters;
