import "bootstrap-icons/font/bootstrap-icons.css";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import NewyorkArticleDetail from "./components/NewYorkTimesDetail";
import ApiKeys from "./constants/api-key-constants";
import "./styles/App.scss";

const HomePage = lazy(() => import("./pages/HomePage"));
const GuardianPage = lazy(() => import("./pages/GuardianPage"));
const NYTimesPage = lazy(() => import("./pages/NYTimesPage"));
const NewsAPIPage = lazy(() => import("./pages/NewsAPIPage"));

const storeApiKey = () => {
  const apikeys = new ApiKeys();
  const newsSources: Array<keyof ApiKeys> = ["guardianApi", "newsApi"];

  newsSources.forEach((source) => {
    const key = source as keyof ApiKeys;
    const value = apikeys[key];
    if (value) {
      localStorage.setItem(source, JSON.stringify(value));
    }
  });
};

const App: React.FC = () => {
  useEffect(() => {
    storeApiKey();
  });
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="d-flex flex-column vh-100 overflow-hidden">
          <Header />
          <div className="flex-grow-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guardian" element={<GuardianPage />} />
              <Route path="/nytimes" element={<NYTimesPage />} />
              <Route path="/newsapi" element={<NewsAPIPage />} />
              <Route
                path="/new-york-times-articles"
                element={<NewyorkArticleDetail />}
              />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
