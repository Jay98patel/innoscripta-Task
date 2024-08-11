import React from "react";
import { Dropdown } from "react-bootstrap";

interface SortingProps {
  onSortChange: (sortOrder: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-sort">
        <i className="bi bi-funnel"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSortChange("newest")}>
          <i className="bi bi-sort-down-alt me-2"></i> Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSortChange("oldest")}>
          <i className="bi bi-sort-up me-2"></i> Oldest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSortChange("relevance")}>
          <i className="bi bi-bar-chart me-2"></i> Relevance
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sorting;
