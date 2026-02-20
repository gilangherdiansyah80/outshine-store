import { useDevice, useHasMounted } from "@/hooks/use-device";
import AboutUsResponsive from "@/container/AboutUs/Responsive/AboutUsResponsive";
import AboutUsWeb from "@/container/AboutUs/Web/AboutUsWeb";

import Loading from "@/components/Loader/Loading";

export default function AboutUsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Render null on server to avoid hydration mismatch
  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <AboutUsResponsive /> : <AboutUsWeb />}</>;
}
