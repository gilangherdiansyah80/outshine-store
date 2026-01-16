import { useParams } from "react-router-dom";
import { useGetDetailProduct } from "@outshine/services/Products/useGetDetailProduct";
import DetailProductScreen from "./screen/DetailProductScreen";

import { useEffect, useState } from "react";
import Loading from "@/components/Loader/Loading";

const DetailProductResponsive = () => {
  const { id } = useParams();
  const { product, isLoading: swrLoading, isError } = useGetDetailProduct(id);
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

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0F19] text-white">
        Product not found
      </div>
    );
  }

  return <DetailProductScreen product={product} />;
};

export default DetailProductResponsive;
