import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.scss";

const HomePage = lazy(() => import("./pages/HomePage"));
const GuardianPage = lazy(() => import("./pages/GuardianPage"));
const NYTimesPage = lazy(() => import("./pages/NYTimesPage"));
const NewsAPIPage = lazy(() => import("./components/NewsAPIPage"));
const ArticleDetailModal = lazy(
  () => import("./components/ArticleDetailModal")
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guardian" element={<GuardianPage />} />
          <Route path="/nytimes" element={<NYTimesPage />} />
          <Route path="/newsapi" element={<NewsAPIPage />} />
          <Route path="/article/:id" element={<ArticleDetailModal />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
