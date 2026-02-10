import { cn } from "@outshine/lib/utils";

interface WishlistTabsProps {
  activeTab: "items" | "collections";
  onTabChange: (tab: "items" | "collections") => void;
  itemCount: number;
  collectionCount: number;
}

const WishlistTabs = ({
  activeTab,
  onTabChange,
  itemCount,
  collectionCount,
}: WishlistTabsProps) => {
  return (
    <div className="flex items-center gap-6 px-5 h-18 border-b border-gray-100 bg-white sticky top-0 z-20">
      <button
        onClick={() => onTabChange("items")}
        className={cn(
          "py-4 text-[13px] font-bold transition-all relative flex items-center gap-2 cursor-pointer",
          activeTab === "items" ? "text-black" : "text-gray-400",
        )}
      >
        <span>All Items</span>
        <span
          className={cn(
            "px-1.5 py-0.5 rounded-md text-[10px] leading-none",
            activeTab === "items"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500",
          )}
        >
          {itemCount}
        </span>
        {activeTab === "items" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-b-full" />
        )}
      </button>

      {/* Vertical Separator */}
      <div className="w-px h-9 bg-gray-200" />

      <button
        onClick={() => onTabChange("collections")}
        className={cn(
          "py-4 text-[13px] font-bold transition-all relative flex items-center gap-2 cursor-pointer",
          activeTab === "collections" ? "text-black" : "text-gray-400",
        )}
      >
        <span>Collections</span>
        <span
          className={cn(
            "px-1.5 py-0.5 rounded-md text-[10px] leading-none",
            activeTab === "collections"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-500",
          )}
        >
          {collectionCount}
        </span>
        {activeTab === "collections" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-b-full" />
        )}
      </button>
    </div>
  );
};

export default WishlistTabs;
