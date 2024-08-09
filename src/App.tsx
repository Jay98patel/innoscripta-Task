// src/app/App.tsx

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./styles/App.scss"; // Import global styles

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const GuardianPage = lazy(() => import("./pages/GuardianPage"));
const NYTimesPage = lazy(() => import("./pages/NYTimesPage"));
const NewsAPIPage = lazy(() => import("./pages/NewsAPIPage"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guardian" element={<GuardianPage />} />
          <Route path="/nytimes" element={<NYTimesPage />} />
          <Route path="/newsapi" element={<NewsAPIPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
