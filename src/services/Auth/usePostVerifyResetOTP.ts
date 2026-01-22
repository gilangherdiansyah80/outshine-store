import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface VerifyResetOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyResetOTPResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the verify reset OTP request
 */
async function verifyResetOTP(
  url: string,
  { arg }: { arg: VerifyResetOTPRequest },
): Promise<VerifyResetOTPResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "OTP verified correctly",
    };
  }

  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for verifying reset password OTP
 */
export const usePostVerifyResetOTP = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/verify-reset-otp",
    verifyResetOTP,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
