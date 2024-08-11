import React from "react";
import { Badge, Container, Figure } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../app/store";
import noArticleImg from "../assets/images/no-article.svg";

const NewyorkArticleDetail: React.FC = () => {
  const article = useSelector(
    (state: RootState) => state.nytimes.currentArticle
  );

  if (!article) {
    return (
      <div className="d-flex flex-column align-items-center">
        <Figure>
          <Figure.Image
            src={noArticleImg}
            alt="No Article Found"
            className="img-fluid"
          />
        </Figure>
        <h2 className="m-0">Article not found!</h2>
      </div>
    );
  }

  return (
    <>
      <Container className="py-3 py-lg-5">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <h2 className="m-0">{article.headline.main}</h2>
          <Badge bg="info" className="text-capitalize">
            {article.document_type}
          </Badge>
        </div>
        <Figure className="w-100">
          <Figure.Image
            className="w-100"
            alt={article.headline?.main ?? article.title}
            src={article.imageUrl}
          />
        </Figure>
        <div>
          <p>{article.description}</p>
          <p>{article.lead_paragraph}</p>
          <span> {article.snippet}</span>
        </div>
        <Link to={article.web_url} target="_blank" rel="noopener noreferrer">
          Read Full Article
        </Link>
      </Container>
    </>
  );
};

export default NewyorkArticleDetail;
