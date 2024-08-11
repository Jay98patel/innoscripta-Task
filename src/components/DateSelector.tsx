import React, { useState } from "react";

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
    <div>
      <label>{label}: </label>
      <input
        type="date"
        value={date}
        onChange={handleChange}
        placeholder="YYYYMMDD"
      />
    </div>
  );
};

export default DateSelector;
