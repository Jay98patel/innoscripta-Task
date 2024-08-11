import React from "react";
import { Figure } from "react-bootstrap";
import noArticleImg from "../assets/images/no-article.svg";

const NoArticleFound: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Figure>
          <Figure.Image
            src={noArticleImg}
            alt="No Article Found"
            className="img-fluid"
          />
        </Figure>
        <h2 className="m-0">No article found!</h2>
      </div>
    </>
  );
};

export default NoArticleFound;