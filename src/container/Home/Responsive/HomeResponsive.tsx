import { ResponsiveRoute } from "@outshine/lib/components";
import HomeScreen from "./screen/HomeScreen";

export default function HomeResponsive() {
  return (
    <>
      {/* <HomeScreen /> */}
      <ResponsiveRoute path="/" component={<HomeScreen />} />
      {/* Add more routes here if needed, e.g. <ResponsiveRoute path="/details" component={<DetailScreen />} /> */}
    </>
  );
}
