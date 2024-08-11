import React, { useContext, useEffect, useState } from "react";
import { Card, Container, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import newsIllustratorGifDark from "../assets/images/news-illustrator-dark.gif";
import newsIllustratorGifLight from "../assets/images/news-illustrator.gif";
import { ThemeContext } from "../components/ThemeContext";
import NewsAPIHeadlines from "../components/newsAPIHeadlines";

const HomePage: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [newsIllustratorGif, setNewsIllustratorGif] = useState(
    newsIllustratorGifLight
  );

  useEffect(() => {
    // const storedTheme = localStorage.getItem("theme");
    if (theme === "dark") {
      setNewsIllustratorGif(newsIllustratorGifDark);
    } else {
      setNewsIllustratorGif(newsIllustratorGifLight);
    }
  }, [theme]);

  const newsSources = [
    {
      title: "The Guardian",
      text: "Access the latest articles and reports from The Guardian.",
      link: "/guardian",
      buttonText: "Go to The Guardian",
      buttonVariant: "primary",
    },
    {
      title: "The New York Times",
      text: "Stay informed with top stories and news from The New York Times.",
      link: "/nytimes",
      buttonText: "Go to The New York Times",
      buttonVariant: "secondary",
    },
    {
      title: "NewsAPI",
      text: "Discover global news from various sources with NewsAPI.",
      link: "/newsapi",
      buttonText: "Go to NewsAPI",
      buttonVariant: "success",
    },
  ];

  return (
    <>
      <Container className="py-5">
        <div className="d-flex flex-column gap-4 flex-lg-row justify-content-center align-items-center py-lg-5">
          <div className="text-center text-lg-start">
            <Figure>
              <Figure.Image
                alt="News Illustrator"
                src={newsIllustratorGif}
                className="img-fluid"
              />
            </Figure>
            <h1>Welcome to the News Portal!</h1>
            <p className="text-body-tertiary mb-0">
              This is your one-stop hub for the latest news from various
              sources.
            </p>
          </div>

          <div className="ms-lg-auto d-flex flex-column gap-4">
            {newsSources.map((card, index) => (
              <Link to={card.link} key={index} className="text-decoration-none">
                <Card className="source-card">
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <NewsAPIHeadlines />
      </Container>
    </>
  );
};

export default HomePage;
