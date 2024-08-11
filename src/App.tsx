import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewyorkArticleDetail from "./components/NewYorkTimesDetail";
import ApiKeys from "./constants/api-key-constants";
import "./styles/App.scss";

const HomePage = lazy(() => import("./pages/HomePage"));
const GuardianPage = lazy(() => import("./pages/GuardianPage"));
const NYTimesPage = lazy(() => import("./pages/NYTimesPage"));
const NewsAPIPage = lazy(() => import("./components/NewsAPIPage"));


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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guardian" element={<GuardianPage />} />
          <Route path="/nytimes" element={<NYTimesPage />} />
          <Route path="/newsapi" element={<NewsAPIPage />} />
          <Route
            path="/new-york-times-articules"
            element={<NewyorkArticleDetail />}
          />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
       
      </Suspense>
    </Router>
  );
};

export default App;
