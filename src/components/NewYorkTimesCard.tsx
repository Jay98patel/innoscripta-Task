// src/components/ArticleCard.tsx

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Article, setCurrentArticle } from "../features/nytimesSlice";

const NewYorkTimesCard: React.FC<Partial<Article>> = ({
  title,
  _id,
  headline,
  snippet,
  multimedia,
  web_url,
  description,
  imageUrl,
  articleUrl,
  document_type,
  lead_paragraph,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReadMore = () => {
    dispatch(
      setCurrentArticle({
        _id: _id ?? "",
        headline: headline ?? { main: "" },
        snippet: snippet ?? "",
        multimedia: multimedia ?? [],
        web_url: web_url ?? "",
        title: title ?? "",
        description: description ?? "",
        imageUrl,
        articleUrl,
        document_type,
        lead_paragraph,
      })
    );
    navigate(`/new-york-times-articles`);
  };

  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={imageUrl ?? "../../assets/placeholders/no-image.svg"}
          alt={headline?.main ?? title}
        />
        <Card.Body>
          <Card.Title>{headline?.main ?? title}</Card.Title>
          <Card.Text>{description ?? snippet}</Card.Text>
        </Card.Body>
        {articleUrl && (
          <Card.Footer className="d-flex align-items-center gap-3 justify-content-between">
            <Link
              to={articleUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Full Article
            </Link>
            <Button variant="info" onClick={handleReadMore}>
              View Details
            </Button>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default NewYorkTimesCard;
