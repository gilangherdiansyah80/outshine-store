import AboutContact from "../components/AboutContact";
import AboutHero from "../components/AboutHero";
import AboutLocation from "../components/AboutLocation";
import AboutSocials from "../components/AboutSocials";
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
    <div className="min-h-screen bg-white font-sans">
      <AboutHero />

      {/* Main Content */}
      <div className="px-5 space-y-10 mt-8 pb-10">
        <AboutStory />
        <AboutLocation />
        <AboutContact />
        <AboutSocials />
      </div>
    </div>
  );
};

export default AboutUsScreen;
