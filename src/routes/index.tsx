import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@outshine/container/Layout/MainLayout/MainLayout";
import HomePage from "@outshine/pages/HomePage";
import ProductsPage from "@outshine/pages/ProductsPage";
import DetailProductPage from "@outshine/pages/DetailProductPage";
import AboutUsPage from "@outshine/pages/AboutUsPage";
import WishListsPage from "@outshine/pages/WishListsPage";
import CartPage from "@outshine/pages/CartPage";
import CheckoutPage from "@outshine/pages/Checkout";

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
        path: "products/*",
        element: <ProductsPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "wishlist",
        element: <WishListsPage key="wishlist-page" />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout/*",
        element: (
          <div className="checkout-page-container">
            <CheckoutPage />
          </div>
        ),
      },
      {
        path: "product/:id",
        element: <DetailProductPage />,
      },
    ],
  },
]);

export default route;
