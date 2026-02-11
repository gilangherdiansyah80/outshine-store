import { fetcherOSStore } from "@/lib/axios";

export interface PostOrderPayload {
  addressId: string;
  paymentType: "full" | "dp";
  paymentMethod: string; // e.g., 'bca', 'qris', 'gopay'
  paymentProvider: "manual"; // Defaulted to manual as requested
  productId?: string; // Optional for Cart checkout
  sizeId?: string; // Optional for Cart checkout
  quantity?: number; // Optional for Cart checkout
}

export interface Instruction {
  step: number;
  text: string;
}

export interface PostOrderResponse {
  success: boolean;
  message: string;
  data: {
    order: {
      id: string;
      totalPrice: number;
      paidAmount: number; // For DP/Full payment price display
      status: string;
    };
    payment: {
      paymentId: string;
      transactionId: string;
      amount: number;
      expiredAt: string;
      bank: {
        name: string;
        accountNumber: string;
        accountHolder: string;
      };
      instructions: Instruction[]; // Array of Instruction objects instead of string array
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
