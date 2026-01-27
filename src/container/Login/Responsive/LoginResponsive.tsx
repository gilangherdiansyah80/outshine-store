import { ResponsiveRoute } from "@/lib/components";
import ForgetPasswordScreen from "./screen/ForgetPasswordScreen";
import LoginScreen from "./screen/LoginScreen";

export default function LoginResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<LoginScreen />} />
      <ResponsiveRoute
        path="/forgot-password"
        component={<ForgetPasswordScreen />}
      />
    </>
  );
}
