import { ChevronRight, Mail, Phone } from "lucide-react";

const AboutContact = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Get in Touch</h3>
      <div className="space-y-3">
        {/* Email Card */}
        <button className="w-full p-4 rounded-xl bg-[#141925] border border-white/5 flex items-center gap-4 hover:border-blue-500/30 transition-colors group text-left">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Email Us</p>
            <p className="text-sm font-bold text-white">outshineid@gmail.com</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
        </button>

        {/* Phone Card */}
        <button className="w-full p-4 rounded-xl bg-[#141925] border border-white/5 flex items-center gap-4 hover:border-blue-500/30 transition-colors group text-left">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Call Support</p>
            <p className="text-sm font-bold text-white">+62 813-5374-168</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default AboutContact;
