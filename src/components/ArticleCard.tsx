// src/components/ArticleCard.tsx

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GenericArticleProps } from "../new-app.interface";

// Making the component generic
const ArticleCard = <T extends string>({
  title,
  description,
  imageUrl,
  articleUrl,
}: Partial<GenericArticleProps<T>>) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={imageUrl ?? "../../assets/placeholders/no-image.svg"}
        alt={title}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          variant="primary"
          onClick={() => window.open(articleUrl, "_blank")}
        >
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
