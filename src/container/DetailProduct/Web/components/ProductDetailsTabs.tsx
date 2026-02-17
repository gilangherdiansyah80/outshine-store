import { useState } from "react";
import { cn } from "@outshine/lib/utils";
import { Check } from "lucide-react";

interface ProductDetailsTabsProps {
  description: string;
  specs: Array<{ id: string; key: string; value: string }>;
}

const ProductDetailsTabs = ({
  description,
  specs,
}: ProductDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "customer_reviews", label: "Customer Reviews (128)" },
    { id: "shipping_returns", label: "Shipping & Returns" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Tab Navigation */}
      <div className="flex items-center gap-10 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-[13px] font-extrabold uppercase tracking-widest transition-all relative",
              activeTab === tab.id
                ? "text-[#2563EB]"
                : "text-gray-400 hover:text-gray-600",
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563EB] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "description" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-8">
              <h2 className="text-3xl font-black text-[#0F172A] leading-tight font-sans">
                The Sound of Innovation
              </h2>
              <p className="text-gray-500 text-sm leading-[1.8] font-medium">
                {description ||
                  "Experience audio like never before with the SoundMaster Premium Wireless Headphones. Engineered with the latest active noise-cancelling technology, these headphones create a sanctuary of sound wherever you go. Whether you're in a crowded office or on a noisy flight, immerse yourself in pure, high-fidelity audio."}
              </p>

              <div className="space-y-4 pt-4">
                {[
                  {
                    title: "Adaptive Noise Cancellation",
                    text: "Automatically adjusts to your surroundings to block out noise.",
                  },
                  {
                    title: "40-Hour Battery Life",
                    text: "Keep the music playing all day and night with just one charge.",
                  },
                  {
                    title: "Crystal Clear Calls",
                    text: "Dual-microphone array ensures your voice is always heard.",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center mt-0.5">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#0F172A]">
                        {feature.title}:{" "}
                        <span className="text-gray-400 font-medium">
                          {feature.text}
                        </span>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-[#F8FAFC] p-4 shadow-sm border border-gray-50">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426ff472b?q=80&w=2065&auto=format&fit=crop"
                alt="Detail product feature"
                className="w-full h-full object-cover rounded-2xl grayscale"
              />
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

        {activeTab === "customer_reviews" && (
          <div className="text-center py-20 animate-in fade-in duration-500">
            <p className="text-gray-400 font-medium italic">
              Reviews content is displayed in the section below.
            </p>
          </div>
        )}

        {activeTab === "shipping_returns" && (
          <div className="max-w-2xl space-y-6 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-[#0F172A]">
              Shipping & Returns
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              We offer free standard shipping on all orders over Rp 500.000.
              Orders are typically processed within 1-2 business days.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h4 className="text-sm font-black mb-2">Standard Shipping</h4>
                <p className="text-xs text-gray-500 font-medium">
                  3-5 business days
                </p>
                <p className="text-xs text-[#2563EB] font-extrabold mt-2">
                  FREE
                </p>
              </div>
              <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <h4 className="text-sm font-black mb-2">30-Day Returns</h4>
                <p className="text-xs text-gray-500 font-medium">
                  Easy and hassle-free returns
                </p>
                <p className="text-xs text-green-500 font-extrabold mt-2">
                  GUARANTEED
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTabs;
