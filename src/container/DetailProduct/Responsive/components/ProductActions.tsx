import { useNavigate } from "react-router-dom";
import { ChevronRight, MessageCircle, ShoppingBag } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import Button from "@outshine/ui/Button/Button";
import { useState } from "react";
import Alert from "@outshine/components/Alert/Alert";

interface ProductActionsProps {
  id: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string | null;
}

const ProductActions = ({
  id,
  name,
  price,
  image,
  selectedSize,
}: ProductActionsProps) => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowAlert(true);
      return;
    }

    addItem({
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: "Standard", // Default for now
    });

    // Optional: navigate to cart or show success message
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setShowAlert(true);
      return;
    }

    const buyNowItem = {
      id,
      name,
      price,
      image,
      size: selectedSize,
      color: "Standard",
      quantity: 1,
    };

    navigate("/outshine/checkout", { state: { buyNowItem } });
  };

  const handleChatWhatsApp = () => {
    if (!selectedSize) {
      setShowAlert(true);
      return;
    }

    const phoneNumber = "628135374168";
    const currentUrl = window.location.href;

    // Memastikan link gambar diawali dengan domain jika gambarnya link relatif
    const absoluteImageUrl = image.startsWith("http")
      ? image
      : `${window.location.origin}${image}`;

    const message = `${absoluteImageUrl}\n\nHaii admin outshine. Apakah product ${name} dengan size ${selectedSize} masih ready?\n\nLink Produk: ${currentUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="flex gap-3 pt-2">
        <Button
          onClick={handleAddToBag}
          size="icon"
          className="w-14 h-14 bg-[#1F2430] text-gray-300 hover:bg-[#2A3040]"
        >
          <ShoppingBag className="w-6 h-6" />
        </Button>
        <Button
          onClick={handleChatWhatsApp}
          size="icon"
          className="w-14 h-14 bg-[#1F2430] text-gray-300 hover:bg-[#2A3040]"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Button
          onClick={handleBuyNow}
          size="lg"
          className="flex-1 h-14 gap-2 bg-blue-600 hover:bg-blue-700"
        >
          Buy Now
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <Alert
        isOpen={showAlert}
        title="Pilih Ukuran"
        message="Harap pilih ukuran terlebih dahulu sebelum melanjutkan."
        type="warning"
        onConfirm={() => setShowAlert(false)}
        confirmText="Oke, Mengerti"
      />
    </>
  );
};

export default ProductActions;
