import React from "react";
import { Figure } from "react-bootstrap";
import noPageImg from "../assets/images/page-not-found.svg";

const PageNotFound: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <Figure>
          <Figure.Image
            className="w-100"
            src={noPageImg}
            alt="No Article Found"
          />
        </Figure>
        <h2 className="m-0">Page Not Found!</h2>
      </div>
    </>
  );
};

export default PageNotFound;
