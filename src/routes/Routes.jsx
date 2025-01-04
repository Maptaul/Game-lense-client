import React from "react";
import { createBrowserRouter } from "react-router-dom";
import GameDetails from "../components/GameDetails";
import AuthLayout from "../Layouts/AuthLayout";
import HomeLayouts from "../Layouts/HomeLayouts";
import MainLayout from "../Layouts/MainLayout";
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";
import ErrorPage from "../pages/ErrorPage";
import MyReviews from "../pages/MyReviews";
import MyWatchlist from "../pages/MyWatchlist";
import Register from "../pages/Register";
import UpdateReview from "../pages/UpdateReview";
import Login from "./../pages/Login";
import PrivateRoute from "./PrivateRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts />,
    loader: () => fetch("https://gamelens-server.vercel.app/addreview"),
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/allreviews",
        element: <AllReviews />,
      },
      {
        path: "/addreview",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/myreviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/gamewatchlist",
        element: (
          <PrivateRoute>
            <MyWatchlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/review/:id",
        element: <GameDetails />,
        loader: ({ params }) =>
          fetch(`https://gamelens-server.vercel.app/addreview/${params.id}`),
      },
      {
        path: "/updateReview/:id",
        element: <UpdateReview />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Routes;
