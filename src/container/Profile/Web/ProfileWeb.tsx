import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "@/services/Profile/useGetProfile";
import { usePostLogout } from "@/services/Auth/usePostLogout";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import Alert from "@/components/Alert";
import ProfileCard from "./components/ProfileCard";
import ProfileMenu from "./components/ProfileMenu";

export default function ProfileWeb() {
  const navigate = useNavigate();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const { trigger: logout, isLoading: isLogoutLoading } = usePostLogout();
  const { clearToken } = useTokenActions();
  const { clearUser } = useUserActions();

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({ isOpen: false, title: "", message: "", type: "info" });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => setAlertConfig({ isOpen: true, title, message, type });

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result?.success) {
        clearToken();
        clearUser();
        useWishlistStore.getState().clearWishlist();
        useCartStore.getState().clearCart();
        showAlert(
          "Logged Out",
          "You have been successfully logged out.",
          "success",
        );
        setTimeout(() => navigate("/outshine/home", { replace: true }), 1500);
      } else {
        showAlert(
          "Logout Failed",
          result?.message || "An error occurred.",
          "error",
        );
      }
    } catch (_error) {
      clearToken();
      clearUser();
      useWishlistStore.getState().clearWishlist();
      useCartStore.getState().clearCart();
      navigate("/outshine/welcome", { replace: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          My Profile
        </h1>
        <p className="text-gray-400 font-medium mt-2">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 items-start">
        <ProfileCard profile={profile} isLoading={isProfileLoading} />
        <ProfileMenu
          onLogout={handleLogout}
          isLogoutLoading={isLogoutLoading}
        />
      </div>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
