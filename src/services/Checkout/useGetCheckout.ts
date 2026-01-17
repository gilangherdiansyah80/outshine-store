import useSWR from "swr";

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  cardNumber?: string;
  expiry?: string;
  icon?: string;
  type: "visa" | "apple-pay" | "google-pay" | "paypal";
}

export interface CheckoutData {
  addresses: Address[];
  shippingMethods: ShippingMethod[];
  paymentMethods: PaymentMethod[];
}

const mockCheckoutData: CheckoutData = {
  addresses: [
    {
      id: "addr-1",
      name: "Sarah Mitchell",
      phone: "+1 234 567 890",
      street: "248 Fashion District, Suite 12",
      district: "Los Angeles",
      city: "CA",
      postalCode: "90015",
      isDefault: true,
    },
  ],
  shippingMethods: [
    {
      id: "ship-1",
      name: "Standard Delivery",
      description: "3-5 business days",
      price: 0,
    },
    {
      id: "ship-2",
      name: "Express Shipping",
      description: "1-2 business days",
      price: 15,
    },
  ],
  paymentMethods: [
    {
      id: "pay-1",
      name: "Visa ending in 4242",
      cardNumber: "4242",
      expiry: "12/26",
      type: "visa",
    },
    {
      id: "pay-2",
      name: "Apple Pay",
      type: "apple-pay",
    },
  ],
};

const getCheckoutData = async (): Promise<CheckoutData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCheckoutData;
};

export const useGetCheckout = () => {
  const { data, error, isLoading } = useSWR("/checkout-data", getCheckoutData, {
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
};
