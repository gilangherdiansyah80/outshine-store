const AboutHero = () => {
  return (
    <div className="relative h-[280px] w-full">
      <img
        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000"
        alt="Outshine Team"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-blue-500 font-medium tracking-wider text-xs uppercase mb-2 block">
          Since 2024
        </span>
        <h2 className="text-3xl font-bold leading-tight">
          We Replace <br />
          <span className="text-gray-400">The Ordinary</span>
        </h2>
      </div>
    </div>
  );
};

export default AboutHero;
