import { ResponsiveRoute } from "@/lib/components";
import HomeScreen from "@/container/Home/Responsive/screen/HomeScreen";
import CategoryScreen from "@/container/Home/Responsive/screen/CategoryScreen";

export default function HomeResponsive() {
  return (
    <>
      {/* <HomeScreen /> */}
      <ResponsiveRoute path="/" component={<HomeScreen />} />
      <ResponsiveRoute path="/detail-category" component={<CategoryScreen />} />
    </>
  );
}
