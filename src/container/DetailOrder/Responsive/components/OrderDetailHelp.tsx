import {
  ChevronRight,
  RotateCcw,
  MessageCircle,
  CircleHelp,
} from "lucide-react";

const helpActions = [
  {
    icon: RotateCcw,
    label: "Ajukan Pengembalian",
  },
  {
    icon: MessageCircle,
    label: "Hubungi Penjual",
  },
  {
    icon: CircleHelp,
    label: "Pusat Bantuan",
  },
];

const OrderDetailHelp = () => {
  return (
    <div className="bg-white rounded-xl mb-2 overflow-hidden">
      <div className="px-4 py-4 border-b border-gray-50">
        <span className="text-sm font-semibold text-gray-800">
          Butuh Bantuan?
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {helpActions.map((action, idx) => (
          <div
            key={idx}
            className="px-4 py-4 flex items-center justify-between active:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <action.icon size={20} className="text-gray-500" />
              <span className="text-sm text-gray-800">{action.label}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailHelp;
