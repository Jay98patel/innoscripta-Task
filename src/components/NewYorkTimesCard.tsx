// src/components/ArticleCard.tsx

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GenericArticleProps } from "../new-app.interface";
import { Article, setCurrentArticle } from "../features/nytimesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const multimediaImageUrl =
    multimedia && multimedia.length > 0
      ? `https://www.nytimes.com/${multimedia[0].url}`
      : undefined;

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
      })
    );
    const id = _id ?? "";
    console.log("Current article:", id);
    navigate(`/new-york-times-articules`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <div>{title}</div>
      <div>{description}</div>
      <img src={imageUrl} alt={title} />
      <div>{articleUrl}</div>
      <Card.Img
        variant="top"
        src={multimediaImageUrl ?? "../../assets/placeholders/no-image.svg"}
        alt={headline && headline.main}
      />
      <Card.Body>
        <Card.Title>{headline && headline.main}</Card.Title>
        <Card.Text>{snippet}</Card.Text>
        <Button variant="primary" onClick={handleReadMore}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewYorkTimesCard;
