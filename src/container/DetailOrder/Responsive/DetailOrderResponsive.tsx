import { useParams } from "react-router-dom";
import { ResponsiveRoute } from "@outshine/lib/components";
import { useGetDetailOrder } from "@/services/Order/useGetDetailOrder";

import { useEffect, useState } from "react";
import Loading from "@/components/Loader/Loading";
import DetailOrderScreen from "./screen/DetailOrderScreen";

const DetailOrderResponsive = () => {
  const { id } = useParams();
  const { order, isLoading: swrLoading, isError } = useGetDetailOrder(id);
  const [minLoading, setMinLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = swrLoading || minLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0F19] text-white">
        Order not found
      </div>
    );
  }

  return (
    <>
      <ResponsiveRoute
        path="/"
        component={<DetailOrderScreen order={order} />}
      />
    </>
  );
};

export default DetailOrderResponsive;
