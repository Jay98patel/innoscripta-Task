import React, { useEffect, useState } from "react";
import { fetchArticlesFromGuardian } from "../api/guardianAPI";
import ArticleCard from "../components/ArticleCard";
import PaginationComponent from "../components/Pagination";
import Sorting from "../components/Sorting";
import { Container } from "react-bootstrap";

interface Article {
  id: string;
  webTitle: string;
  fields?: {
    thumbnail?: string;
  };
  webUrl: string;
  type?: string;
}

const GuardianPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({ page: 1, orderBy: "newest" });

  useEffect(() => {
    setLoading(true);
    fetchArticlesFromGuardian(filters)
      .then((data) => {
        setArticles(data.response.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [filters]);

  const handleSortChange = (sortOrder: string) => {
    setFilters((prev) => ({ ...prev, orderBy: sortOrder }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <Container className="py-3 py-lg-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="d-flex align-items-center gap-3 mb-4">
            <h5 className="m-0">Guardian News</h5>
            <Sorting onSortChange={handleSortChange} />
          </div>
          <div className="d-grid news-cards gap-4">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.webTitle}
                articleUrl={article.webUrl}
                type={article.type}
              />
            ))}
          </div>
          <div className="d-flex justify-content-end mt-4">
            <PaginationComponent
              currentPage={filters.page}
              totalPages={10}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
      {error && <p>Error: {error}</p>}
    </Container>
  );
};

export default GuardianPage;
