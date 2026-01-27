import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import ProfileResponsive from "@/container/Profile/Responsive/ProfileResponsive";

export default function ProfilePage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering WishListsPage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <ProfileResponsive /> : <p>Desktop Wishlist</p>}</>;
}
