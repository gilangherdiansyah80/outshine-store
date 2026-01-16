import { useDevice, useHasMounted } from "@/hooks/use-device";
import ProductsResponsive from "@/container/Products/Responsive/ProductsResponsive";

import Loading from "@/components/Loader/Loading";

export default function WisthListsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <ProductsResponsive /> : <p>Desktop</p>}</>;
}
