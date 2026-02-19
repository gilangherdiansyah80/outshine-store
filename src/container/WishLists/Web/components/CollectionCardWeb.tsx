import { ChevronRight, Layers } from "lucide-react";

interface CollectionCardWebProps {
  id: string;
  name: string;
  itemCount: number;
  previewImages?: string[];
  onClick: (id: string) => void;
}

export default function CollectionCardWeb({
  id,
  name,
  itemCount,
  previewImages = [],
  onClick,
}: CollectionCardWebProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className="group relative bg-white rounded-4xl p-8 border-2 border-slate-50 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 cursor-pointer"
    >
      <div className="flex flex-col gap-8">
        {/* Mini Preview Grid */}
        <div className="grid grid-cols-2 gap-3 h-48">
          {previewImages.length > 0 ? (
            previewImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-50"
              >
                <img
                  src={img}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 row-span-2 flex items-center justify-center bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200">
              <Layers size={40} className="text-slate-300 animate-pulse" />
            </div>
          )}
        </div>

        {/* Collection Info */}
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-[#0F172A] tracking-tighter group-hover:text-[#2563EB] transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 text-[#2563EB] rounded-lg text-[10px] font-black uppercase tracking-widest">
                {itemCount} {itemCount === 1 ? "Item" : "Items"}
              </span>
              <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                Curated Collection
              </span>
            </div>
          </div>

          <div className="h-12 w-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl shadow-slate-200">
            <ChevronRight size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}
