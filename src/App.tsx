import BreakingNewsBar from "./components/sections/BreakingNewsBar";
import DisclaimerOverlay from "./components/sections/DisclaimerOverlay";
import HeroSection from "./components/sections/HeroSection";
import InfoImagesSection from "./components/sections/InfoImagesSection";
import StepsSection from "./components/sections/StepsSection";
import RoadmapSection from "./components/sections/RoadmapSection";
import TokenomicsSection from "./components/sections/TokenomicsSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import FAQSection from "./components/sections/FAQSection";
import FooterSection from "./components/sections/FooterSection";
import { BuyWithCardModalTarget } from "./components/BuyWithCardModal";
import { ConnectWalletModalTarget } from "./components/ConnectWalletModal";

function App() {
  return (
    <>
      <DisclaimerOverlay />
      <BreakingNewsBar />
      <main id="main" className="flex min-h-screen flex-col app-bg bg-noise pt-[50px] overflow-x-hidden w-full max-w-full">
        <HeroSection />
        <InfoImagesSection />
        <StepsSection />
        <RoadmapSection />
        <TokenomicsSection />
        <FeaturesSection />
        <FAQSection />
        <FooterSection />
        <BuyWithCardModalTarget />
        <ConnectWalletModalTarget />
      </main>
    </>
  );
}

export default App;
