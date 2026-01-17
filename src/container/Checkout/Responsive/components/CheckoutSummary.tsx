interface CheckoutSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CheckoutSummary = ({
  subtotal,
  shipping,
  tax,
  total,
}: CheckoutSummaryProps) => {
  return (
    <section className="bg-[#151B28] rounded-3xl p-6 border border-white/5 space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 font-bold">Subtotal</span>
        <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 font-bold">Shipping</span>
        <span
          className={
            shipping === 0 ? "text-green-500 font-bold" : "text-white font-bold"
          }
        >
          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500 font-bold">Estimated Tax</span>
        <span className="text-white font-bold">${tax.toFixed(2)}</span>
      </div>
      <div className="h-px bg-white/5 my-2" />
      <div className="flex justify-between items-center">
        <span className="text-white font-extrabold text-xl">Total</span>
        <span className="text-blue-500 font-extrabold text-2xl tracking-tight">
          ${total.toFixed(2)}
        </span>
      </div>
    </section>
  );
};

export default CheckoutSummary;
