import { useState } from "react";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@outshine/lib/utils";
import Button from "@outshine/ui/Button/Button";
import type { ProductDetail } from "@outshine/services/Products/useGetDetailProduct";
import { useCartStore } from "@outshine/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import { postCartItem } from "@/services/Carts/usePostCart";
import { useTokenStore } from "@/lib/auth-adapter";

interface ProductInfoWebProps {
  product: ProductDetail;
}

const ProductInfoWeb = ({ product }: ProductInfoWebProps) => {
  const navigate = useNavigate();
  const { addItem, setBuyNowItem } = useCartStore();
  const { actions: addressActions } = useAddressStore();
  const accessToken = useTokenStore((state) => state.accessToken);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0]?.name || "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddToCart = async () => {
    if (!accessToken) {
      navigate("/outshine/welcome");
      return;
    }

    if (!selectedSize) return;

    const sizeId = product.sizes.find((s) => s.name === selectedSize)?.id;
    if (!sizeId) return;

    setIsSubmitting(true);
    try {
      const response = await postCartItem({
        productId: product.id,
        sizeId,
        quantity,
      });

      if (response.success) {
        addItem({
          id: product.id,
          name: product.title,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          formattedDiscounted: product.formattedDiscounted || "",
          formattedOriginal: product.formattedOriginal || "",
          isPo: product.isPo,
          poDpPercent: product.poDpPercent,
          sizeId,
          image: product.images[0],
          size: selectedSize,
          color: "Standard",
          quantity,
        });
        navigate("/outshine/cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBuyNow = () => {
    if (!accessToken) {
      navigate("/outshine/welcome");
      return;
    }

    if (!selectedSize) return;

    const sizeId = product.sizes.find((s) => s.name === selectedSize)?.id;
    if (!sizeId) return;

    const buyNowItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      formattedDiscounted: product.formattedDiscounted || "",
      formattedOriginal: product.formattedOriginal || "",
      isPo: product.isPo,
      poDpPercent: product.poDpPercent,
      image: product.images[0],
      sizeId,
      size: selectedSize,
      color: "Standard",
      quantity,
    };

    setBuyNowItem(buyNowItem);
    addressActions.resetSelection();
    navigate(
      `/outshine/checkout?productId=${product.id}&sizeId=${sizeId}&quantity=${quantity}`,
    );
  };

  return (
    <div className="flex flex-col gap-5 py-2 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm shadow-black">
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
          {product.category}
        </h4>
        <h1 className="text-4xl font-extrabold text-[#0F172A] leading-tight font-sans">
          {product.title}
        </h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-200",
                )}
              />
            ))}
            <span className="text-xs font-bold text-gray-400 ml-1">
              ({product.rating} reviews)
            </span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-bold bg-[#0F172A]/50 px-3 py-1 rounded-full text-white uppercase tracking-tighter">
            {product.isPo ? "Pre Order" : "In Stock"}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-[#2563EB]">
            {product.formattedDiscounted ||
              `Rp ${product.price.toLocaleString()}`}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through font-medium">
              {product.formattedOriginal ||
                `Rp ${product.originalPrice.toLocaleString()}`}
            </span>
          )}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Size:{" "}
            <span className="text-[#0F172A] font-black">{selectedSize}</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.name)}
              className={cn(
                "min-w-[48px] h-12 px-4 rounded-xl border-2 transition-all font-bold text-sm flex items-center justify-center shadow-sm",
                selectedSize === size.name
                  ? "border-[#2563EB] bg-blue-50 text-[#2563EB] scale-105"
                  : "border-gray-100 text-gray-400 hover:border-gray-200 bg-white",
              )}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Switch */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Condition
          </span>
          <button className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 uppercase">
            <Info size={12} />
            Warranty Info
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setCondition("new")}
            className={cn(
              "py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-sm",
              condition === "new"
                ? "bg-white text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            Brand New
          </button>
          <button
            onClick={() => setCondition("refurbished")}
            className={cn(
              "py-2.5 px-4 rounded-lg text-xs font-bold transition-all shadow-sm",
              condition === "refurbished"
                ? "bg-white text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            Refurbished
          </button>
        </div>
      </div> */}

      {/* Quantity Selector */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Quantity
        </span>
        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl w-fit overflow-hidden p-1 shadow-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#0F172A] font-bold text-lg"
          >
            -
          </button>
          <div className="w-12 h-10 flex items-center justify-center font-black text-[#0F172A]">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#0F172A] font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-4">
        <Button
          onClick={handleAddToCart}
          isLoading={isSubmitting}
          className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </Button>
        <Button
          onClick={handleBuyNow}
          disabled={isSubmitting}
          className="w-full bg-[#0F172A] hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-100 active:scale-[0.98] transition-all"
        >
          Buy It Now
        </Button>
      </div>

      <div className="flex items-center justify-center gap-8 py-2">
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#EE4D2D] transition-colors group">
          <Heart size={16} className="group-hover:fill-current" />
          Add to Wishlist
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#2563EB] transition-colors">
          <Share2 size={16} />
          Share
        </button>
      </div>
    </div>
  );
};

export default ProductInfoWeb;
