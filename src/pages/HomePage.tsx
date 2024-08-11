import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NewsAPIHeadlines from "../components/newsAPIHeadlines";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Container className="p-3">
      <div>
        <h1>Welcome to the News Portal!</h1>
        <p>
          This is your one-stop hub for the latest news from various sources.
        </p>
      </div>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleNavigate("/guardian")}
          >
            The Guardian
          </Button>
        </Col>
        <Col md="auto">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleNavigate("/nytimes")}
          >
            The New York Times
          </Button>
        </Col>
        <Col xs lg="2">
          <Button
            variant="success"
            size="lg"
            onClick={() => handleNavigate("/newsapi")}
          >
            NewsAPI
          </Button>
        </Col>
      </Row>
      <NewsAPIHeadlines />
    </Container>
  );
};

export default HomePage;
