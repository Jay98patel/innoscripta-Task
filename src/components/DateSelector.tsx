import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface DateSelectorProps {
  label: string;
  onDateChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ label, onDateChange }) => {
  const [date, setDate] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; 
    setDate(value);
    if (value) {
      const formattedDate = value.replace(/-/g, ""); 
      onDateChange(formattedDate);
    }
  };

  return (
    <>
      <Form.Group>
        <Form.Label>{label}:</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={handleChange}
          placeholder="YYYY-MM-DD"
        />
      </Form.Group>
    </>
  );
};

export default DateSelector;
