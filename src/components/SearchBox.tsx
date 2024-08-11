import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      onSearch(value);
    }, 500);
    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return (
    <>
      <Form>
        <Form.Control
          type="search"
          value={input}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </Form>
    </>
  );
};

export default SearchBox;
