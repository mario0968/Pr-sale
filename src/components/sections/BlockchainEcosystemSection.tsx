const BlockchainEcosystemSection = () => {
  const ecosystemItems = [
    {
      title: "AUDIT",
      description:
        "Our smart contracts have been audited by SolidProof to ensure maximum security and trust. 100% secure and verified.",
      link: "https://app.solidproof.io/projects/shibax",
    },
    {
      title: "WHITEPAPER",
      description:
        "Read our comprehensive whitepaper to learn about our vision, technology, tokenomics, and roadmap for the future.",
      link: "https://drive.google.com/file/d/1Etrk_j8rrElP9FxMjW4ISCN36a5Rbxvi/view?usp=drivesdk",
    },
  ];

  return (
    <section className="relative py-8 md:py-16 px-3 md:px-5 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Title with shadow effect */}
        <h2 className="text-center text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] tracking-wide">
          Trust and security clearly
        </h2>

        {/* Grid of 8 boxes - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ecosystemItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl bg-yellow-400 p-4 md:p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(255,215,0,0.4)] cursor-pointer border-2 border-black/10"
            >
              {/* Title - bold black text */}
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-black mb-2 md:mb-4 tracking-tight">
                {item.title}
              </h3>

              {/* Description - black text with slightly playful style */}
              <p className="text-sm md:text-base lg:text-lg text-black leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Click indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-6 h-6 text-black/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlockchainEcosystemSection;
