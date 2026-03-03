import { useParams } from "react-router-dom";
import { useDevice, useHasMounted } from "@/hooks/use-device";
import Loading from "@/components/Loader/Loading";
import DetailCategoryWeb from "@/container/Category/Web/DetailCategoryWeb";
import DetailCategoryResponsive from "@/container/Category/Responsive/DetailCategoryResponsive";

export default function DetailCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { isMobile } = useDevice();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <Loading />;
  }

  return (
    <>
      {isMobile ? (
        <DetailCategoryResponsive categoryId={id || ""} />
      ) : (
        <DetailCategoryWeb categoryId={id || ""} />
      )}
    </>
  );
}
