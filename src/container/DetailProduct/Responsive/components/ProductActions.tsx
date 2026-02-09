import { useNavigate } from "react-router-dom";
import { MessageCircle, ShoppingBag, Loader2 } from "lucide-react";
import { useCartStore } from "@outshine/store/cartStore";
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
  onOpenSizeSelector: () => void;
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
  onOpenSizeSelector,
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
      onOpenSizeSelector();
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
      onOpenSizeSelector();
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
      onOpenSizeSelector();
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 h-14">
        <div className="flex w-full h-full max-w-md mx-auto">
          {/* Chat WhatsApp */}
          <button
            onClick={handleChatWhatsApp}
            className="shrink-0 w-16 h-full flex flex-col items-center justify-center gap-1 border-r border-gray-50 text-[20px] text-[#00BFA5] bg-white transition-colors hover:bg-gray-50"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Add to Bag */}
          <button
            onClick={handleAddToBag}
            disabled={isAddingToCart}
            className="shrink-0 w-20 h-full flex flex-col items-center justify-center gap-1 border-r border-gray-50 text-[20px] text-[#00BFA5] bg-white transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            {isAddingToCart ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex-1 h-full bg-[#EE4D2D] text-white text-sm font-medium transition-colors hover:bg-[#d73211]"
          >
            Beli Sekarang
          </button>
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
