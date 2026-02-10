import { useNavigate } from "react-router-dom";
import CardProduct from "@/components/Card/CardProduct";
import BottomSheet from "@/ui/BottomSheet/BottomSheet";
import WishlistEmpty from "./WishlistEmpty";
import type { WishlistItem as ServiceWishlistItem } from "@/services/WishLists/useGetWishLists";
import type { Collection } from "@/services/Collection/useGetCollections";
import type { WishlistItem as StoreWishlistItem } from "@/store/wishlistStore";

interface WishlistItemsGridProps {
  wishlists: ServiceWishlistItem[];
  collections: Collection[];
  isAddingItem: boolean;
  selectedProduct: StoreWishlistItem | null;
  onSelectProduct: (product: StoreWishlistItem) => void;
  onClearSelection: () => void;
  onAddToCollection: (collectionId: string) => void;
  mapApiToStoreItem: (item: ServiceWishlistItem) => StoreWishlistItem;
}

const WishlistItemsGrid = ({
  wishlists,
  collections,
  isAddingItem,
  selectedProduct,
  onSelectProduct,
  onClearSelection,
  onAddToCollection,
  mapApiToStoreItem,
}: WishlistItemsGridProps) => {
  const navigate = useNavigate();

  return (
    <>
      {wishlists && wishlists.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-24">
          {wishlists.map((product) => (
            <CardProduct
              key={product.id}
              id={product.id}
              imageSrc={product.primaryImage}
              name={product.name}
              price={
                product.formattedDiscountedPrice ||
                product.formattedPrice ||
                product.price
              }
              originalPrice={
                product.formattedDiscountedPrice
                  ? product.formattedPrice
                  : undefined
              }
              discount={product.discount?.value}
              isNew={product.tags?.some((t) => t.name === "New")}
              isPo={product.isPo}
              aspectRatio="portrait"
              onClick={() => navigate(`/outshine/product/${product.id}`)}
              onWishlistClick={() => console.log("Wishlist:", product.name)}
              onAddToCollection={() =>
                onSelectProduct(mapApiToStoreItem(product))
              }
            />
          ))}
        </div>
      ) : (
        <WishlistEmpty />
      )}

      {/* Collection Selection BottomSheet */}
      <BottomSheet
        isOpen={!!selectedProduct}
        onClose={onClearSelection}
        title="Add to Collection"
      >
        <div className="flex flex-col gap-y-3">
          {collections.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400 mb-4">No collections yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {collections.map((col) => (
                <button
                  key={col.id}
                  onClick={() => onAddToCollection(col.id)}
                  disabled={isAddingItem}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <span className="font-bold text-sm text-black">
                    {col.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {isAddingItem
                      ? "Adding..."
                      : `${col._count?.products ?? (col.items || []).length} items`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </BottomSheet>
    </>
  );
};

export default WishlistItemsGrid;
