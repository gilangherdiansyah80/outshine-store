import useSWR from "swr";
import { fetcherOSStore } from "@/lib/axios";

export interface PaymentMethodData {
  id: string;
  code: string;
  name: string;
  accountNumber: string;
  accountHolder: string;
  instructions: string; // JSON string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaymentMethodResponse {
  success: boolean;
  message: string;
  data: PaymentMethodData[];
}

export const getPaymentMethods = async (): Promise<PaymentMethodData[]> => {
  const response = await fetcherOSStore.get<PaymentMethodResponse>(
    "/api/v1/payment-methods",
  );
  return response.data.data;
};

export const useGetPaymentMethod = () => {
  const { data, error, isLoading, mutate } = useSWR<PaymentMethodData[]>(
    "/api/v1/payment-methods",
    getPaymentMethods,
  );

  return {
    paymentMethods: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};
