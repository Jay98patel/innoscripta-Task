import React from "react";
import { Dropdown } from "react-bootstrap";

interface SortingProps {
  onSortChange: (sortOrder: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-sort">
        Sort By
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSortChange("newest")}>
          Newest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSortChange("oldest")}>
          Oldest
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSortChange("relevance")}>
          Relevance
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sorting;
