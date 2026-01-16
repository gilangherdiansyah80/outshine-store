import { Instagram, Linkedin } from "lucide-react";

const AboutSocials = () => {
  return (
    <div className="py-8 space-y-6 flex flex-col items-center">
      <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
        FOLLOW THE JOURNEY
      </span>
      <div className="flex justify-center gap-8">
        {[
          { icon: Instagram, label: "Instagram" },
          { icon: Linkedin, label: "TikTok" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border border-[#0F172A] flex items-center justify-center group-hover:bg-white/5 transition-colors">
              <item.icon className="w-6 h-6 text-[#0F172A] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] uppercase font-bold text-[#0F172A] tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSocials;
