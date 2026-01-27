import TermsHeader from "../components/TermsHeader";
import TermsContent from "../components/TermsContent";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col">
      <TermsHeader />

      <main className="flex-1 pb-8">
        <TermsContent
          title="1. Pendahuluan"
          content={[
            "Selamat datang di aplikasi OUTSHINE Store. Dengan menggunakan aplikasi ini, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini.",
            "Kami berhak untuk mengubah Syarat dan Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas aplikasi ini setelah perubahan tersebut dianggap sebagai persetujuan Anda terhadap perubahan tersebut.",
          ]}
        />
        <TermsContent
          title="2. Akun Pengguna"
          content={[
            "Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. Anda setuju untuk menerima tanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.",
            "Kami berhak untuk menolak layanan, menghentikan akun, menghapus atau mengedit konten, atau membatalkan pesanan atas kebijakan kami sendiri.",
          ]}
        />
        <TermsContent
          title="3. Pemesanan dan Pembayaran"
          content={[
            "Semua pesanan tergantung pada ketersediaan produk. Kami berhak untuk membatasi jumlah produk yang dapat dipesan.",
            "Harga produk dapat berubah sewaktu-waktu tanpa pemberitahuan. Harga yang dikenakan adalah harga yang berlaku pada saat pemesanan.",
            "Pembayaran harus dilakukan segera setelah pemesanan. Kami menerima berbagai metode pembayaran yang aman.",
          ]}
        />
        <TermsContent
          title="4. Pengiriman dan Pengembalian"
          content={[
            "Kami akan berusaha mengirimkan pesanan Anda sesuai dengan perkiraan waktu pengiriman. Namun, kami tidak bertanggung jawab atas keterlambatan yang disebabkan oleh pihak ketiga.",
            "Kebijakan pengembalian kami memungkinkan Anda untuk mengembalikan produk dalam waktu 7 hari setelah penerimaan, dengan syarat dan ketentuan tertentu.",
          ]}
        />
        <TermsContent
          title="5. Hak Kekayaan Intelektual"
          content={[
            "Semua konten yang terdapat dalam aplikasi ini, seperti teks, grafik, logo, dan gambar, adalah milik OUTSHINE Store atau penyedia kontennya dan dilindungi oleh hukum hak cipta.",
          ]}
        />

        <p className="text-center text-xs text-gray-400 mt-6 px-6">
          Terakhir diperbarui: 27 Januari 2026
        </p>
      </main>
    </div>
  );
};

export default TermsAndConditions;
