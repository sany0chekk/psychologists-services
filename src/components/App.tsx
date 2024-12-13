import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { checkAuth } from "../../firebase";
import { setUser } from "../redux/user/slice";
import PrivateRoute from "./routes/PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    checkAuth()
      .then((user) => {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      })
      .catch((error) => {
        console.log("User not logged in", error);
      });
  }, [dispatch]);

  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="psychologists" element={<PsychologistsPage />} />
          <Route
            path="favorites"
            element={
              <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
