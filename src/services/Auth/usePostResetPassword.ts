import useSWRMutation from "swr/mutation";
import { fetcherOSStore } from "@/lib/axios";

// Flag to toggle between mock and real API
const USE_MOCK = false;

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword?: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

/**
 * Helper function to handle the reset password request
 */
async function resetPassword(
  url: string,
  { arg }: { arg: ResetPasswordRequest },
): Promise<ResetPasswordResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Password reset successfully",
    };
  }

  const response = await fetcherOSStore.post(url, arg);
  return response.data;
}

/**
 * Hook for resetting password
 */
export const usePostResetPassword = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/v1/auth/reset-password",
    resetPassword,
  );

  return {
    trigger,
    data,
    isLoading: isMutating,
    isError: error,
  };
};
