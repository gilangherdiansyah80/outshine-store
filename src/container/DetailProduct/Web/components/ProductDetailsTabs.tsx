import { useState } from "react";
import { cn } from "@outshine/lib/utils";
import { ShieldCheck, Truck, Headset, ChevronRight } from "lucide-react";
import type { ProductSpec } from "@outshine/services/Products/useGetDetailProduct";

interface ProductDetailsTabsProps {
  description: string;
  specs: ProductSpec[];
}

const ProductDetailsTabs = ({
  description,
  specs,
}: ProductDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState("filosofi");

  const tabs = [
    { id: "filosofi", label: "Filosofi" },
    { id: "specifications", label: "Specifications" },
    // { id: "customer_reviews", label: "Customer Reviews (128)" },
    { id: "service", label: "Service" },
  ];

  return (
    <div className="flex flex-col gap-10 -mt-20 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm shadow-black">
      {/* Tab Navigation */}
      <div className="flex items-center gap-10 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-[13px] font-extrabold uppercase tracking-widest transition-all relative cursor-pointer",
              activeTab === tab.id
                ? "text-[#0F172A]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0F172A] rounded-t rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "filosofi" && (
          <div className="w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="">
              <p className="text-gray-500 text-sm leading-[1.8] font-medium">
                {description ||
                  "Experience audio like never before with the SoundMaster Premium Wireless Headphones. Engineered with the latest active noise-cancelling technology, these headphones create a sanctuary of sound wherever you go. Whether you're in a crowded office or on a noisy flight, immerse yourself in pure, high-fidelity audio."}
              </p>
            </div>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="max-w-3xl animate-in fade-in duration-500">
            <div className="grid grid-cols-1 gap-1 divide-y divide-gray-50">
              {specs.length > 0 ? (
                specs.map((spec) => (
                  <div
                    key={spec.id}
                    className="grid grid-cols-3 py-4 text-sm font-medium"
                  >
                    <div className="text-gray-400 uppercase tracking-wider text-[11px] font-bold">
                      {spec.key}
                    </div>
                    <div className="col-span-2 text-[#0F172A] font-extrabold">
                      {spec.value}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">
                  No specifications available for this product.
                </p>
              )}
            </div>
          </div>
        )}

        {/* {activeTab === "customer_reviews" && (
          <div className="text-center py-20 animate-in fade-in duration-500">
            <p className="text-gray-400 font-medium italic">
              Reviews content is displayed in the section below.
            </p>
          </div>
        )} */}

        {activeTab === "service" && (
          <div className="pt-2 border-t border-gray-50 space-y-4">
            {/* Quality Control */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0B0F19] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-gray-900 block">
                    Outshine Quality Control
                  </span>
                  <span className="text-xs text-gray-500 block">
                    Setiap produk melalui pengecekan detail sebelum dikirim.
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
            </div>

            {/* Fast Handling */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#0B0F19] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-gray-900 block">
                    Outshine Fast Handling
                  </span>
                  <span className="text-xs text-gray-500 block">
                    Pesanan diproses cepat & aman oleh tim Outshine.
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
            </div>

            {/* Customer Support */}
            <div className="flex items-start justify-between group">
              <div className="flex items-start gap-3">
                <Headset className="w-5 h-5 text-[#0B0F19] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold text-gray-900 block">
                    Outshine Customer Support
                  </span>
                  <span className="text-xs text-gray-500 block">
                    Siap bantu sebelum & sesudah pembelian.
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 self-center" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
