import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loader/Loading";
import WishlistEmpty from "../components/WishlistEmpty";
import CardProduct from "@/components/Card/CardProduct";
import WishlistTabs from "../components/WishlistTabs";
import CollectionCard from "../components/CollectionCard";
import Alert from "@/components/Alert/Alert";
import { useGetWishLists } from "@/services/WishLists/useGetWishLists";
import type { WishlistItem as ServiceWishlistItem } from "@/services/WishLists/useGetWishLists";
import { useWishlistStore } from "@/store/wishlistStore";
import type { WishlistItem as StoreWishlistItem } from "@/store/wishlistStore";

const WishListsScreen = () => {
  const { wishlists, isLoading: isApiLoading } = useGetWishLists();
  const { collections, createCollection, addItemToCollection, setWishlist } =
    useWishlistStore();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"items" | "collections">("items");
  const [openedCollection, setOpenedCollection] = useState<string | null>(null);
  const [selectedProductForCollection, setSelectedProductForCollection] =
    useState<StoreWishlistItem | null>(null);

  // Alert Prompt State
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const navigate = useNavigate();

  const currentOpenedCollection = collections.find(
    (c) => c.id === openedCollection,
  );

  const mapApiToStoreItem = (
    apiItem: ServiceWishlistItem,
  ): StoreWishlistItem => ({
    id: apiItem.id,
    name: apiItem.name,
    price: apiItem.discountedPrice || apiItem.price,
    image: apiItem.primaryImage,
    isNew: apiItem.tags?.some((t) => t.name === "New") || false,
    discount: apiItem.discount?.value || 0,
    category: apiItem.category?.id || "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sync API wishlists with store for heart icon color consistency
  useEffect(() => {
    if (wishlists && wishlists.length > 0) {
      setWishlist(wishlists.map(mapApiToStoreItem));
    }
  }, [wishlists, setWishlist]);

  const handleCreateCollection = () => {
    setIsAlertOpen(true);
    setNewCollectionName("");
  };

  const handleConfirmCollection = () => {
    if (newCollectionName && newCollectionName.trim()) {
      createCollection(newCollectionName.trim());
      setIsAlertOpen(false);
      setNewCollectionName("");
    }
  };

  const handleAddToCollection = (collectionId: string) => {
    if (selectedProductForCollection) {
      addItemToCollection(collectionId, selectedProductForCollection);
      setSelectedProductForCollection(null);
      setShowSuccessAlert(true);
    }
  };

  if (isLoading || isApiLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white pb-32 font-sans transition-colors duration-500">
      <Alert
        isOpen={isAlertOpen}
        title="New Collection"
        message="Give your collection a name to stay organized."
        type="confirm"
        confirmText="Create"
        cancelText="Cancel"
        showInput={true}
        inputValue={newCollectionName}
        onInputChange={setNewCollectionName}
        placeholder="e.g. Summer Essentials"
        onConfirm={handleConfirmCollection}
        onCancel={() => setIsAlertOpen(false)}
      />

      <Alert
        isOpen={showSuccessAlert}
        title="Success!"
        message="Item has been added to your collection."
        type="success"
        confirmText="Great"
        onConfirm={() => setShowSuccessAlert(false)}
      />

      <WishlistTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setOpenedCollection(null);
        }}
        itemCount={wishlists?.length || 0}
      />

      {/* Content */}
      <div className="px-5 pt-8">
        {activeTab === "items" ? (
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
                    onWishlistClick={() =>
                      console.log("Wishlist:", product.name)
                    }
                    onAddToCollection={() =>
                      setSelectedProductForCollection(
                        mapApiToStoreItem(product),
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <WishlistEmpty />
            )}

            {/* Collection Selection Overlay/Modal */}
            {selectedProductForCollection && (
              <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm px-4 pb-8">
                <div className="w-full max-w-sm bg-white rounded-[32px] p-8 animate-in slide-in-from-bottom-full duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-black">
                      Add to Collection
                    </h3>
                    <button
                      onClick={() => setSelectedProductForCollection(null)}
                      className="text-gray-400 hover:text-black font-medium"
                    >
                      Cancel
                    </button>
                  </div>

                  {collections.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-400 mb-4">No collections yet</p>
                      <button
                        onClick={handleCreateCollection}
                        className="w-full py-4 bg-black text-white rounded-2xl font-bold"
                      >
                        Create Your First Collection
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {collections.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => handleAddToCollection(col.id)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-bold text-sm text-black">
                            {col.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {col.items.length} items
                          </span>
                        </button>
                      ))}
                      <button
                        onClick={handleCreateCollection}
                        className="w-full py-4 text-center text-gray-500 font-bold text-sm"
                      >
                        + Create New Collection
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : openedCollection && currentOpenedCollection ? (
          <div className="pb-24 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setOpenedCollection(null)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {currentOpenedCollection.name}
                </h2>
                <p className="text-sm text-gray-400">
                  {currentOpenedCollection.items.length} items
                </p>
              </div>
            </div>

            {currentOpenedCollection.items.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                {currentOpenedCollection.items.map((product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    imageSrc={product.image}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    isNew={product.isNew}
                    aspectRatio="portrait"
                    onClick={() => navigate(`/outshine/product/${product.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p>This collection is empty</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-24">
            <CollectionCard isCreateNew onClick={handleCreateCollection} />
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                onClick={() => setOpenedCollection(collection.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListsScreen;
