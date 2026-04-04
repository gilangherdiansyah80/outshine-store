import { Routes, Route } from "react-router-dom";
import CheckoutMainWeb from "./components/CheckoutMainWeb";
import ChangeAddressWeb from "./components/ChangeAddressWeb";
import AddAddressWeb from "./components/AddAddressWeb";

export default function CheckoutWeb() {
  return (
    <Routes>
      <Route path="/" element={<CheckoutMainWeb />} />
      <Route path="/change-address" element={<ChangeAddressWeb />} />
      <Route path="/add-address" element={<AddAddressWeb />} />
    </Routes>
  );
}
