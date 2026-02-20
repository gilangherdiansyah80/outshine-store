import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useGetDetailProduct } from "@outshine/services/Products/useGetDetailProduct";
import { useGetReviews } from "@outshine/services/Reviews/useGetReviews";
import Loading from "@/components/Loader/Loading";

import ReviewsSummaryWeb from "./components/ReviewsSummaryWeb";
import RatingDistributionWeb from "./components/RatingDistributionWeb";
import ReviewsFilterWeb from "./components/ReviewsFilterWeb";
import ReviewCardDetailedWeb from "./components/ReviewCardDetailedWeb";
import Pagination from "@/components/Pagination/Pagination";

export default function ProductReviewsWeb() {
  const { id } = useParams();
  const { product, isLoading: productLoading } = useGetDetailProduct(id);
  const { reviews, isLoading: reviewsLoading } = useGetReviews(id);

  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  if (productLoading || reviewsLoading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400 font-bold">Produk tidak ditemukan.</p>
      </div>
    );
  }

  // Filter logic
  const filteredReviews = reviews.filter((review) => {
    if (activeFilter === "photo")
      return review.images && review.images.length > 0;
    if (activeFilter === "rating-5") return review.rating === 5;
    if (activeFilter === "rating-4") return review.rating === 4;
    if (activeFilter === "rating-1-3")
      return review.rating >= 1 && review.rating <= 3;
    return true;
  });

  // Sort logic
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (activeSort === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (activeSort === "highest") return b.rating - a.rating;
    if (activeSort === "lowest") return a.rating - b.rating;
    return 0;
  });

  const itemsPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(sortedReviews.length / itemsPerPage),
  );
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-8 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mt-12 uppercase tracking-widest">
          <Link
            to="/outshine/home"
            className="hover:text-[#2563EB] transition-colors"
          >
            Beranda
          </Link>
          <ChevronRight size={10} />
          <Link
            to={`/outshine/products?category=${product.category}`}
            className="hover:text-[#2563EB] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={10} />
          <span className="text-gray-900">Ulasan Produk</span>
        </nav>

        {/* Product Header Card */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-2">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-black text-[#0F172A] font-sans">
              {product.title}
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Garansi Resmi 1 Tahun • {product.category}
            </p>
          </div>
        </div>

        {/* Info Grid: Rating & Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ReviewsSummaryWeb
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
          <div className="md:col-span-2">
            <RatingDistributionWeb
              distribution={product.ratingDistribution}
              totalReviews={product.reviewCount}
            />
          </div>
        </div>

        {/* Filters */}
        <ReviewsFilterWeb
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeSort={activeSort}
          onSortChange={setActiveSort}
        />

        {/* Reviews List */}
        <div className="space-y-6">
          {paginatedReviews.length > 0 ? (
            paginatedReviews.map((review) => (
              <ReviewCardDetailedWeb key={review.id} review={review} />
            ))
          ) : (
            <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold italic">
                Tidak ada ulasan yang sesuai dengan filter ini.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </main>
  );
}
