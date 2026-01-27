interface ProfileInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  disabled?: boolean;
}

const ProfileInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}: ProfileInputProps) => {
  return (
    <div className="px-4 py-3 bg-white">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full text-sm text-gray-800 bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-[#0F172A] transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default ProfileInput;
