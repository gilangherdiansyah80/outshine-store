import { Plus } from "lucide-react";
import type { Collection } from "@outshine/store/wishlistStore";

interface CollectionCardProps {
  collection?: Collection;
  isCreateNew?: boolean;
  onClick?: () => void;
}

const CollectionCard = ({
  collection,
  isCreateNew,
  onClick,
}: CollectionCardProps) => {
  if (isCreateNew) {
    return (
      <button
        onClick={onClick}
        className="flex flex-col gap-3 group cursor-pointer w-full"
      >
        <div className="aspect-square bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200 flex items-center justify-center transition-all group-hover:border-black group-hover:bg-gray-100/50">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-black" />
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-[15px] font-bold text-black">
            Create Collection
          </h3>
          <p className="text-[12px] text-gray-400">Organize your wishlist</p>
        </div>
      </button>
    );
  }

  if (!collection) return null;

  const previewItems = collection.items.slice(0, 4);

  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-3 group cursor-pointer w-full"
    >
      <div className="aspect-square bg-gray-50 rounded-[32px] border border-gray-100 overflow-hidden relative transition-all group-hover:shadow-lg group-hover:shadow-black/5">
        {previewItems.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-300" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 h-full gap-0.5 bg-white">
            {previewItems.map((item, idx) => (
              <div
                key={item.id}
                className="relative overflow-hidden bg-gray-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {idx === 3 && collection.items.length > 4 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white text-xs font-bold">
                      +{collection.items.length - 3}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {/* Fill empty grid slots if items < 4 */}
            {Array.from({ length: 4 - previewItems.length }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-gray-50" />
            ))}
          </div>
        )}
      </div>
      <div className="text-left">
        <h3 className="text-[15px] font-bold text-black truncate">
          {collection.name}
        </h3>
        <p className="text-[12px] text-gray-400">
          {collection.items.length}{" "}
          {collection.items.length === 1 ? "item" : "items"}
        </p>
      </div>
    </button>
  );
};

export default CollectionCard;
