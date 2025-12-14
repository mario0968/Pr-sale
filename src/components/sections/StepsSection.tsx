const StepsSection = () => {
  const steps = [
    {
      icon: "🚀",
      title: "FIRST:",
      description:
        "Elon Musk is leading the way! Start your Shibax journey by deciding how many tokens you want to buy. Follow the example of innovation!",
    },
    {
      icon: "⏱",
      title: "SECOND:",
      description:
        "Choose how many Shibax tokens to buy. No need to be a billionaire – all you need is love for financial freedom!",
    },
    {
      icon: "✅",
      title: "THIRD:",
      description:
        "Approve the transaction in your wallet. Don't worry, you're not selling the country, just buying Shibax-powered influence.",
    },
    {
      icon: "🎯",
      title: "FINAL:",
      description:
        "Once the presale ends, you'll be able to claim your Shibax tokens. Get ready to join the Shibax revolution!",
    },
  ];

  return (
    <section className="bg-[#111] py-16 px-5">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <img
            src="https://i.ibb.co/spHxQyzr/Screenshot-2025-09-19-21-41-31-516-org-telegram-messenger.jpg"
            alt="How to Buy"
            className="max-w-full rounded-xl inline-block shadow-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#111] border-[3px] border-yellow-400 rounded-2xl p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,215,0,0.5)] hover:border-yellow-300 shadow-[0_4px_10px_rgba(255,215,0,0.2)]"
            >
              <h2 className="text-yellow-400 text-2xl mb-4 flex items-center gap-3">
                <span className="text-3xl">{step.icon}</span>
                {step.title}
              </h2>
              <p className="text-base leading-relaxed text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;

