import FaqHeader from "../components/FaqHeader";
import FaqItem from "../components/FaqItem";
import ContactSupport from "../components/ContactSupport";
import SettingSection from "../components/SettingSection";

const faqData = {
  pesanan: [
    {
      question: "Bagaimana cara melacak pesanan saya?",
      answer:
        "Anda dapat melacak pesanan melalui menu 'Pesanan Saya' di halaman profil. Klik pada pesanan yang ingin dilacak untuk melihat status pengiriman terkini.",
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer:
        "Waktu pengiriman tergantung lokasi Anda. Untuk area Jabodetabek biasanya 1-3 hari kerja, sedangkan luar Jabodetabek 3-7 hari kerja.",
    },
    {
      question: "Apakah saya bisa mengubah alamat pengiriman?",
      answer:
        "Alamat pengiriman dapat diubah sebelum pesanan diproses. Hubungi customer service kami segera jika Anda perlu mengubah alamat.",
    },
  ],
  pembayaran: [
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer:
        "Kami menerima pembayaran via Transfer Bank, E-Wallet (GoPay, OVO, DANA), Kartu Kredit/Debit, dan COD untuk area tertentu.",
    },
    {
      question: "Bagaimana jika pembayaran saya gagal?",
      answer:
        "Jika pembayaran gagal, silakan coba lagi atau gunakan metode pembayaran lain. Pastikan saldo/limit mencukupi dan koneksi internet stabil.",
    },
  ],
  pengembalian: [
    {
      question: "Bagaimana cara mengajukan pengembalian barang?",
      answer:
        "Pengembalian dapat diajukan dalam 7 hari setelah barang diterima. Buka detail pesanan > Ajukan Pengembalian > Pilih alasan > Kirim.",
    },
    {
      question: "Berapa lama proses refund?",
      answer:
        "Proses refund membutuhkan waktu 3-7 hari kerja setelah pengembalian barang diverifikasi.",
    },
  ],
};

const FaqScreen = () => {
  const handleContactSupport = () => {
    // Open WhatsApp or chat
    window.open("https://wa.me/6281234567890", "_blank");
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <FaqHeader />

      <main className="flex-1">
        <SettingSection title="Pesanan & Pengiriman">
          {faqData.pesanan.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </SettingSection>

        <SettingSection title="Pembayaran">
          {faqData.pembayaran.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </SettingSection>

        <SettingSection title="Pengembalian & Refund">
          {faqData.pengembalian.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </SettingSection>

        <ContactSupport onContact={handleContactSupport} />
      </main>
    </div>
  );
};

export default FaqScreen;
