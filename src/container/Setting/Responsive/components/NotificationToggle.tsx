interface NotificationToggleProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const NotificationToggle = ({
  icon,
  label,
  description,
  enabled,
  onChange,
}: NotificationToggleProps) => {
  return (
    <div className="flex items-center gap-4 px-4 py-4 bg-white">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
          enabled ? "bg-[#0F172A]" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default NotificationToggle;
