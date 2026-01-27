import { fetcherOSStore } from "@/lib/axios";

export interface DeleteCartPayload {
  productId: string;
  sizeId: string;
}

export interface DeleteCartResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const deleteCartItem = async (
  payload: DeleteCartPayload,
): Promise<DeleteCartResponse> => {
  // Axios delete with body requires data property in config
  const response = await fetcherOSStore.delete("/api/v1/cart/items", {
    data: payload,
  });
  return response.data;
};
