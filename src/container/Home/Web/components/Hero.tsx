import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@outshine/lib/utils";
import Button from "@outshine/ui/Button/Button";
import { useGetHero } from "@/services/Hero/useGetHero";

interface HeroBannerProps {
  className?: string;
}

/**
 * Hero banner section for home page
 * Features: Background image, exclusive label, title, and CTA button with auto-slideshow
 */
const Hero = ({ className }: HeroBannerProps) => {
  const navigate = useNavigate();
  const { heroData, isLoading } = useGetHero();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter or take all heroes for the slider
  const heroes = heroData || [];

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroes.length]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full h-[320px] rounded-2xl overflow-hidden bg-slate-800 animate-pulse",
          className,
        )}
      />
    );
  }

  if (heroes.length === 0) return null;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-[#0F172A] min-h-[820px]",
        className,
      )}
    >
      {/* Slides */}
      {heroes.map((hero, index) => (
        <div
          key={hero.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentIndex
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0",
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={hero.backgroundImage}
              alt={hero.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-6 pb-8 gap-y-3">
            {/* Exclusive Badge */}
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 transition-all duration-700 delay-300",
                index === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              {hero.badgeText}
            </span>

            {/* Title */}
            <h1
              className={cn(
                "text-3xl font-extrabold text-white leading-tight whitespace-pre-line transition-all duration-700 delay-500",
                index === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              {hero.title}
            </h1>

            {/* CTA Button */}
            <div
              className={cn(
                "transition-all duration-700 delay-700",
                index === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
            >
              <Button
                onClick={() => navigate("/outshine/products")}
                className="w-fit bg-white hover:bg-slate-100 text-[#0F172A] font-bold py-3.5 px-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 border-none"
              >
                {hero.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Indicators */}
      {heroes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {heroes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/40",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
