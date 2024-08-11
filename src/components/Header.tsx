import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Navbar expand="lg" className="shadow z-3">
      <Container>
        <Navbar.Brand href="/">News Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => handleNavigate("/guardian")}
              active={location.pathname === "/guardian"}
            >
              The Guardian
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigate("/nytimes")}
              active={location.pathname === "/nytimes"}
            >
              The New York Times
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigate("/newsapi")}
              active={location.pathname === "/newsapi"}
            >
              NewsAPI
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <ThemeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
