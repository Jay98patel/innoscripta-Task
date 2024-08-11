import React, { useEffect, useState } from "react";
import { fetchArticlesFromGuardian } from "../api/guardianAPI";
import ArticleCard from "../components/ArticleCard";
import PaginationComponent from "../components/Pagination";
import Sorting from "../components/Sorting";

interface Article {
  id: string;
  webTitle: string;
  fields?: {
    thumbnail?: string;
  };
  webUrl: string;
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
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Sorting onSortChange={handleSortChange} />
          <div>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.webTitle}
                description={article.webTitle}
                articleUrl={article.webUrl}
              />
            ))}
          </div>
          <PaginationComponent
            currentPage={filters.page}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GuardianPage;
