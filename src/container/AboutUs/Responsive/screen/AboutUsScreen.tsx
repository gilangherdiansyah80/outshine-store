import AboutContact from "../components/AboutContact";
import AboutFeatures from "../components/AboutFeatures";
import AboutFooter from "../components/AboutFooter";
import AboutHero from "../components/AboutHero";
import AboutStats from "../components/AboutStats";
import AboutStory from "../components/AboutStory";

import { useEffect, useState } from "react";
import Loading from "@/components/Loader/Loading";

const AboutUsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans">
      <AboutHero />

      {/* Main Content */}
      <div className="px-5 space-y-8 mt-6">
        <AboutStory />
        <AboutStats />
        <AboutFeatures />
        <AboutContact />
        <AboutFooter />
      </div>
    </div>
  );
};

export default AboutUsScreen;
