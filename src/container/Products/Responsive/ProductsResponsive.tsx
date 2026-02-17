import { ResponsiveRoute } from "@outshine/lib/components";
import ProductsScreen from "./screen/ProductsScreen";
import FilterScreen from "./screen/FilterScreen";

export default function ProductsResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<ProductsScreen />} />
      <ResponsiveRoute path="/filter" component={<FilterScreen />} />
    </>
  );
}
