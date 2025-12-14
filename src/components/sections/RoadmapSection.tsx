const RoadmapSection = () => {
  const roadmapSteps = [
    {
      number: 1,
      title: "Let the Meme Games Begin",
      description: "Memes assemble! The presale is live, let the degen games begin",
      items: [
        "✨ Launch website & whitepaper",
        "✨ Smart-contract audit with Solid/Coinsult",
        "✨ Start presale SHIBAX with BNB, ETH, USD1",
        "✨ Airdrop for WLFI holders",
        "✨ Build core community",
      ],
      highlight: true,
    },
    {
      number: 2,
      title: "The Meme Wars",
      description: "Let the strongest memes rise – listings, contests & token battles",
      items: [
        "🔒 CEX & DEX Listings",
        "🔒 Meme contests & prize pools",
        "🔒 NFT Meme Marketplace",
      ],
      highlight: false,
    },
    {
      number: 3,
      title: "Where Memes Become Legends",
      description: "Unite the memers. Let contests and staking forge a new meme elite",
      items: [
        "🔒 Multi-chain presales",
        "🔒 Stake-to-earn rewards",
        "🔒 Referral & gamification",
      ],
      highlight: false,
    },
    {
      number: 4,
      title: "Meme World Domination",
      description: "Meme domination unlocked: more chains, smarter memes, and global takeoff",
      items: [
        "🔒 Use $SHIBAX in DeFi lending",
        "🔒 AI meme presales",
        "🔒 Meme reputation system",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="bg-[#111] py-8 md:py-16 px-3 md:px-5">
      <div className="container mx-auto">
        <img
          src="https://i.ibb.co/S7PWzRmW/Screenshot-2025-09-19-22-09-43-236-org-telegram-messenger.jpg"
          alt="Roadmap Header"
          className="max-w-[600px] w-full block mx-auto mb-8 md:mb-16 rounded-xl"
        />
        <h2 className="text-center text-3xl md:text-5xl text-white mb-8 md:mb-16 font-bold">Roadmap</h2>
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-white -translate-x-1/2"></div>
          
          {roadmapSteps.map((step, index) => (
            <div
              key={index}
              className={`rounded-3xl border-[3px] border-white p-5 md:p-8 lg:p-10 relative mb-12 md:mb-20 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)] ${
                step.highlight ? "bg-yellow-400" : "bg-white"
              }`}
            >
              {/* Step number badge */}
              <div className="absolute -top-5 md:-top-7 left-1/2 -translate-x-1/2 bg-black text-yellow-400 font-bold text-lg md:text-2xl w-10 h-10 md:w-14 md:h-14 leading-[35px] md:leading-[45px] text-center rounded-full border-2 md:border-4 border-yellow-400 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                {step.number}
              </div>
              
              <div className="mt-3 md:mt-5">
                <h4 className="inline-block bg-white border-2 border-black rounded-xl px-3 md:px-4 py-1.5 md:py-2 text-base md:text-xl font-bold mb-3 md:mb-4 text-black">
                  {step.title}
                </h4>
                <p className="text-sm md:text-base mb-3 md:mb-5 text-gray-800 font-medium">
                  {step.description}
                </p>
                <ul className="list-none p-0 text-left">
                  {step.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="my-2 md:my-3 text-sm md:text-base font-medium text-gray-900 pl-4 md:pl-6 relative"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;

