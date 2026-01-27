import { fetcherOSStore } from "@/lib/axios";

export interface PostOrderPayload {
  addressId: string;
  paymentType: "full" | "dp";
  paymentMethod: string; // e.g., 'bca', 'qris', 'gopay'
  productId?: string; // Optional for Cart checkout
  sizeId?: string; // Optional for Cart checkout
  quantity?: number; // Optional for Cart checkout
}

export interface PostOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: {
      id: string;
      userId: string;
      totalPrice: number;
      expiredAt: string;
    };
    payment: {
      paymentId: string;
      method: string;
      vaNumber?: string;
      bankName?: string;
      qrUrl?: string; // For QRIS
      deepLink?: string; // For E-wallet
      status: string;
    };
  };
}

export const postOrderCheckout = async (
  payload: PostOrderPayload,
): Promise<PostOrderResponse> => {
  const response = await fetcherOSStore.post(
    "/api/v1/orders/checkout",
    payload,
  );
  return response.data;
};
