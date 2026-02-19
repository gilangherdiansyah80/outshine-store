import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    section: "Orders & Shipping",
    items: [
      {
        q: "How do I track my order?",
        a: "You can track your order via 'My Orders' on the profile page. Click on the order to see the latest shipping status.",
      },
      {
        q: "How long does delivery take?",
        a: "Delivery time depends on your location. For Jabodetabek it's usually 1–3 working days, outside Jabodetabek 3–7 working days.",
      },
      {
        q: "Can I change my shipping address?",
        a: "You can change the shipping address before the order is processed. Contact our customer service immediately if you need to change the address.",
      },
    ],
  },
  {
    section: "Payment",
    items: [
      {
        q: "What payment methods are available?",
        a: "We accept payment via Bank Transfer and E-Wallet (DANA).",
      },
      {
        q: "What if my payment fails?",
        a: "If payment fails, please try again or use another payment method. Ensure sufficient balance and a stable internet connection.",
      },
      {
        q: "Can Pre Order be paid with DP?",
        a: "For Pre Order, you only need to pay a down payment of 20% of the total price when ordering. The remaining 80% is paid before the item is shipped.",
      },
    ],
  },
  {
    section: "Pre Order",
    items: [
      {
        q: "What is Pre Order?",
        a: "Pre Order is an ordering system where you order a product before it is available. The product will be produced or prepared after the Pre Order period ends.",
      },
      {
        q: "How long is the Pre Order waiting time?",
        a: "Pre Order waiting time varies by product, usually between 7–14 working days. The estimated time will be shown on the product page.",
      },
      {
        q: "Can a Pre Order be cancelled?",
        a: "Pre Orders can only be cancelled before the Pre Order period ends. After entering the production process, the order cannot be cancelled.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={cn(
        "border-2 rounded-2xl overflow-hidden transition-all",
        isOpen ? "border-[#2563EB]/20 bg-blue-50" : "border-slate-100 bg-white",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
      >
        <span
          className={cn(
            "font-black text-sm",
            isOpen ? "text-[#2563EB]" : "text-[#0F172A]",
          )}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 transition-transform ml-4",
            isOpen ? "rotate-180 text-[#2563EB]" : "text-slate-300",
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t-2 border-blue-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPanel() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
          Help Center
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Frequently asked questions and support.
        </p>
      </div>

      <div className="space-y-8">
        {faqData.map(({ section, items }) => (
          <div key={section} className="space-y-3">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
              {section}
            </p>
            <div className="space-y-2">
              {items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-[#0F172A] rounded-3xl p-8 text-white flex items-center justify-between gap-6">
        <div>
          <p className="font-black text-lg">Still have questions?</p>
          <p className="text-white/50 text-sm mt-1">
            Our support team is here to help you.
          </p>
        </div>
        <a
          href="https://wa.me/628135374168"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 rounded-2xl font-black text-sm transition-colors"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
