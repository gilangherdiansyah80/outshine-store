import { useState } from "react";
import EditProfileHeader from "../components/EditProfileHeader";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileInput from "../components/ProfileInput";
import ProfileSaveButton from "../components/ProfileSaveButton";
import { useGetProfile } from "@/services/Profile/useGetProfile";

const EditProfile = () => {
  const { profile, isLoading: isLoadingProfile } = useGetProfile();

  const [formData, setFormData] = useState({
    name: profile?.fullName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        name: profile.fullName || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save profile API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const handleChangePhoto = () => {
    // TODO: Implement photo upload
    console.log("Change photo clicked");
  };

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <EditProfileHeader />

      <ProfileAvatar
        imageUrl={profile?.avatarUrl}
        name={formData.name || "User"}
        onChangePhoto={handleChangePhoto}
      />

      <div className="flex-1 space-y-px">
        <ProfileInput
          label="Nama Lengkap"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          placeholder="Masukkan nama lengkap"
        />
        <ProfileInput
          label="Email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          placeholder="Masukkan email"
          type="email"
          disabled
        />
        <ProfileInput
          label="Nomor Telepon"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          placeholder="Masukkan nomor telepon"
          type="tel"
        />
      </div>

      <ProfileSaveButton onClick={handleSave} isLoading={isSaving} />
    </div>
  );
};

export default EditProfile;
