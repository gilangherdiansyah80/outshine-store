import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@outshine/container/Layout/MainLayout/MainLayout.tsx";
import HomePage from "@outshine/pages/HomePage/index.tsx";
import ProductsPage from "@outshine/pages/ProductsPage/index.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/outshine/home" replace />,
  },
  {
    path: "/outshine",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);

export default route;
