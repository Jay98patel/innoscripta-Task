// src/components/ArticleCard.tsx

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { GenericArticleProps } from "../new-app.interface";
import { Badge } from "react-bootstrap";

// Making the component generic
const ArticleCard = <T extends string>({
  title,
  description,
  imageUrl,
  articleUrl,
  type,
}: Partial<GenericArticleProps<T>>) => {
  return (
    <Card>
      {imageUrl && (
        <Card.Img
          variant="top"
          src={imageUrl ?? "../../assets/placeholders/no-image.svg"}
          alt={title}
        />
      )}
      <Card.Body className="d-flex flex-column gap-3">
        {type && (
          <div className="d-flex justify-content-end">
            <Badge bg="info" className="text-capitalize">
              {type}
            </Badge>
          </div>
        )}
        <Card.Title>{title}</Card.Title>
        {description && (
          <Card.Text className="text-body-tertiary mb-0">
            {description}
          </Card.Text>
        )}
        <Link
          className="mt-auto ms-auto"
          to={articleUrl ?? "#"}
          onClick={(e) => {
            e.preventDefault();
            window.open(articleUrl, "_blank");
          }}
        >
          Read More
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
