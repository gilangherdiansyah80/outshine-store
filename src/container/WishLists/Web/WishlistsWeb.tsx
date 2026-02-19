import { useState } from "react";
import { useGetWishLists } from "@/services/WishLists/useGetWishLists";
import { useGetCollections } from "@/services/Collection/useGetCollections";
import Loading from "@/components/Loader/Loading";
import WishlistHeaderWeb from "./components/WishlistHeaderWeb";
import WishlistItemCardWeb from "./components/WishlistItemCardWeb";
import CollectionCardWeb from "./components/CollectionCardWeb";
import { useCartStore } from "@/store/cartStore";

export default function WishlistsWeb() {
  console.log("Rendering WishlistsWeb (New Version)");
  const [activeTab, setActiveTab] = useState<"items" | "collections">("items");
  const { wishlists, isLoading: isWishlistLoading } = useGetWishLists();
  const { collections, isLoading: isCollectionsLoading } = useGetCollections();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (productId: string) => {
    const item = wishlists?.find((p) => p.id === productId);
    if (item) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.discountedPrice || item.price,
        image: item.primaryImage,
        quantity: 1,
        sizeId: "wishlist-default",
        size: "M",
        color: "Default",
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    console.log("Removing item:", id);
  };

  if (isWishlistLoading || isCollectionsLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <WishlistHeaderWeb
        activeTab={activeTab}
        onTabChange={setActiveTab}
        itemCount={wishlists?.length || 0}
        collectionCount={collections?.length || 0}
      />

      {activeTab === "items" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlists && wishlists.length > 0 ? (
            wishlists.map((item) => (
              <WishlistItemCardWeb
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.discountedPrice || item.price}
                image={item.primaryImage}
                category={item.category?.name || "General"}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <p className="text-2xl font-black text-slate-200 uppercase tracking-[0.2em]">
                Your wishlist is empty
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections && collections.length > 0 ? (
            collections.map((coll) => (
              <CollectionCardWeb
                key={coll.id}
                id={coll.id}
                name={coll.name}
                itemCount={coll.items?.length || 0}
                onClick={(id) => console.log("Open collection:", id)}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <p className="text-2xl font-black text-slate-200 uppercase tracking-[0.2em]">
                No collections created
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
