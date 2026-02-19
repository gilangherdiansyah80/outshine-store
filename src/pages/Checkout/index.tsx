import { useDevice, useHasMounted } from "@/hooks/use-device";
import CheckoutResponsive from "@/container/Checkout/Responsive/CheckoutResponsive";
import Loading from "@/components/Loader/Loading";
import CheckoutWeb from "@/container/Checkout/Web/CheckoutWeb";

export default function CheckoutPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Show loading screen during hydration check
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <CheckoutResponsive /> : <CheckoutWeb />}</>;
}
