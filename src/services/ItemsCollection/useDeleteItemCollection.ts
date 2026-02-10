import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

interface DeleteItemCollectionResponse {
  success: boolean;
  message: string;
}

interface DeleteItemCollectionArgs {
  collectionId: string;
  productId: string;
}

const deleteItemCollection = async (
  _key: string,
  { arg }: { arg: DeleteItemCollectionArgs },
): Promise<DeleteItemCollectionResponse> => {
  const response = await fetcherOSStore.delete(
    `/api/v1/collections/${arg.collectionId}/products/${arg.productId}`,
  );
  return response.data;
};

export const useDeleteItemCollection = () => {
  const { trigger, data, isMutating, error } = useSWRMutation<
    DeleteItemCollectionResponse,
    Error,
    string,
    DeleteItemCollectionArgs
  >("delete-item-collection", deleteItemCollection);

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
