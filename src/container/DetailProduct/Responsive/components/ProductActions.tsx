interface ProductActionsProps {
  onAction: (type: "cart" | "buy" | "chat") => void;
}

const ProductActions = ({ onAction }: ProductActionsProps) => {
  const handleAddToBag = () => {
    onAction("cart");
  };

  const handleBuyNow = () => {
    onAction("buy");
  };

  const handleChatWhatsApp = () => {
    onAction("chat");
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 h-14">
        <div className="flex w-full h-full max-w-md mx-auto">
          {/* Chat WhatsApp */}
          <button
            onClick={handleChatWhatsApp}
            className="shrink-0 w-16 h-full flex flex-col items-center justify-center cursor-pointer gap-1 border-r border-gray-50 text-[20px] text-[#00BFA5] bg-white transition-colors hover:bg-gray-50"
          >
            <img src="/images/live-chat.png" alt="cart" className="w-6 h-6" />
          </button>

          {/* Add to Bag */}
          <button
            onClick={handleAddToBag}
            className="shrink-0 w-20 h-full flex flex-col items-center justify-center cursor-pointer gap-1 border-r border-gray-50 text-[20px] text-[#00BFA5] bg-white transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <img src="/images/add-to-cart.png" alt="cart" className="w-6 h-6" />
          </button>

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="flex-1 h-full bg-[#0B0F19] text-white text-sm font-medium transition-colors cursor-pointer hover:bg-[#0B0F19]/80"
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
