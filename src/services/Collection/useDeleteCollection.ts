import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

export interface DeleteCollectionResponse {
  success: boolean;
  message: string;
}

/**
 * Helper function to handle the delete collection request
 */
async function deleteCollection(
  url: string,
): Promise<DeleteCollectionResponse> {
  const response = await fetcherOSStore.delete(url);
  return response.data;
}

/**
 * Hook for deleting a collection
 * @param id The collection ID to delete
 */
export const useDeleteCollection = (id: string | null) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    id ? `/api/v1/collections/${id}` : null,
    deleteCollection,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
