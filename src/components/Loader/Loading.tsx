export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0B0F19] z-[9999]">
      <div className="relative flex flex-col items-center">
        {/* Logo Image */}
        <div className="relative w-60 h-60 mb-4">
          <img
            src="/images/logo.png"
            alt="Loading..."
            className="w-full h-full object-contain animate-pulse"
          />
          {/* Optional Gloss/Glow Effect */}
          {/* <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" /> */}
        </div>
      </div>
    </div>
  );
}
