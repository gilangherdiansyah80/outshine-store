import { Instagram } from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const AboutSocials = () => {
  return (
    <div className="py-8 space-y-6 flex flex-col items-center">
      <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
        FOLLOW THE JOURNEY
      </span>
      <div className="flex justify-center gap-8">
        {[
          {
            icon: Instagram,
            label: "Instagram",
            url: "https://www.instagram.com/outshineid/",
          },
          {
            icon: TikTokIcon,
            label: "TikTok",
            url: "https://www.tiktok.com/@outshine.id",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => window.open(item.url, "_blank")}
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
