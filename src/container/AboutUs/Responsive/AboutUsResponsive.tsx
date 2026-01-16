import { ResponsiveRoute } from "@outshine/lib/components";
import AboutUsScreen from "./screen/AboutUsScreen";

const AboutUsResponsive = () => {
  return (
    <>
      <ResponsiveRoute path="/" component={<AboutUsScreen />} />
    </>
  );
};

export default AboutUsResponsive;
