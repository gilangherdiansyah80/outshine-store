import { MessageCircle } from "lucide-react";

interface ContactSupportProps {
  onContact: () => void;
}

const ContactSupport = ({ onContact }: ContactSupportProps) => {
  return (
    <div className="p-4 bg-white mt-2">
      <div className="bg-[#0F172A] rounded-xl p-4 text-center">
        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageCircle size={24} className="text-white" />
        </div>
        <h3 className="text-white font-medium mb-1">Butuh Bantuan Lainnya?</h3>
        <p className="text-gray-400 text-sm mb-4">
          Tim kami siap membantu Anda 24/7
        </p>
        <button
          onClick={onContact}
          className="w-full py-3 bg-white text-[#0F172A] font-medium rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
        >
          Hubungi Customer Service
        </button>
      </div>
    </div>
  );
};

export default ContactSupport;
