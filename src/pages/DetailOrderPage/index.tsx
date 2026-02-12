import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import DetailOrderResponsive from "@/container/DetailOrder/Responsive/DetailOrderResponsive";

export default function DetailOrderPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Show loading screen during hydration check
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <DetailOrderResponsive /> : <p>Desktop</p>}</>;
}
