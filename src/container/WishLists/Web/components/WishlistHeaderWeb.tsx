import { Heart, FolderHeart } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistHeaderWebProps {
  activeTab: "items" | "collections";
  onTabChange: (tab: "items" | "collections") => void;
  itemCount: number;
  collectionCount: number;
}

export default function WishlistHeaderWeb({
  activeTab,
  onTabChange,
  itemCount,
  collectionCount,
}: WishlistHeaderWebProps) {
  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-[#0F172A] tracking-tighter">
          My Wishlist
        </h1>
        <p className="text-gray-400 font-medium">
          Manage your favorite items and curated collections in one place.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onTabChange("items")}
          className={cn(
            "flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer",
            activeTab === "items"
              ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
              : "bg-white text-gray-500 hover:bg-slate-50 border-2 border-slate-100",
          )}
        >
          <Heart
            size={20}
            className={cn(
              activeTab === "items" ? "text-red-400" : "text-gray-400",
            )}
          />
          <span>All Items</span>
          <span
            className={cn(
              "ml-2 px-2 py-0.5 rounded-lg text-xs font-black",
              activeTab === "items"
                ? "bg-white/10 text-white"
                : "bg-slate-100 text-slate-500",
            )}
          >
            {itemCount}
          </span>
        </button>

        <button
          onClick={() => onTabChange("collections")}
          className={cn(
            "flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 cursor-pointer",
            activeTab === "collections"
              ? "bg-[#0F172A] text-white shadow-xl shadow-slate-200"
              : "bg-white text-gray-500 hover:bg-slate-50 border-2 border-slate-100",
          )}
        >
          <FolderHeart
            size={20}
            className={cn(
              activeTab === "collections" ? "text-blue-400" : "text-gray-400",
            )}
          />
          <span>Collections</span>
          <span
            className={cn(
              "ml-2 px-2 py-0.5 rounded-lg text-xs font-black",
              activeTab === "collections"
                ? "bg-white/10 text-white"
                : "bg-slate-100 text-slate-500",
            )}
          >
            {collectionCount}
          </span>
        </button>
      </div>
    </div>
  );
}
