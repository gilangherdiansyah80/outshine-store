interface SettingSectionProps {
  title?: string;
  children: React.ReactNode;
}

const SettingSection = ({ title, children }: SettingSectionProps) => {
  return (
    <div className="mb-2">
      {title && (
        <p className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide bg-neutral-200">
          {title}
        </p>
      )}
      <div className="divide-y divide-gray-100">{children}</div>
    </div>
  );
};

export default SettingSection;
