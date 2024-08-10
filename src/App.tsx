
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";
import ErrorBoundary from "./components/ErrorBoundary";
import { ErrorProvider } from "./components/ErrorContext";

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
      <ErrorProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guardian" element={<GuardianPage />} />
              <Route path="/nytimes" element={<NYTimesPage />} />
              <Route path="/newsapi" element={<NewsAPIPage />} />
              <Route path="/article/:id" element={<ArticleDetailModal />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </ErrorProvider>
    </Router>
  );
};

export default App;
