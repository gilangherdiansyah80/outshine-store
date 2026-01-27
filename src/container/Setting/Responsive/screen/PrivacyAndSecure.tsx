import { useState } from "react";
import { Fingerprint, Key, ShieldCheck, Lock, Trash2 } from "lucide-react";
import PrivacyHeader from "../components/PrivacyHeader";
import SettingSection from "../components/SettingSection";
import SettingItem from "../components/SettingItem";
import NotificationToggle from "../components/NotificationToggle";

const PrivacyAndSecure = () => {
  const [settings, setSettings] = useState({
    biometricLogin: true,
    twoFactorAuth: false,
    hideOnlineStatus: false,
    hideLastSeen: true,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <PrivacyHeader />

      <main className="flex-1">
        <SettingSection title="Keamanan Akun">
          <NotificationToggle
            icon={<Fingerprint size={20} />}
            label="Login Biometrik"
            description="Gunakan sidik jari atau Face ID"
            enabled={settings.biometricLogin}
            onChange={(v) => updateSetting("biometricLogin", v)}
          />
          <SettingItem
            icon={<Key size={20} />}
            label="Ubah Password"
            description="Perbarui password akun Anda"
          />
          <NotificationToggle
            icon={<ShieldCheck size={20} />}
            label="Autentikasi Dua Faktor"
            description="Lapisan keamanan tambahan"
            enabled={settings.twoFactorAuth}
            onChange={(v) => updateSetting("twoFactorAuth", v)}
          />
        </SettingSection>

        <SettingSection title="Data">
          <SettingItem
            icon={<Lock size={20} />}
            label="Izin Aplikasi"
            description="Kelola akses kamera, lokasi, dll"
          />
          <SettingItem
            icon={<Trash2 size={20} />}
            label="Hapus Akun"
            description="Hapus akun dan semua data Anda"
            danger
          />
        </SettingSection>

        <p className="text-center text-xs text-gray-400 py-6">
          Perubahan akan disimpan secara otomatis
        </p>
      </main>
    </div>
  );
};

export default PrivacyAndSecure;
