import { ResponsiveRoute } from "@outshine/lib/components";
import ProductsScreen from "./screen/ProductsScreen";

export default function ProductsResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<ProductsScreen />} />
      {/* 
        Route for product detail reviews if needed.
        <ResponsiveRoute
          path="/reviews"
          component={<DetailProductReviewListScreen type="saas" />}
        />
      */}
    </>
  );
}
