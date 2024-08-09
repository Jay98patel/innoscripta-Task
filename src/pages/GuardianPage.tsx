import React, { useState, useEffect } from "react";
import { fetchArticlesFromGuardian } from "../api/guardianAPI";
import ArticleCard from "../components/ArticleCard";
import PaginationComponent from "../components/Pagination";
import Sorting from "../components/Sorting";
import FilterDropdown from "../components/FilterDropdown";

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
        setArticles(data.response.results); // Ensure data.results is of type Article[]
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
      <Sorting onSortChange={handleSortChange} />
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.webTitle}
          description={article.webTitle} // Assuming description is intended to be webTitle
          imageUrl={article.fields?.thumbnail}
          articleUrl={article.webUrl}
        />
      ))}
      <PaginationComponent
        currentPage={filters.page}
        totalPages={10} // This should be dynamic based on API response if possible
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GuardianPage;
