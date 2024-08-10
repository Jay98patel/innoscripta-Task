import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FilterDropdownProps } from "../new-app.interface";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  placeholder,
  onSelect,
}) => {
  const [filter, setFilter] = useState<string>();
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {filter ?? placeholder}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item
            key={option}
            onClick={() => {
              onSelect(option);
              setFilter(option);
            }}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
