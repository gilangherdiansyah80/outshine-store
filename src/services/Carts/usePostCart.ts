import { fetcherOSStore } from "@/lib/axios";

export interface PostCartPayload {
  productId: string;
  sizeId: string;
}

export interface PostCartResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const postCartItem = async (
  payload: PostCartPayload,
): Promise<PostCartResponse> => {
  const response = await fetcherOSStore.post("/api/v1/cart/items", payload);
  return response.data;
};
