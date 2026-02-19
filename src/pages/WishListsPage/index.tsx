import { useDevice, useHasMounted } from "@/hooks/use-device";
import WishListsResponsive from "@/container/WishLists/Responsive/WishListsResponsive";
import Loading from "@/components/Loader/Loading";
import WishlistsWeb from "@/container/WishLists/Web/WishlistsWeb";

export default function WishListsPage() {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  console.log("Rendering WishListsPage, isMobile:", isMobile);

  if (!hasMounted) {
    return <Loading />;
  }

  return <>{isMobile ? <WishListsResponsive /> : <WishlistsWeb />}</>;
}
