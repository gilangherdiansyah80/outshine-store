import { useState } from "react";
import {
  ShoppingBag,
  Tag,
  MessageCircle,
  Bell,
  Mail,
  Smartphone,
} from "lucide-react";
import NotificationHeader from "../components/NotificationHeader";
import NotificationToggle from "../components/NotificationToggle";
import SettingSection from "../components/SettingSection";

const NotificationScreen = () => {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    chatMessages: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
  });

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <NotificationHeader />

      <main className="flex-1">
        <SettingSection title="Aktivitas">
          <NotificationToggle
            icon={<ShoppingBag size={20} />}
            label="Update Pesanan"
            description="Notifikasi status pesanan Anda"
            enabled={settings.orderUpdates}
            onChange={(v) => updateSetting("orderUpdates", v)}
          />
          <NotificationToggle
            icon={<Tag size={20} />}
            label="Promo & Diskon"
            description="Penawaran khusus dan kupon"
            enabled={settings.promotions}
            onChange={(v) => updateSetting("promotions", v)}
          />
          <NotificationToggle
            icon={<MessageCircle size={20} />}
            label="Pesan Chat"
            description="Pesan dari penjual atau customer service"
            enabled={settings.chatMessages}
            onChange={(v) => updateSetting("chatMessages", v)}
          />
        </SettingSection>

        <SettingSection title="Metode Notifikasi">
          <NotificationToggle
            icon={<Bell size={20} />}
            label="Push Notification"
            description="Notifikasi di perangkat Anda"
            enabled={settings.pushNotifications}
            onChange={(v) => updateSetting("pushNotifications", v)}
          />
          <NotificationToggle
            icon={<Mail size={20} />}
            label="Email"
            description="Kirim notifikasi ke email Anda"
            enabled={settings.emailNotifications}
            onChange={(v) => updateSetting("emailNotifications", v)}
          />
          <NotificationToggle
            icon={<Smartphone size={20} />}
            label="SMS"
            description="Kirim notifikasi via SMS"
            enabled={settings.smsNotifications}
            onChange={(v) => updateSetting("smsNotifications", v)}
          />
        </SettingSection>

        <p className="text-center text-xs text-gray-400 py-6">
          Perubahan akan disimpan secara otomatis
        </p>
      </main>
    </div>
  );
};

export default NotificationScreen;
