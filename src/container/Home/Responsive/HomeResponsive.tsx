import { ResponsiveRoute } from "@/lib/components";
import HomeScreen from "@/container/Home/Responsive/screen/HomeScreen";

export default function HomeResponsive() {
  return (
    <>
      {/* <HomeScreen /> */}
      <ResponsiveRoute path="/" component={<HomeScreen />} />
      {/* Add more routes here if needed, e.g. <ResponsiveRoute path="/details" component={<DetailScreen />} /> */}
    </>
  );
}
