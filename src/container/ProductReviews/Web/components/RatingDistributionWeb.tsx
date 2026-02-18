interface RatingDistributionWebProps {
  distribution?: Record<string, number>;
  totalReviews: number;
}

export default function RatingDistributionWeb({
  distribution = {},
  totalReviews,
}: RatingDistributionWebProps) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 h-full">
      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest text-left">
        Distribusi Rating
      </h3>
      <div className="space-y-4">
        {ratings.map((star) => {
          const count = distribution[star.toString()] || 0;
          const percentage =
            totalReviews > 0 ? (count / totalReviews) * 100 : 0;

          return (
            <div key={star} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-6">
                <span className="text-sm font-bold text-gray-900">{star}</span>
                <span className="text-yellow-400">★</span>
              </div>
              <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-[13px] font-bold text-gray-400 w-10 text-right">
                {Math.round(percentage)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
