import { useState } from "react";
import { Star, ChevronRight } from "lucide-react";
import ImagePreview from "@outshine/ui/Image/ImagePreview";
import type { ReviewItem } from "@/services/Products/useGetDetailProduct";
import ReviewCard from "./ReviewCard";
import { useResponsiveNavigation } from "@/hooks/use-responsive-navigation";
import { useParams } from "react-router-dom";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  ratingDistribution?: Record<string, number>;
  reviews?: ReviewItem[];
}

const ProductReviews = ({
  rating,
  reviewCount,
  reviews = [],
}: ProductReviewsProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { push } = useResponsiveNavigation();
  const { id } = useParams();

  const handleViewAll = () => {
    push(`/outshine/product/${id}/all-reviews`);
  };

  return (
    <div className="bg-white" title={`Rating: ${rating}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-50">
        <section className="flex items-center gap-1">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-900 leading-none">
            {rating}
          </h2>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
          <h3 className="text-sm font-medium text-gray-900">
            Penilaian Produk ({reviewCount > 1000 ? "1,1RB" : reviewCount})
          </h3>
        </section>
        <button
          onClick={handleViewAll}
          className="flex items-center gap-1 text-xs text-[#0B0F19] cursor-pointer"
        >
          <span>Lihat Semua</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 py-3 space-y-4">
        {/* Individual Reviews - Limit to 2 */}
        <div className="space-y-6 pt-2">
          {reviews.slice(0, 2).map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      <ImagePreview
        src={selectedImage}
        onClose={() => setSelectedImage(null)}
        alt="Review preview"
      />
    </div>
  );
};

export default ProductReviews;
