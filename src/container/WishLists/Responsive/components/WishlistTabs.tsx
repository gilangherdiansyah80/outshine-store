import { cn } from "@outshine/lib/utils";

interface WishlistTabsProps {
  activeTab: "items" | "collections";
  onTabChange: (tab: "items" | "collections") => void;
  itemCount: number;
}

const WishlistTabs = ({
  activeTab,
  onTabChange,
  itemCount,
}: WishlistTabsProps) => {
  return (
    <div className="flex gap-8 px-5 border-b border-white/5">
      <button
        onClick={() => onTabChange("items")}
        className={cn(
          "py-4 text-sm font-bold transition-all relative",
          activeTab === "items" ? "text-[#0B0F19]" : "text-gray-500"
        )}
      >
        All Items ({itemCount})
        {activeTab === "items" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0B0F19] rounded-full" />
        )}
      </button>
      <button
        onClick={() => onTabChange("collections")}
        className={cn(
          "py-4 text-sm font-bold transition-all relative",
          activeTab === "collections" ? "text-[#0B0F19]" : "text-gray-500"
        )}
      >
        Collections
        {activeTab === "collections" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
        )}
      </button>
    </div>
  );
};

export default WishlistTabs;
