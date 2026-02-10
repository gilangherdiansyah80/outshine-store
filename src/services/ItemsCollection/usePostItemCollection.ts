import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

export interface PostItemCollectionResponse {
  success: boolean;
  message: string;
}

/**
 * Hook for adding a product to a collection
 */
export const usePostItemCollection = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "collection-item-post",
    async (
      _url,
      { arg }: { arg: { collectionId: string; productId: string } },
    ) => {
      const response = await fetcherOSStore.post(
        `/api/v1/collections/${arg.collectionId}/products/${arg.productId}`,
      );
      return response.data;
    },
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
