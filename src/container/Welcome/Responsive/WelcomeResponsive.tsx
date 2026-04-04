import { ResponsiveRoute } from "@outshine/lib/components";
import WelcomeScreeen from "./screen/WelcomeScreeen";

export default function WelcomeResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<WelcomeScreeen />} />
    </>
  );
}
