import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the forgot password request
 */
async function forgotPassword(
  url: string,
  { arg }: { arg: ForgotPasswordRequest },
): Promise<ForgotPasswordResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Reset OTP sent to your email",
    };
  }

  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for forgot password
 */
export const usePostForgotPassword = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/forgot-password",
    forgotPassword,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
