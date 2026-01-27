import Loading from "@/components/Loader/Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistEmpty from "../components/WishlistEmpty";
import CardProduct from "@/components/Card/CardProduct";
import WishlistTabs from "../components/WishlistTabs";
import { useGetWishLists } from "@/services/WishLists/useGetWishLists";

const WishListsScreen = () => {
  const { wishlists, isLoading } = useGetWishLists();
  const [activeTab, setActiveTab] = useState<"items" | "collections">("items");
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white pb-32 font-sans transition-colors duration-500">
      <WishlistTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        itemCount={wishlists?.length || 0}
      />

      {/* Content */}
      <div className="px-5 pt-8">
        {activeTab === "items" ? (
          wishlists && wishlists.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-24">
              {wishlists.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  imageSrc={product.primaryImage}
                  name={product.name}
                  price={product.price}
                  isPo={product.isPo}
                  aspectRatio="portrait"
                  onClick={() => navigate(`/outshine/product/${product.id}`)}
                />
              ))}
            </div>
          ) : (
            <WishlistEmpty />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-sm font-medium">No collections created yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishListsScreen;
