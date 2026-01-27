import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import OrdersResponsive from "@/container/Orders/Responsive/OrdersResponsive";

export default function OrdersPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering OrdersPage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <OrdersResponsive /> : <p>Desktop Orders</p>}</>;
}
