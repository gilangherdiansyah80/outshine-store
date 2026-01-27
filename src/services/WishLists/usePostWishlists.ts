import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface WishlistsRequest {
  productId: string;
}

export interface WishlistsResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the add to wishlist request (Mock or Real)
 */
async function wishlistsUser(
  url: string,
  { arg }: { arg: WishlistsRequest },
): Promise<WishlistsResponse> {
  const finalUrl = `${url}/${arg.productId}`;

  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    return {
      success: true,
      message: "Product added to wishlist",
      data: {
        userId: "d03339ad-e807-41ad-8a23-5ba8ba120b03",
        productId: "b472675d-00fb-490d-9422-39269a9fa6a4",
        createdAt: "2026-01-24T11:31:03.395Z",
      },
    };
  }

  // Real API call
  const response = await fetcherOSStore.post(finalUrl);
  return response.data;
}

/**
 * Hook for adding product to wishlist
 */
export const usePostWishlists = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/wishlist",
    wishlistsUser,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
