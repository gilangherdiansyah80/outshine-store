import { fetcherOSStore } from "@/lib/axios";

export interface DeleteAddressResponse {
  success: boolean;
  message: string;
}

export const deleteAddress = async (
  id: string,
): Promise<DeleteAddressResponse> => {
  const response = await fetcherOSStore.delete(`/api/v1/addresses/${id}`);
  return response.data;
};
