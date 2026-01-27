import { User, Bell, Shield, HelpCircle, FileText, LogOut } from "lucide-react";
import SettingHeader from "../components/SettingHeader";
import SettingSection from "../components/SettingSection";
import SettingItem from "../components/SettingItem";
import { useNavigate } from "react-router-dom";

const SettingScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // Navigate to login
    navigate("/outshine/login");
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
          <SettingItem
            icon={<Bell size={20} />}
            label="Notifikasi"
            description="Atur preferensi notifikasi"
            path="/notification"
            useInternal
          />
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
            label="Keluar"
            description="Keluar dari akun Anda"
            onClick={handleLogout}
            danger
          />
        </SettingSection>

        <p className="text-center text-xs text-gray-400 py-6">
          OUTSHINE Store v1.0.0
        </p>
      </main>
    </div>
  );
};

export default SettingScreen;
