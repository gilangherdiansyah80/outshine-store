import { Building2, CheckCircle2, Smartphone } from "lucide-react";
import React from "react";

export interface PaymentInstruction {
  label: string;
  number: string;
  icon: React.ReactNode;
  instructions: string[];
}

const mockPaymentDetails: Record<string, PaymentInstruction> = {
  dana: {
    label: "Dana Number",
    number: "0813 5374 168",
    icon: React.createElement(Smartphone, { className: "text-blue-400" }),
    instructions: [
      "Buka aplikasi DANA di ponsel Anda",
      "Pilih menu 'Kirim' atau 'Send'",
      "Pilih 'Kirim ke Nomor Telepon'",
      "Masukkan nomor di atas",
      "Masukkan nominal sesuai tagihan",
      "Selesaikan pembayaran dan simpan bukti transfer",
    ],
  },
  bni: {
    label: "BNI Virtual Account",
    number: "8806 0813 5374 168",
    icon: React.createElement(Building2, { className: "text-orange-400" }),
    instructions: [
      "Pilih menu 'Transfer' di ATM atau m-Banking",
      "Pilih 'Virtual Account Billing'",
      "Masukkan nomor VA di atas",
      "Tagihan akan muncul otomatis",
      "Konfirmasi dan selesaikan transaksi",
    ],
  },
  seabank: {
    label: "SeaBank Virtual Account",
    number: "7891 0813 5374 168",
    icon: React.createElement(Building2, { className: "text-orange-500" }),
    instructions: [
      "Buka aplikasi perbankan Anda",
      "Pilih 'Transfer' -> 'Virtual Account'",
      "Input nomor VA SeaBank di atas",
      "Pastikan nominal sesuai",
      "Klik 'Konfirmasi' untuk menyelesaikan",
    ],
  },
};

const defaultInstruction: PaymentInstruction = {
  label: "Payment Number",
  number: "0813 5374 168",
  icon: React.createElement(CheckCircle2, { className: "text-gray-400" }),
  instructions: ["Please contact support for payment instructions."],
};

export const useGetPaymentDetails = (
  paymentType?: string,
  useMock: boolean = true,
) => {
  if (useMock) {
    return mockPaymentDetails[paymentType || ""] || defaultInstruction;
  }

  // Fallback for non-mock or real API logic
  return defaultInstruction;
};
