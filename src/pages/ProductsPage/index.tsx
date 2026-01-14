import { useDevice, useHasMounted } from "@/hooks/use-device";
import HomeResponsive from "@/container/Home/Responsive/HomeResponsive";

export default function ProductsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return null;
  }

  return <>{isMobile ? <HomeResponsive /> : <p>Desktop</p>}</>;
}
