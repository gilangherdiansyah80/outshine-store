import { ChevronRight, Mail, Phone } from "lucide-react";

const AboutContact = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Get in Touch</h3>
      <div className="space-y-3">
        {/* Email Card */}
        <a
          href="mailto:outshineid@gmail.com?subject=Tanya%20Seputar%20Outshine&body=Halo%20Outshine%2C%20saya%20ingin%20bertanya..."
          className="flex w-full p-4 rounded-xl bg-[#141925] border border-white/5 items-center gap-4 hover:border-blue-500/30 transition-colors group text-left no-underline relative z-10 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium">Email Us</p>
            <p className="text-sm font-bold text-white">outshineid@gmail.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
        </a>

        {/* WhatsApp Card */}
        <a
          href="https://wa.me/628135374168"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full p-4 rounded-xl bg-[#141925] border border-white/5 items-center gap-4 hover:border-blue-500/30 transition-colors group text-left no-underline relative z-10 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium">
              WhatsApp Support
            </p>
            <p className="text-sm font-bold text-white">+62 813-5374-168</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  );
};

export default AboutContact;
