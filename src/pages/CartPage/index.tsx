import { useDevice, useHasMounted } from "@/hooks/use-device";
import CartResponsive from "@outshine/container/Cart/Responsive/CartResponsive";

import Loading from "@/components/Loader/Loading";
import CartWeb from "@/container/Cart/Web/CartWeb";

export default function CartPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <CartResponsive /> : <CartWeb />}</>;
}
