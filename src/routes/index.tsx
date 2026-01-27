import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@outshine/container/Layout/MainLayout/MainLayout";
import HomePage from "@outshine/pages/HomePage";
import ProductsPage from "@outshine/pages/ProductsPage";
import DetailProductPage from "@outshine/pages/DetailProductPage";
import AboutUsPage from "@outshine/pages/AboutUsPage";
import WishListsPage from "@outshine/pages/WishListsPage";
import CartPage from "@outshine/pages/CartPage";
import CheckoutPage from "@outshine/pages/Checkout";
import ProfilePage from "@outshine/pages/ProfilePage";
import ProtectedRoute from "@outshine/components/ProtectedRoute/ProtectedRoute";
import WelcomePage from "@outshine/pages/WelcomePage";
import RegisterPage from "@outshine/pages/Auth/RegisterPage";
import LoginPage from "@outshine/pages/Auth/LoginPage";
import OrdersPage from "@outshine/pages/OrdersPage";
import SettingPage from "@outshine/pages/SettingPage";

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
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "setting",
        element: (
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register/*",
        element: <RegisterPage />,
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
