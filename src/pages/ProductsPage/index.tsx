import { useDevice, useHasMounted } from "@/hooks/use-device";
import ProductsResponsive from "@/container/Products/Responsive/ProductsResponsive";

export default function ProductsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return null;
  }

  return <>{isMobile ? <ProductsResponsive /> : <p>Desktop</p>}</>;
}
