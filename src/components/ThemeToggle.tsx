import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "./ThemeContext";

const ThemeToggle: React.FC = () => {
//   const [theme, setTheme] = useState<string>("light");
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const handleSelect = (selectedTheme: string | null) => {
    if (selectedTheme) {
      localStorage.setItem("theme", selectedTheme);
      toggleTheme(selectedTheme);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
        toggleTheme(storedTheme);
    }
  }, [theme]);

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
        {theme === "light" ? (
          <i className="bi bi-brightness-high"></i>
        ) : (
          <i className="bi bi-moon"></i>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu align={"end"}>
        <Dropdown.Item
          eventKey="light"
          className="d-flex gap-2 align-items-center"
          active={theme === "light"}
        >
          <span className="bi bi-brightness-high me-2"></span> Light
          {theme === "light" && (
            <span className="bi bi-check2 d-flex align-items-center ms-auto"></span>
          )}
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="dark"
          className="d-flex gap-2 align-items-center"
          active={theme === "dark"}
        >
          <span className="bi bi-moon me-2"></span> Dark
          {theme === "dark" && (
            <span className="bi bi-check2 d-flex align-items-center ms-auto"></span>
          )}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThemeToggle;
