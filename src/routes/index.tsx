import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@outshine/container/Layout/MainLayout/MainLayout.tsx";
import HomePage from "@outshine/pages/HomePage/index.tsx";
import ProductsPage from "@outshine/pages/ProductsPage/index.tsx";
import DetailProductPage from "@outshine/pages/DetailProductPage/index.tsx";
import AboutUsPage from "@outshine/pages/AboutUsPage/index.tsx";
import WishListsPage from "@outshine/pages/WishListsPage/index.tsx";

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
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "wishlists",
        element: <WishListsPage />,
      },
    ],
  },
  {
    path: "/outshine/products/:id",
    element: <DetailProductPage />,
  },
]);

export default route;
