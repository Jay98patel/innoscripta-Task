import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const NewyorkArticleDetail: React.FC = () => {
  const article = useSelector(
    (state: RootState) => state.nytimes.currentArticle
  );

  if (!article) {
    return <div>No article selected</div>;
  }

  return (
    <div>
      <span> {article.snippet}</span>
      <h1>{article.headline.main}</h1>
      <img src={article.multimedia[0]?.url} alt={article.headline.main} />
      <p>{article.snippet}</p>
      <a href={article.web_url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
    </div>
  );
};

export default NewyorkArticleDetail;
