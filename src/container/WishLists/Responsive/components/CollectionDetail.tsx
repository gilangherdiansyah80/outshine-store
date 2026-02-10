import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import CardProduct from "@/components/Card/CardProduct";
import type { CollectionProduct } from "@/services/ItemsCollection/useGetItemCollection";

interface CollectionDetailProps {
  collectionName: string;
  itemCount: number;
  products: CollectionProduct[];
  isFetchingItems: boolean;
  isDeleting: boolean;
  isRemovingItem: boolean;
  onBack: () => void;
  onDelete: () => void;
  onRemoveItem: (productId: string) => void;
}

const CollectionDetail = ({
  collectionName,
  itemCount,
  products,
  isFetchingItems,
  isDeleting,
  isRemovingItem,
  onBack,
  onDelete,
  onRemoveItem,
}: CollectionDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black"
        >
          <span className="text-xl">←</span>
        </button>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black">{collectionName}</h2>
            <p className="text-sm text-gray-400">{itemCount} items</p>
          </div>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-3 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors disabled:opacity-50"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {isFetchingItems ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <CardProduct
                id={product.id}
                imageSrc={product.primaryImage}
                name={product.name}
                price={product.price}
                isPo={product.isPo}
                aspectRatio="portrait"
                onClick={() => navigate(`/outshine/product/${product.id}`)}
              />
              {/* Remove from collection button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveItem(product.id);
                }}
                disabled={isRemovingItem}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-colors disabled:opacity-30 hover:bg-red-500"
                title="Remove from collection"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p>This collection is empty</p>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
