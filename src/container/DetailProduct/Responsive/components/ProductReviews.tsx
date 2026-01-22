import { Star, User } from "lucide-react";
import type { ReviewItem } from "@/services/Products/useGetDetailProduct";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  ratingDistribution?: Record<string, number>;
  reviews?: ReviewItem[];
}

const ProductReviews = ({
  rating,
  reviewCount,
  ratingDistribution,
  reviews,
}: ProductReviewsProps) => {
  const getPercentage = (star: number) => {
    if (!ratingDistribution || reviewCount === 0) return "0%";
    // Access using both number and string key to be safe
    const count =
      ratingDistribution[star] || ratingDistribution[String(star)] || 0;
    return `${Math.round((count / reviewCount) * 100)}%`;
  };

  return (
    <div className="pt-6 pb-8">
      <h3 className="text-lg font-bold text-[#0F172A] mb-4">
        Customer Reviews
      </h3>
      <div className="flex items-center gap-6 mb-8">
        <div>
          <div className="text-5xl font-bold text-[#0F172A] leading-none">
            {rating}
          </div>
          <div className="flex gap-1 mt-2 text-blue-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="w-4 h-4 fill-blue-500"
                size={16}
                strokeWidth={0}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-1">{reviewCount} reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = getPercentage(star);
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="font-bold text-[#0F172A] w-2">{star}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: pct }}
                  />
                </div>
                <span className="text-gray-400 w-8 text-right">{pct}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {(!reviews || reviews.length === 0) && (
          <p className="text-gray-400 text-sm">No reviews yet.</p>
        )}
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-semibold text-[#0F172A] text-sm">
                  {review.user?.name || "Anonymous"}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${
                    s <= review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
