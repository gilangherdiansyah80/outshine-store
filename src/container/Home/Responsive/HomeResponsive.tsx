import { ResponsiveRoute } from "@/lib/components";
import HomeScreen from "@/container/Home/Responsive/screen/HomeScreen";
import DetailCategoryResponsive from "@/container/Category/Responsive/DetailCategoryResponsive";
import { useResponsiveRouteParams } from "@/hooks/use-responsive-navigation";

const DetailCategoryWrapper = () => {
  const { id } = useResponsiveRouteParams<{ id: string }>();
  return <DetailCategoryResponsive categoryId={id || ""} />;
};

export default function HomeResponsive() {
  return (
    <>
      <ResponsiveRoute path="/" component={<HomeScreen />} />
      <ResponsiveRoute
        path="/detail-category"
        component={<DetailCategoryWrapper />}
      />
    </>
  );
}
