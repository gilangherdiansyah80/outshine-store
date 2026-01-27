import { fetcherOSStore } from "@/lib/axios";

export interface ChangeDefaultResponse {
  success: boolean;
  message: string;
}

export const setAddressDefault = async (
  id: string,
): Promise<ChangeDefaultResponse> => {
  const response = await fetcherOSStore.patch(
    `/api/v1/addresses/${id}/default`,
  );
  return response.data;
};
