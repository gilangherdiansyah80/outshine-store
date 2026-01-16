import { ArrowRight } from "lucide-react";

const AboutFeatures = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Why Choose Us</h3>
      <div className="space-y-3">
        {[
          {
            title: "Authentic Quality",
            desc: "100% original materials guaranteed.",
          },
          {
            title: "Fast Shipping",
            desc: "Delivery within 2-3 business days.",
          },
          { title: "24/7 Support", desc: "We are here to help you anytime." },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-2xl bg-[#0F172A] border border-white/5"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-500">
              <ArrowRight size={16} />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFeatures;
