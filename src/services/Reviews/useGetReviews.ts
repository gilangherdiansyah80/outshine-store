import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface ReviewImage {
  id?: string; // Optional if not returned by API directly in array
  url: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  userEmail: string;
  userName: string;
  userAvatar: string | null;
  images: string[]; // Array of URLs
}

interface ReviewsResponse {
  success: boolean;
  message: string;
  data: Review[];
}

export const getReviewsData = async (productId: string): Promise<Review[]> => {
  const response = await fetcherOSStore.get<ReviewsResponse>(
    `/api/v1/products/${productId}/reviews`,
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to fetch reviews");
  }

  return response.data.data;
};

export const useGetReviews = (productId?: string) => {
  const { data, error, isLoading, mutate } = useSWR<Review[]>(
    productId ? `/api/v1/products/${productId}/reviews` : null,
    () => getReviewsData(productId!),
    {
      revalidateOnFocus: false,
    },
  );

  return {
    reviews: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
