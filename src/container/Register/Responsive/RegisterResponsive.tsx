import { ResponsiveRoute } from "@/lib/components";
import RegisterScreen from "./screen/RegisterScreen";
import OtpScreen from "./screen/OtpScreen";

export default function RegisterResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<RegisterScreen />} />
      <ResponsiveRoute path="/otp" component={<OtpScreen />} />
    </>
  );
}
