import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  imageUrl,
  articleUrl,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
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
