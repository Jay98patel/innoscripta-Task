import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ArticleCardProps } from "../new-app.interface";

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  articleUrl,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl || "default-image-url.jpg"} />
      Provide a default image URL
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
