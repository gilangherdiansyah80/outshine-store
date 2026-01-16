import { useDevice, useHasMounted } from "@/hooks/use-device";
import DetailProductResponsive from "@/container/DetailProduct/Responsive/DetailProductResponsive";
import Loading from "@/components/Loader/Loading";

export default function DetailProductPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Show loading screen during hydration check
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <DetailProductResponsive /> : <p>Desktop</p>}</>;
}
