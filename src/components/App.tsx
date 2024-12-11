import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

const HomePage = lazy(() => import("../pages/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));

export default function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="psychologists" element={<PsychologistsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
