import { useDevice, useHasMounted } from "@/hooks/use-device";
import ProductsResponsive from "@/container/Products/Responsive/ProductsResponsive";
import Loading from "@/components/Loader/Loading";

export default function ProductsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <ProductsResponsive /> : <p>Desktop Products</p>}</>;
}
