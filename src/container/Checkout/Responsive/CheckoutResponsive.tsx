import { Routes, Route } from "react-router-dom";
import CheckoutScreen from "./screen/CheckoutScreen";
import ChangeAddress from "./screen/ChangeAddress";
import AddAddress from "./screen/AddAddress";

const CheckoutResponsive = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckoutScreen />} />
      <Route path="/change-address" element={<ChangeAddress />} />
      <Route path="/add-address" element={<AddAddress />} />
    </Routes>
  );
};

export default CheckoutResponsive;
