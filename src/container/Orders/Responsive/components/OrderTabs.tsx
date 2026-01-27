interface OrderTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "all", label: "Semua" },
  { id: "pending", label: "Belum Bayar" },
  { id: "processing", label: "Dikemas" },
  { id: "shipping", label: "Dikirim" },
  { id: "completed", label: "Selesai" },
  { id: "cancelled", label: "Dibatalkan" },
];

const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  return (
    <nav
      className="flex bg-white border-b py-1 border-gray-100 overflow-x-auto sticky top-0 z-10 w-full touch-pan-x"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="flex flex-nowrap min-w-max items-center">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center shrink-0">
            <button
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-4 text-sm font-medium relative transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? "text-[#0F172A]" : "text-gray-600"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-full bg-[#0F172A]" />
              )}
            </button>
            {index < tabs.length - 1 && (
              <div className="h-5 w-px bg-[#0F172A] shrink-0" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default OrderTabs;
