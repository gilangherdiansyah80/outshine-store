import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  imageUrl?: string;
  name: string;
  onChangePhoto?: () => void;
}

const ProfileAvatar = ({
  imageUrl,
  name,
  onChangePhoto,
}: ProfileAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col items-center py-8 bg-white">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-white">{initials}</span>
          )}
        </div>
        <button
          onClick={onChangePhoto}
          className="absolute bottom-0 right-0 w-8 h-8 bg-[#0F172A] rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer hover:bg-gray-800 transition-colors"
        >
          <Camera size={16} className="text-white" />
        </button>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-800">{name}</p>
      <button
        onClick={onChangePhoto}
        className="mt-1 text-sm text-[#0F172A] font-medium cursor-pointer hover:underline"
      >
        Ubah Foto
      </button>
    </div>
  );
};

export default ProfileAvatar;
