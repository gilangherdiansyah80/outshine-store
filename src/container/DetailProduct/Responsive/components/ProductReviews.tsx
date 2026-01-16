import { Star } from "lucide-react";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
}

const ProductReviews = ({ rating, reviewCount }: ProductReviewsProps) => {
  return (
    <div className="pt-6 pb-8">
      <h3 className="text-lg font-bold text-white mb-4">Customer Reviews</h3>
      <div className="flex items-center gap-6 mb-6">
        <div>
          <div className="text-5xl font-bold text-white leading-none">
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
          {[
            { star: 5, pct: "80%" },
            { star: 4, pct: "15%" },
            { star: 3, pct: "5%" },
          ].map((row) => (
            <div key={row.star} className="flex items-center gap-3 text-xs">
              <span className="font-bold text-white w-2">{row.star}</span>
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: row.pct }}
                />
              </div>
              <span className="text-gray-400 w-6 text-right">{row.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
