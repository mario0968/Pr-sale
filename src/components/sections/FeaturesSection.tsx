import { useState, useEffect } from "react";

const FeaturesSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      emoji: "💧",
      title: "Liquidity",
      description: "Ensures liquidity is automatically locked, preventing rug pulls and building investor trust from day one.",
      isDark: false,
    },
    {
      emoji: "🔥",
      title: "Staking",
      description: "Stake tokens to earn rewards, unlock exclusive launchpad access, and participate in DAO voting.",
      isDark: true,
    },
    {
      emoji: "🗳️",
      title: "DAO Voting",
      description: "Projects seeking to launch on the platform must obtain community approval.",
      isDark: true,
    },
    {
      emoji: "🔒",
      title: "Security Layer",
      description: "A unified KYC layer ensures all participants and projects are verified, secure, and compliant.",
      isDark: false,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#111] py-16 px-5">
      <div className="container mx-auto">
        <div className="relative max-w-6xl mx-auto">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div className="flex gap-5 justify-center items-center flex-wrap md:flex-nowrap">
              {/* Show all cards on desktop, only current on mobile */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentSlide ? "block" : "hidden"
                  } md:block w-full max-w-[280px] md:w-[280px] h-[280px] rounded-2xl flex flex-col items-center justify-center my-5 mx-auto p-6 text-center transition-all duration-300 hover:-translate-y-2 ${
                    feature.isDark
                      ? "bg-[#1a1a1a] text-white border-[3px] border-yellow-400 shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000]"
                      : "bg-yellow-400 text-black border-[3px] border-black shadow-[4px_4px_0_#000] hover:shadow-[8px_8px_0_#000]"
                  }`}
                >
                  <div className="text-5xl mb-4">{feature.emoji}</div>
                  <p className="text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-yellow-400 text-black w-10 h-10 rounded-full font-bold hover:bg-yellow-300 transition-colors"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-400 text-black w-10 h-10 rounded-full font-bold hover:bg-yellow-300 transition-colors"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-yellow-400" : "bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

