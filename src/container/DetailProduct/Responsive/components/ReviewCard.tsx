import { Star, User } from "lucide-react";
import type { Review } from "@/services/Reviews/useGetReviews";
import type { ReviewItem } from "@/services/Products/useGetDetailProduct";

// Union type to support both existing ProductDetail reviews and new API reviews
type ReviewData = Review | ReviewItem;

interface ReviewCardProps {
  review: ReviewData;
  onImageClick?: (imageUrl: string) => void;
}

const ReviewCard = ({ review, onImageClick }: ReviewCardProps) => {
  // Normalize data (handle slight differences if any between Review and ReviewItem)
  const userName = "userName" in review ? review.userName : review.user.name;
  const userAvatar = review.userAvatar;
  const rating = review.rating;
  const comment = review.comment;
  const images = review.images || [];
  const date = new Date(review.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-2 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="text-gray-400" />
            )}
          </div>
          <div>
            <div className="text-sm text-gray-900 font-medium leading-none mb-1">
              {userName}
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-[10px] text-gray-400">{date}</div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{comment}</p>

      {images.length > 0 && (
        <div className="flex gap-2 pt-1 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, idx) => (
            <button
              key={idx}
              onClick={() => onImageClick?.(image)}
              className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-50 border border-gray-100"
            >
              <img
                src={image}
                alt={`Review attachment ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
