import { Loader2 } from "lucide-react";

interface ProfileSaveButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const ProfileSaveButton = ({
  onClick,
  isLoading = false,
  disabled = false,
}: ProfileSaveButtonProps) => {
  return (
    <div className="p-4 bg-white mt-auto">
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="w-full py-3 bg-[#0F172A] text-white font-medium rounded-xl hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Menyimpan...
          </>
        ) : (
          "Simpan Perubahan"
        )}
      </button>
    </div>
  );
};

export default ProfileSaveButton;
