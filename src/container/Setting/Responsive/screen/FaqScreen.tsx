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
      answer: "Kami menerima pembayaran via Transfer Bank, E-Wallet (DANA).",
    },
    {
      question: "Bagaimana jika pembayaran saya gagal?",
      answer:
        "Jika pembayaran gagal, silakan coba lagi atau gunakan metode pembayaran lain. Pastikan saldo/limit mencukupi dan koneksi internet stabil.",
    },
    {
      question: "Apakah Pre Order harus bayar full atau bisa DP?",
      answer:
        "Untuk Pre Order, Anda cukup membayar DP sebesar 80% dari total harga saat memesan. Sisa pembayaran 80% dilunasi sebelum barang dikirim.",
    },
  ],
  preOrder: [
    {
      question: "Apa itu Pre Order?",
      answer:
        "Pre Order adalah sistem pemesanan di mana Anda memesan produk sebelum barang tersedia. Produk akan diproduksi atau disiapkan setelah periode Pre Order berakhir.",
    },
    {
      question: "Berapa lama waktu tunggu Pre Order?",
      answer:
        "Waktu tunggu Pre Order bervariasi tergantung produk, biasanya berkisar antara 7-14 hari kerja. Estimasi waktu akan tertera pada halaman produk.",
    },
    {
      question: "Apakah pesanan Pre Order bisa dibatalkan?",
      answer:
        "Pesanan Pre Order hanya dapat dibatalkan sebelum masa Pre Order berakhir. Setelah masuk proses produksi, pesanan tidak dapat dibatalkan.",
    },
  ],
};

const FaqScreen = () => {
  const handleContactSupport = () => {
    // Open WhatsApp or chat
    window.open("https://wa.me/628135374168", "_blank");
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

        <SettingSection title="Pre Order">
          {faqData.preOrder.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </SettingSection>

        <ContactSupport onContact={handleContactSupport} />
      </main>
    </div>
  );
};

export default FaqScreen;
