import AboutHeroWeb from "./components/AboutHeroWeb";
import AboutPhilosophyWeb from "./components/AboutPhilosophyWeb";
import AboutLocationWeb from "./components/AboutLocationWeb";
import AboutContactSocialsWeb from "./components/AboutContactSocialsWeb";
import AboutQuoteWeb from "./components/AboutQuoteWeb";

export default function AboutUsWeb() {
  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Hero Section */}
      <AboutHeroWeb />

      {/* Philosophy / Story Section */}
      <AboutPhilosophyWeb />

      {/* Grid: Location & Contact */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Location Card */}
            <AboutLocationWeb />

            {/* Contact & Socials */}
            <AboutContactSocialsWeb />
          </div>
        </div>
      </section>

      {/* Aesthetic Quote section */}
      <AboutQuoteWeb />
    </main>
  );
}
