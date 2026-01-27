import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  MessageCircle,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
import Button from "@outshine/ui/Button/Button";
import { useState } from "react";
import Alert from "@outshine/components/Alert/Alert";
import { useAddressStore } from "@/store/addressStore";
import { postCartItem } from "@/services/Carts/usePostCart";

interface ProductActionsProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  formattedDiscounted: string;
  formattedOriginal: string;
  isPo?: boolean;
  poDpPercent?: number;
  image: string;
  selectedSize: string | null;
  sizeId: string | undefined;
}

const ProductActions = ({
  id,
  name,
  price,
  originalPrice,
  formattedDiscounted,
  formattedOriginal,
  isPo,
  sizeId,
  poDpPercent,
  image,
  selectedSize,
}: ProductActionsProps) => {
  const navigate = useNavigate();
  const { addItem, setBuyNowItem } = useCartStore();
  const { actions } = useAddressStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartAlert, setCartAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "warning" | "error" | "info" | "confirm";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const handleAddToBag = async () => {
    if (!selectedSize || !sizeId) {
      setCartAlert({
        isOpen: true,
        title: "Pilih Ukuran",
        message:
          "Harap pilih ukuran terlebih dahulu sebelum menambahkan ke keranjang.",
        type: "warning",
      });
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await postCartItem({
        productId: id,
        sizeId: sizeId,
      });

      if (response.success) {
        addItem({
          id,
          name,
          price,
          originalPrice,
          formattedDiscounted,
          formattedOriginal,
          isPo,
          poDpPercent,
          sizeId: sizeId!,
          image,
          size: selectedSize!,
          color: "Standard",
        });

        navigate("/outshine/cart");
      } else {
        setCartAlert({
          isOpen: true,
          title: "Gagal Menambah Keranjang",
          message:
            response.message ||
            "Terjadi kesalahan saat memproses permintaan Anda.",
          type: "error",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Terjadi kesalahan koneksi.";
      setCartAlert({
        isOpen: true,
        title: "Kesalahan Sistem",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setCartAlert({
        isOpen: true,
        title: "Pilih Ukuran",
        message: "Harap pilih ukuran terlebih dahulu sebelum melanjutkan.",
        type: "warning",
      });
      return;
    }

    const buyNowItem = {
      id,
      name,
      price,
      originalPrice,
      formattedDiscounted,
      formattedOriginal,
      isPo,
      poDpPercent,
      image,
      sizeId: sizeId!,
      size: selectedSize!,
      color: "Standard",
      quantity: 1,
    };

    setBuyNowItem(buyNowItem);
    actions.resetSelection();
    navigate(`/outshine/checkout?productId=${id}&sizeId=${sizeId}&quantity=1`);
  };

  const handleChatWhatsApp = () => {
    if (!selectedSize) {
      setCartAlert({
        isOpen: true,
        title: "Pilih Ukuran",
        message: "Harap pilih ukuran terlebih dahulu sebelum bertanya.",
        type: "warning",
      });
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 p-4">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            onClick={handleAddToBag}
            size="icon"
            disabled={isAddingToCart}
            className="w-14 h-14 shrink-0 bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] rounded-2xl disabled:opacity-50"
          >
            {isAddingToCart ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <ShoppingBag className="w-6 h-6" />
            )}
          </Button>
          <Button
            onClick={handleChatWhatsApp}
            size="icon"
            className="w-14 h-14 shrink-0 bg-[#1F2430] text-gray-300 hover:bg-[#2A3040] rounded-2xl"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button
            onClick={handleBuyNow}
            size="lg"
            className="flex-1 h-14 gap-2 bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-600/20"
          >
            Buy Now
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Alert
        isOpen={cartAlert.isOpen}
        title={cartAlert.title}
        message={cartAlert.message}
        type={cartAlert.type}
        onConfirm={() => setCartAlert((prev) => ({ ...prev, isOpen: false }))}
        confirmText="Oke"
      />
    </>
  );
};

export default ProductActions;
