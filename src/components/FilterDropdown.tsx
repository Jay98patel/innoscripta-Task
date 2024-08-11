import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FilterDropdownProps } from "../new-app.interface";
import { FormLabel } from "react-bootstrap";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  placeholder,
  isNewApiPage,
  onSelect,
}) => {
  const [filter, setFilter] = useState<string>();
  return (
    <>
      {isNewApiPage && <FormLabel>Filter By:</FormLabel>}
      <Dropdown>
        <Dropdown.Toggle
          variant="outline-primary"
          className="text-capitalize"
          id="dropdown-sort"
        >
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
              {option.toUpperCase()}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default FilterDropdown;
