import {
  Receipt,
  CreditCard,
  Truck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface DetailStepperWebProps {
  status: string;
}

export default function DetailStepperWeb({ status }: DetailStepperWebProps) {
  const lowerStatus = status.toLowerCase();

  const steps: { id: string; label: string; icon: LucideIcon }[] = [
    { id: "pending", label: "Dibuat", icon: Receipt },
    { id: "processing", label: "Dibayar", icon: CreditCard },
    { id: "shipping", label: "Dikirim", icon: Truck },
    { id: "completed", label: "Selesai", icon: CheckCircle2 },
  ];

  const getStepIndex = (s: string) => {
    switch (s) {
      case "pending":
      case "unpaid":
        return 0;
      case "processing":
        return 1;
      case "shipping":
        return 2;
      case "completed":
        return 3;
      case "cancelled":
      case "canceled":
        return -1; // Special case
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(lowerStatus);

  if (currentIndex === -1) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center text-slate-500 font-bold">
        Pesanan Dibatalkan
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 py-10">
      <div className="relative flex justify-between items-center max-w-4xl mx-auto">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0 pointer-events-none mx-10"></div>

        {/* Active Progress Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 rounded-full z-0 pointer-events-none mx-10 transition-all duration-500"
          style={{ width: `calc(${(currentIndex / 3) * 100}% - 5rem)` }}
        ></div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 border-white text-white shadow-md shadow-blue-100"
                    : "bg-slate-100 border-white text-slate-400"
                }`}
              >
                <Icon size={24} />
              </div>
              <div className="text-center mt-3 absolute top-full w-32 -mx-9">
                <p
                  className={`text-sm font-bold ${isActive ? "text-[#0F172A]" : "text-slate-400"}`}
                >
                  {step.label}
                </p>
                {/* Normally we'd use actual dates from the order history, showing placeholder here matching design */}
                <p className="text-xs text-slate-400 mt-1">14 Aug, 10:24</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
