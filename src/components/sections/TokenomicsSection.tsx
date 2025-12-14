const TokenomicsSection = () => {
  const allocations = [
    { percentage: "40%", label: "Product Development" },
    { percentage: "20%", label: "Staking Rewards" },
    { percentage: "15%", label: "Marketing" },
    { percentage: "10%", label: "Exchange Liquidity" },
    { percentage: "10%", label: "Community & Airdrops" },
    { percentage: "5%", label: "Team" },
  ];

  return (
    <section className="bg-gradient-to-br from-[#1b212c] to-[#2a3244] text-yellow-500 py-8 md:py-16 px-3 md:px-5">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-yellow-500">
          SHIBAXNOMIC
        </h2>
        <div className="max-w-2xl mx-auto">
          {allocations.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center ${
                index !== allocations.length - 1
                  ? "border-b-2 border-white/10"
                  : ""
              } py-3 md:py-5 transition-all duration-300 hover:pl-2 md:hover:pl-3 hover:border-yellow-500`}
            >
              <span className="text-xl md:text-3xl font-bold text-yellow-500">
                {item.percentage}
              </span>
              <span className="text-white text-sm md:text-lg">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-6 md:mt-10 text-white text-base md:text-xl">
          <strong className="text-yellow-500">Total Supply:</strong> 10,000,000,000 ShibaX
        </p>
      </div>
    </section>
  );
};

export default TokenomicsSection;

