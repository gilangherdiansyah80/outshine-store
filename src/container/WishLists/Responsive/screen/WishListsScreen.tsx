import { useState, useEffect } from "react";
import Loading from "@/components/Loader/Loading";
import Alert from "@/components/Alert/Alert";
import WishlistTabs from "../components/WishlistTabs";
import WishlistItemsGrid from "../components/WishlistItemsGrid";
import CollectionDetail from "../components/CollectionDetail";
import CollectionGrid from "../components/CollectionGrid";
import { useGetWishLists } from "@/services/WishLists/useGetWishLists";
import type { WishlistItem as ServiceWishlistItem } from "@/services/WishLists/useGetWishLists";
import { useWishlistStore } from "@/store/wishlistStore";
import type { WishlistItem as StoreWishlistItem } from "@/store/wishlistStore";
import { useGetCollections } from "@/services/Collection/useGetCollections";
import { useDeleteCollection } from "@/services/Collection/useDeleteCollection";
import { usePostItemCollection } from "@/services/ItemsCollection/usePostItemCollection";
import { useGetItemCollection } from "@/services/ItemsCollection/useGetItemCollection";
import { useDeleteItemCollection } from "@/services/ItemsCollection/useDeleteItemCollection";
import { useNavigationStore } from "@/store/navigationStore";

const WishListsScreen = () => {
  // ── Data Hooks ──
  const { wishlists, isLoading: isApiLoading } = useGetWishLists();
  const {
    collections: apiCollections,
    isLoading: isCollLoading,
    mutate: mutateCollections,
  } = useGetCollections();
  const { addItemToCollection, setWishlist } = useWishlistStore();
  const setFooterVisible = useNavigationStore(
    (state) => state.actions.setFooterVisible,
  );

  // ── Local State ──
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"items" | "collections">("items");
  const [openedCollection, setOpenedCollection] = useState<string | null>(null);
  const [selectedProductForCollection, setSelectedProductForCollection] =
    useState<StoreWishlistItem | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ── Mutation / Detail Hooks ──
  const { trigger: deleteTrigger, isLoading: isDeleting } =
    useDeleteCollection(openedCollection);
  const { trigger: addItemTrigger, isLoading: isAddingItem } =
    usePostItemCollection();
  const {
    items: collectionProducts,
    isLoading: isFetchingItems,
    mutate: mutateItems,
  } = useGetItemCollection(openedCollection);
  const { trigger: removeItemTrigger, isLoading: isRemovingItem } =
    useDeleteItemCollection();

  const currentOpenedCollection = apiCollections.find(
    (c) => c.id === openedCollection,
  );

  // ── Helpers ──
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

  // ── Effects ──
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFooterVisible(!selectedProductForCollection);
    return () => setFooterVisible(true);
  }, [selectedProductForCollection, setFooterVisible]);

  useEffect(() => {
    if (wishlists && wishlists.length > 0) {
      setWishlist(wishlists.map(mapApiToStoreItem));
    }
  }, [wishlists, setWishlist]);

  // ── Handlers ──
  const handleAddToCollection = async (collectionId: string) => {
    if (!selectedProductForCollection) return;
    try {
      const result = await addItemTrigger({
        collectionId,
        productId: selectedProductForCollection.id,
      });
      if (result.success) {
        addItemToCollection(collectionId, selectedProductForCollection);
        setSelectedProductForCollection(null);
        setShowSuccessAlert(true);
        mutateCollections();
      }
    } catch (error) {
      console.error("Failed to add item to collection:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!openedCollection) return;
    try {
      const result = await deleteTrigger();
      if (result.success) {
        setShowDeleteConfirm(false);
        setOpenedCollection(null);
        mutateCollections();
      }
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!openedCollection) return;
    try {
      const result = await removeItemTrigger({
        collectionId: openedCollection,
        productId,
      });
      if (result.success) {
        mutateItems();
        mutateCollections();
      }
    } catch (error) {
      console.error("Failed to remove item from collection:", error);
    }
  };

  // ── Loading ──
  if (isLoading || isApiLoading || isCollLoading) {
    return <Loading />;
  }

  // ── Render ──
  return (
    <div className="min-h-screen bg-white pb-32 font-sans transition-colors duration-500">
      <Alert
        isOpen={showSuccessAlert}
        title="Success!"
        message="Item has been added to your collection."
        type="success"
        confirmText="Great"
        onConfirm={() => setShowSuccessAlert(false)}
      />

      <Alert
        isOpen={showDeleteConfirm}
        title="Delete Collection?"
        message="This action cannot be undone. All items inside will remain in your wishlist."
        type="confirm"
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <WishlistTabs
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setOpenedCollection(null);
        }}
        itemCount={wishlists?.length || 0}
        collectionCount={apiCollections.length}
      />

      <div className="px-5 pt-8">
        {activeTab === "items" ? (
          <WishlistItemsGrid
            wishlists={wishlists || []}
            collections={apiCollections}
            isAddingItem={isAddingItem}
            selectedProduct={selectedProductForCollection}
            onSelectProduct={setSelectedProductForCollection}
            onClearSelection={() => setSelectedProductForCollection(null)}
            onAddToCollection={handleAddToCollection}
            mapApiToStoreItem={mapApiToStoreItem}
          />
        ) : openedCollection && currentOpenedCollection ? (
          <CollectionDetail
            collectionName={currentOpenedCollection.name}
            itemCount={collectionProducts.length}
            products={collectionProducts}
            isFetchingItems={isFetchingItems}
            isDeleting={isDeleting}
            isRemovingItem={isRemovingItem}
            onBack={() => setOpenedCollection(null)}
            onDelete={() => setShowDeleteConfirm(true)}
            onRemoveItem={handleRemoveItem}
          />
        ) : (
          <CollectionGrid
            collections={apiCollections}
            onOpenCollection={setOpenedCollection}
            onCreateSuccess={() => mutateCollections()}
          />
        )}
      </div>
    </div>
  );
};

export default WishListsScreen;
