import { User, Shield, HelpCircle, FileText, LogOut } from "lucide-react";
import SettingHeader from "../components/SettingHeader";
import SettingSection from "../components/SettingSection";
import SettingItem from "../components/SettingItem";
import { useNavigate } from "react-router-dom";
import { usePostLogout } from "@/services/Auth/usePostLogout";
import { useTokenActions } from "@/lib/auth-adapter/tokenStore";
import { useUserActions } from "@/lib/auth-adapter/userStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Alert from "@/components/Alert";

const SettingScreen = () => {
  const navigate = useNavigate();
  const { trigger: logout, isLoading: isLogoutLoading } = usePostLogout();
  const { clearToken } = useTokenActions();
  const { clearUser } = useUserActions();

  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "warning" | "info" = "info",
  ) => {
    setAlertConfig({ isOpen: true, title, message, type });
  };

  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleLogout = async () => {
    try {
      const result = await logout();

      if (result?.success) {
        // Clear local session
        clearToken();
        clearUser();
        useWishlistStore.getState().clearWishlist();
        useCartStore.getState().clearCart();

        showAlert("Logout Berhasil", "Anda telah keluar dari akun.", "success");

        // Redirect to home after a short delay
        setTimeout(() => {
          navigate("/outshine/home", { replace: true });
        }, 1500);
      } else {
        showAlert(
          "Logout Gagal",
          result?.message || "Terjadi kesalahan saat logout.",
          "error",
        );
      }
    } catch (_error) {
      // Even if API fails, still clear local session
      clearToken();
      clearUser();
      useWishlistStore.getState().clearWishlist();
      useCartStore.getState().clearCart();
      navigate("/outshine/home", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <SettingHeader />

      <main className="flex-1">
        <SettingSection title="Akun">
          <SettingItem
            icon={<User size={20} />}
            label="Edit Profil"
            description="Ubah foto, nama, dan informasi akun"
            path="/edit-profile"
            useInternal
          />
          {/* <SettingItem
            icon={<Bell size={20} />}
            label="Notifikasi"
            description="Atur preferensi notifikasi"
            path="/notification"
            useInternal
          /> */}
        </SettingSection>

        <SettingSection title="Preferensi">
          <SettingItem
            icon={<Shield size={20} />}
            label="Privasi & Keamanan"
            description="Kelola izin dan keamanan akun"
            path="/privacy-and-secure"
            useInternal
          />
        </SettingSection>

        <SettingSection title="Lainnya">
          <SettingItem
            icon={<HelpCircle size={20} />}
            label="Pusat Bantuan"
            description="FAQ dan dukungan pelanggan"
            path="/faq"
            useInternal
          />
          <SettingItem
            icon={<FileText size={20} />}
            label="Syarat & Ketentuan"
            path="/terms-and-conditions"
            useInternal
          />
        </SettingSection>

        <SettingSection>
          <SettingItem
            icon={<LogOut size={20} />}
            label={isLogoutLoading ? "Memproses..." : "Keluar"}
            description="Keluar dari akun Anda"
            onClick={handleLogout}
            danger
            disabled={isLogoutLoading}
          />
        </SettingSection>

        <p className="text-center text-xs text-gray-400 py-6">
          OUTSHINE Store v1.0.0
        </p>
      </main>

      <Alert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={closeAlert}
      />
    </div>
  );
};

export default SettingScreen;
