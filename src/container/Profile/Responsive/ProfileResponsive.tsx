import { ResponsiveRoute } from "@outshine/lib/components";
import ProfileScreen from "./screen/ProfileScreen";

const ProfileResponsive = () => {
  return (
    <>
      <ResponsiveRoute path="/" component={<ProfileScreen />} />
    </>
  );
};

export default ProfileResponsive;
