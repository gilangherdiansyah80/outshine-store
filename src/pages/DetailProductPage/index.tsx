import { useDevice, useHasMounted } from "@/hooks/use-device";
import DetailProductResponsive from "@/container/DetailProduct/Responsive/DetailProductResponsive";
import Loading from "@/components/Loader/Loading";
import DetailProductWeb from "@/container/DetailProduct/Web/DetailProductWeb";
import ProductReviewsWeb from "@/container/ProductReviews/Web/ProductReviewsWeb";

interface DetailProductPageProps {
  isReviewsPage?: boolean;
}

export default function DetailProductPage({
  isReviewsPage,
}: DetailProductPageProps) {
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  // Show loading screen during hydration check
  if (!hasMounted) {
    return <Loading />;
  }

  if (isReviewsPage) {
    return (
      <>{isMobile ? <DetailProductResponsive /> : <ProductReviewsWeb />}</>
    );
  }

  return <>{isMobile ? <DetailProductResponsive /> : <DetailProductWeb />}</>;
}
