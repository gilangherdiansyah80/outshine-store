import { X } from "lucide-react";

interface ImagePreviewProps {
  src: string | null;
  onClose: () => void;
  alt?: string;
}

const ImagePreview = ({ src, onClose, alt = "Preview" }: ImagePreviewProps) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X size={24} />
      </button>
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        />
      </div>
    </div>
  );
};

export default ImagePreview;
