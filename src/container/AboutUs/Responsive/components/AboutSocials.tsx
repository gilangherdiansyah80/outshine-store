import { Instagram, Linkedin, Twitter } from "lucide-react";

const AboutSocials = () => {
  return (
    <div className="py-8 space-y-6 flex flex-col items-center">
      <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
        FOLLOW THE JOURNEY
      </span>
      <div className="flex justify-center gap-8">
        {[
          { icon: Instagram, label: "Instagram" },
          { icon: Linkedin, label: "TikTok" }, // Using Linkedin as placeholder for Tiktok if not available
          { icon: Twitter, label: "Pinterest" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-colors">
              <item.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] uppercase font-bold text-white tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSocials;
