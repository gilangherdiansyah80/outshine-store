import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

export interface PostCollectionPayload {
  name: string;
}

export interface PostCollectionResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the create collection request
 */
async function postCollection(
  url: string,
  { arg }: { arg: PostCollectionPayload },
): Promise<PostCollectionResponse> {
  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for creating a new collection
 */
export const usePostCollection = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/collections",
    postCollection,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
