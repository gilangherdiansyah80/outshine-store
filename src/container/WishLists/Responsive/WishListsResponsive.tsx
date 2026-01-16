import { ResponsiveRoute } from "@outshine/lib/components";
import WishListsScreen from "./screen/WishListsScreen";

const WishListsResponsive = () => {
  return (
    <>
      <ResponsiveRoute path="/" component={<WishListsScreen />} />
    </>
  );
};

export default WishListsResponsive;
