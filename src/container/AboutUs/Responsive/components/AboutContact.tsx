import { Instagram, Mail, Twitter, Globe } from "lucide-react";

const AboutContact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white text-center space-y-4 shadow-lg shadow-blue-900/20">
      <h3 className="text-xl font-bold">Get in Touch</h3>
      <p className="text-blue-100 text-sm">
        Have questions or just want to say hello? We'd love to hear from you.
      </p>

      <div className="flex justify-center gap-4 pt-2">
        {[Instagram, Twitter, Globe, Mail].map((Icon, i) => (
          <button
            key={i}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <Icon size={20} className="text-white" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AboutContact;
