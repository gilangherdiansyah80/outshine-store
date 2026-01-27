import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface DeleteWishlistsRequest {
  productId: string;
}

export interface DeleteWishlistsResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the remove from wishlist request (Mock or Real)
 */
async function deleteWishlistsUser(
  url: string,
  { arg }: { arg: DeleteWishlistsRequest },
): Promise<DeleteWishlistsResponse> {
  const finalUrl = `${url}/${arg.productId}`;

  if (USE_MOCK) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success response
    return {
      success: true,
      message: "Product removed from wishlist",
      data: null,
    };
  }

  // Real API call
  const response = await fetcherOSStore.delete(finalUrl);
  return response.data;
}

/**
 * Hook for removing product from wishlist
 */
export const useDeleteWishlists = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/wishlist",
    deleteWishlistsUser,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
