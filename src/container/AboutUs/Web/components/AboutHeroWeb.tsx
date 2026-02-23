const AboutHeroWeb = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      <img
        src="/images/logo-text.jpg"
        alt="About Outshine"
        className="w-full h-full object-cover grayscale brightness-[0.3]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-blue-500 font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in">
          Premium Essentials
        </span>
        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-6">
          OUTSHINE
        </h1>
        <p className="text-gray-400 max-w-xl text-lg font-medium leading-relaxed italic">
          "Tenang. Terkendali. Berbahaya dengan caranya sendiri."
        </p>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default AboutHeroWeb;
