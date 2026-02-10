import { ResponsiveRoute } from "@outshine/lib/components";
import SettingScreen from "./screen/SettingScreen";
import EditProfile from "./screen/EditProfile";
// import NotificationScreen from "./screen/NotificationScreen";
import PrivacyAndSecure from "./screen/PrivacyAndSecure";
import FaqScreen from "./screen/FaqScreen";
import TermsAndConditions from "./screen/TermsAndConditions";

export default function SettingResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<SettingScreen />} />
      <ResponsiveRoute path="/edit-profile" component={<EditProfile />} />
      {/* <ResponsiveRoute
        path="/notification"
        component={<NotificationScreen />}
      /> */}
      <ResponsiveRoute
        path="/privacy-and-secure"
        component={<PrivacyAndSecure />}
      />
      <ResponsiveRoute path="/faq" component={<FaqScreen />} />
      <ResponsiveRoute
        path="/terms-and-conditions"
        component={<TermsAndConditions />}
      />
    </>
  );
}
