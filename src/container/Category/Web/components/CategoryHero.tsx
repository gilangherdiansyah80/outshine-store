interface CategoryHeroProps {
  name: string;
  imageUrl: string;
}

const CategoryHero = ({ name, imageUrl }: CategoryHeroProps) => {
  return (
    <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl group flex items-center justify-center bg-gray-50">
      <img
        src={imageUrl}
        alt={name}
        className="w-64 h-auto object-contain transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-white tracking-tight">
            {name}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl font-medium">
            Temukan koleksi {name} terbaik yang dirancang khusus untuk memenuhi
            gaya hidup Anda yang dinamis dan berkelas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
