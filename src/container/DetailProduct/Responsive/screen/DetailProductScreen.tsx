import React, { useState } from "react";
import type { ProductDetail } from "@outshine/services/Products/useGetDetailProduct";
import ProductActions from "../components/ProductActions";
import ProductDetails from "../components/ProductDetails";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductReviews from "../components/ProductReviews";
import ProductSizeSelector from "../components/ProductSizeSelector";
import BottomSheet from "@outshine/ui/BottomSheet/BottomSheet";
import { ChevronRight, Ruler } from "lucide-react";

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
        id={product.id}
        name={product.title}
        price={product.price}
        originalPrice={product.originalPrice || product.price}
        formattedDiscounted={product.formattedDiscounted || ""}
        formattedOriginal={product.formattedOriginal || ""}
        isPo={product.isPo}
        poDpPercent={product.poDpPercent}
        image={product.images[0]}
        selectedSize={selectedSize}
        sizeId={product.sizes.find((s) => s.name === selectedSize)?.id}
        onOpenSizeSelector={() => setIsSizeSheetOpen(true)}
      />

      <BottomSheet
        isOpen={isSizeSheetOpen}
        onClose={() => setIsSizeSheetOpen(false)}
        title="Pilih Ukuran"
      >
        <button className="flex gap-x-1 self-end cursor-pointer items-center">
          <Ruler className="w-3 h-3 text-blue-600" />
          <h1 className="text-xs font-medium text-blue-600">Panduan Ukuran</h1>
          <ChevronRight className="w-4 h-4 text-blue-600" />
        </button>
        <ProductSizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={(size) => {
            setSelectedSize(size);
            setIsSizeSheetOpen(false);
          }}
        />
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
    </div>
  );
};

export default DetailProductScreen;
