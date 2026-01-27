import { ResponsiveRoute } from "@outshine/lib/components";
import OrdersScreen from "./screen/OrdersScreen";

export default function OrdersResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<OrdersScreen />} />
    </>
  );
}
