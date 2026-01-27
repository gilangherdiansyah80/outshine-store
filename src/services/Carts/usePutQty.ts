import { fetcherOSStore } from "@/lib/axios";

export interface PutQtyPayload {
  productId: string;
  sizeId: string;
  quantity: number;
}

export interface PutQtyResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const putCartQty = async (
  payload: PutQtyPayload,
): Promise<PutQtyResponse> => {
  const response = await fetcherOSStore.put("/api/v1/cart/items", payload);
  return response.data;
};
