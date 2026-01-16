import { cn } from "@outshine/lib/utils";

interface HeroBannerProps {
  className?: string;
}

/**
 * Hero banner section for home page
 * Features: Background image, exclusive label, title, and CTA button
 */
const HeroBanner = ({ className }: HeroBannerProps) => {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-[#1a3a2a]",
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
          alt="Summer Collection"
          className="h-full w-full object-cover object-center opacity-80"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end p-6 min-h-[320px]">
        {/* Exclusive Badge */}
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
          Exclusive
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white leading-tight mb-4">
          New Summer
          <br />
          Collection
        </h1>

        {/* CTA Button */}
        <button className="w-fit bg-[#0F172A] hover:bg-[#0d3380] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
