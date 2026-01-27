import { useDevice, useHasMounted } from "@/hooks/use-device";
import WelcomeResponsive from "@/container/Welcome/Responsive/WelcomeResponsive";
import Loading from "@/components/Loader/Loading";

export default function WelcomePage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering WelcomePage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <WelcomeResponsive /> : <p>Desktop Wishlist</p>}</>;
}
