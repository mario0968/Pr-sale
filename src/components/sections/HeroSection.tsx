import FadeRight from "../animations/FadeRight";
import BuyForm from "../BuyForm";
import BlockchainEcosystemSection from "./BlockchainEcosystemSection";

const HeroSection = () => {
  return (
    <section className="text-center py-10 bg-gradient-to-br from-black to-gray-900">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-2 gap-6 mb-8 max-w-6xl mx-auto px-4">
          <div className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,215,0,0.3)]">
            <img
              src="https://i.ibb.co/b5NP3XmV/IMG-20251002-WA0164-2.jpg"
              alt="ShibaX Hero 1"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,215,0,0.3)]">
            <img
              src="https://i.ibb.co/xK60Yf3h/IMG-20251002-WA0324.jpg"
              alt="ShibaX Hero 2"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Buy Widget - Centered */}
        <div className="my-12">
          <FadeRight className="relative flex w-full justify-center">
            <div className="w-full max-w-2xl">
              <BuyForm />
            </div>
          </FadeRight>
        </div>

        {/* Blockchain Ecosystem Section */}
        <div className="my-12">
          <BlockchainEcosystemSection />
        </div>

        {/* Banner Image */}
        <div className="text-center my-8">
          <img
            src="https://i.ibb.co/Z6Jf9Khc/IMG-20250915-WA0166.jpg"
            alt="ShibaX Banner"
            className="w-full max-w-2xl h-auto rounded-xl shadow-[0_8px_24px_rgba(255,215,0,0.3)] mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
