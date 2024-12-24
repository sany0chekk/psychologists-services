import React, {lazy, Suspense, useEffect, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./layouts/Layout";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {checkAuth} from "../../firebase";
import {setUser} from "../redux/user/slice";
import PrivateRoute from "./routes/PrivateRoute";
import PageLoader from "./loaders/PageLoader";
import {selectIsLoading, selectIsRefreshing, selectUser,} from "../redux/user/selectors";
import {Toaster} from "react-hot-toast";
import {fetchFavorites, fetchPsychologists,} from "../redux/psychologists/operations";
import {selectLastKey} from "../redux/psychologists/selectors";
import PageWrapper from "./layouts/PageWrapper";
import {AnimatePresence} from "motion/react";

const HomePage = lazy(() => import("../pages/HomePage"));
const PsychologistsPage = lazy(() => import("../pages/PsychologistsPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));

export default function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const [isFetchingPsychologists, setIsFetchingPsychologists] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);
  const lastKey = useSelector(selectLastKey);


  const loadPsychologists = async () => {
    setIsFetchingPsychologists(true);
    await dispatch(fetchPsychologists({ page: 1, pageSize: 3, filter: "Show all" }));
    setIsFetchingPsychologists(false);
  };

  useEffect(() => {
    if (lastKey !== undefined) {
      loadPsychologists();
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchFavorites(user.uid));
    }
  }, [dispatch, user?.uid]);

  useEffect(() => {
    if (!authChecked) {
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
        })
        .finally(() => {
          setAuthChecked(true);
        });
    }
  }, [dispatch, authChecked]);

  if (!authChecked || isRefreshing || isLoading || isFetchingPsychologists) {
    return <PageLoader />;
  }

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PageWrapper className="flex justify-center flex-grow">
                    <HomePage />
                  </PageWrapper>
                }
              />
              <Route
                path="psychologists"
                element={
                  <PageWrapper>
                    <PsychologistsPage />
                  </PageWrapper>
                }
              />
              <Route
                path="favorites"
                element={
                  <PrivateRoute
                    component={
                      <PageWrapper>
                        <FavoritesPage />
                      </PageWrapper>
                    }
                    redirectTo="/"
                  />
                }
              />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Toaster />
    </>
  );
}
