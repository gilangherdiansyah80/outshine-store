import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductDetail } from "@outshine/services/Products/useGetDetailProduct";
import ProductActions from "../components/ProductActions";
import ProductDetails from "../components/ProductDetails";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import ProductSizeSelector from "../components/ProductSizeSelector";
import BottomSheet from "@outshine/ui/BottomSheet/BottomSheet";
import { ChevronRight, Ruler } from "lucide-react";
import ProductGuideSize from "../components/ProductGuideSize";
import ProductQuantitySelector from "../components/ProductQuantitySelector";
import { useCartStore } from "@outshine/store/cartStore";
import { useAddressStore } from "@/store/addressStore";
import { postCartItem } from "@/services/Carts/usePostCart";

interface DetailProductScreenProps {
  product: ProductDetail;
}

const DetailProductScreen: React.FC<DetailProductScreenProps> = ({
  product,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeSheetOpen, setIsSizeSheetOpen] = useState(false);
  const [isSpecsSheetOpen, setIsSpecsSheetOpen] = useState(false);
  const [isGuideSizeOpen, setIsGuideSizeOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [actionType, setActionType] = useState<"cart" | "buy" | "chat" | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { addItem, setBuyNowItem } = useCartStore();
  const { actions: addressActions } = useAddressStore();

  return (
    <div className="min-h-screen bg-gray-100 pb-24 font-sans">
      <div className="bg-white">
        <ProductImageGallery
          id={product.id}
          images={product.images}
          title={product.title}
          price={product.price}
          currentIndex={activeImageIndex}
          onIndexChange={setActiveImageIndex}
        />

        <ProductInfo
          title={product.title}
          price={product.price}
          formattedDiscounted={product.formattedDiscounted}
          formattedOriginal={product.formattedOriginal}
          rating={product.rating}
          reviewCount={product.reviewCount}
          totalBuyers={product.totalBuyers}
          isPo={product.isPo}
          images={product.images}
          onSelectImage={setActiveImageIndex}
        />
      </div>

      <div className="mt-2 bg-white">
        <ProductReviews
          rating={product.rating}
          reviewCount={product.reviewCount}
          ratingDistribution={product.ratingDistribution}
          reviews={product.reviews}
        />
      </div>

      <div className="mt-2 bg-white">
        <ProductDetails
          description={product.description}
          specs={product.specs}
          onOpenSpecs={() => setIsSpecsSheetOpen(true)}
        />
      </div>

      <ProductActions
        onAction={(type: "cart" | "buy" | "chat") => {
          setActionType(type);
          setIsSizeSheetOpen(true);
        }}
      />

      <BottomSheet
        isOpen={isSizeSheetOpen}
        onClose={() => setIsSizeSheetOpen(false)}
        title={actionType === "cart" ? "Tambah ke Keranjang" : "Beli Sekarang"}
      >
        <div className="flex flex-col gap-4">
          {/* Header Inside Sheet */}
          <div className="flex gap-4 items-end pb-4 border-b border-gray-100">
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 pb-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#EE4D2D]">
                  {product.formattedDiscounted || product.price}
                </span>
              </div>
              <span className="text-xs text-gray-500">Stok: 99</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium text-gray-900">Ukuran</span>
            <button
              className="flex gap-x-1 items-center"
              onClick={() => setIsGuideSizeOpen(true)}
            >
              <Ruler className="w-3 h-3 text-blue-600" />
              <h1 className="text-xs font-medium text-blue-600">
                Panduan Ukuran
              </h1>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          <ProductSizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSizeChange={(size) => {
              setSelectedSize(size);
            }}
          />

          <ProductQuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          <button
            onClick={async () => {
              if (!selectedSize) return;

              const sizeId = product.sizes.find(
                (s) => s.name === selectedSize,
              )?.id;
              if (!sizeId) return;

              if (actionType === "cart") {
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
                    setIsSizeSheetOpen(false);
                    navigate("/outshine/cart");
                  }
                } catch (error) {
                  console.error("Failed to add to cart:", error);
                } finally {
                  setIsSubmitting(false);
                }
              } else if (actionType === "buy") {
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
                setIsSizeSheetOpen(false);
                navigate(
                  `/outshine/checkout?productId=${product.id}&sizeId=${sizeId}&quantity=${quantity}`,
                );
              } else if (actionType === "chat") {
                const phoneNumber = "628135374168";
                const currentUrl = window.location.href;
                const absoluteImageUrl = product.images[0].startsWith("http")
                  ? product.images[0]
                  : `${window.location.origin}${product.images[0]}`;

                const message = `${absoluteImageUrl}\n\nHaii admin outshine. Apakah product ${product.title} dengan size ${selectedSize} (Quantity: ${quantity}) masih ready?\n\nLink Produk: ${currentUrl}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                window.open(whatsappUrl, "_blank");
                setIsSizeSheetOpen(false);
              }
            }}
            disabled={!selectedSize || isSubmitting}
            className="w-full py-3 bg-[#0B0F19] text-white font-bold rounded-lg mt-2 uppercase disabled:bg-gray-200 disabled:text-gray-400 transition-colors"
          >
            {isSubmitting
              ? "Memproses..."
              : !selectedSize
                ? "Pilih Ukuran"
                : actionType === "cart"
                  ? "Masukkan Keranjang"
                  : actionType === "buy"
                    ? "Beli Sekarang"
                    : "Tanya Admin"}
          </button>
        </div>
      </BottomSheet>

      <BottomSheet
        isOpen={isSpecsSheetOpen}
        onClose={() => setIsSpecsSheetOpen(false)}
        title="Spesifikasi"
      >
        <div className="space-y-4">
          <ul className="divide-y divide-gray-100 px-1">
            {product.specs.map((spec) => (
              <li key={spec.id} className="flex justify-between py-4 text-sm">
                <span className="text-gray-500">{spec.key}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </li>
            ))}
          </ul>
          {/* <button
            onClick={() => setIsSpecsSheetOpen(false)}
            className="w-full py-3 bg-[#EE4D2D] text-white font-bold rounded-lg mt-4 uppercase"
          >
            OK
          </button> */}
        </div>
      </BottomSheet>

      <ProductGuideSize
        isOpen={isGuideSizeOpen}
        onClose={() => setIsGuideSizeOpen(false)}
        title="Panduan Ukuran"
        guideSize={product.sizeGuide || []}
      />
    </div>
  );
};

export default DetailProductScreen;
