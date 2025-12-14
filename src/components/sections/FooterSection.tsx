import BuyForm from "../BuyForm";
import FadeRight from "../animations/FadeRight";

const FooterSection = () => {
  return (
    <>
      {/* CTA Section with Buy Widget */}
      <section className="bg-gradient-to-br from-yellow-300 to-yellow-400 text-black py-10 md:py-20 px-3 md:px-5 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-5 drop-shadow-[2px_2px_rgba(0,0,0,0.1)]">
            READY TO LAUNCH WITH SHIBAX? 🚀
          </h2>
          <p className="text-sm md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed">
            Join the revolution where memes meet real utility.
            <br />
            No rugs, no fear — just real degens, real support, and real purpose.
          </p>

          {/* Buy Widget in CTA */}
          <div className="my-8 md:my-12">
            <FadeRight className="relative flex w-full justify-center">
              <div className="w-full max-w-2xl">
                <BuyForm />
              </div>
            </FadeRight>
          </div>

          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-6 md:mb-12">
            <span className="bg-black text-yellow-300 rounded-full px-4 md:px-8 py-2 md:py-4 font-bold text-xs md:text-base">
              🔐 SAFE
            </span>
            <span className="bg-black text-yellow-300 rounded-full px-4 md:px-8 py-2 md:py-4 font-bold text-xs md:text-base">
              📈 VIRAL
            </span>
            <span className="bg-black text-yellow-300 rounded-full px-4 md:px-8 py-2 md:py-4 font-bold text-xs md:text-base">
              👥 COMMUNITY-DRIVEN
            </span>
          </div>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-800 font-semibold">
            #NoRugJustRise
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white text-center pt-8 md:pt-12 bg-black px-3 md:px-5">
        <h3 className="text-2xl md:text-3xl mb-4 md:mb-5 transition-all duration-300 hover:drop-shadow-[0_0_10px_#fedd00]">
          <span className="text-white">Shiba</span>
          <span className="text-yellow-300">X</span>
        </h3>
        <div className="my-4 md:my-6 leading-loose">
          <a
            href="/terms"
            className="text-white no-underline mx-2 md:mx-4 inline-block relative text-sm md:text-base transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Terms of Service
          </a>
          <a
            href="/cookies"
            className="text-white no-underline mx-2 md:mx-4 inline-block relative text-sm md:text-base transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Cookies
          </a>
          <a
            href="/privacy"
            className="text-white no-underline mx-2 md:mx-4 inline-block relative text-sm md:text-base transition-all duration-300 hover:text-yellow-300 hover:-translate-y-0.5 after:content-[''] after:absolute after:w-0 after:h-0.5 after:-bottom-0.5 after:left-0 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Privacy Policy
          </a>
        </div>
        <a
          href="https://t.me/+AxxSUhlmfmM1MmIx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 md:gap-3 no-underline text-blue-500 font-semibold mt-4 md:mt-5 transition-all duration-300 px-4 md:px-6 py-2 md:py-3 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 text-sm md:text-base"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
            alt="Telegram"
            className="w-5 h-5 md:w-6 md:h-6"
          />
          ShibaX Telegram Group
        </a>
        <p className="mt-6 md:mt-8 text-xs md:text-sm text-gray-400 leading-relaxed max-w-4xl mx-auto pb-6 md:pb-10 px-3">
          $ShibaX Token is a speculative meme coin asset fueled by community
          energy, freedom-first ideals, and decentralized ambition. The
          cryptocurrency market carries risk — including the loss of all
          capital. Nothing on this website constitutes financial advice.
        </p>

        {/* Contract Address Section */}

        <div style={{ backgroundColor: "#0a0a0a" }} className="py-6 md:py-10 px-3">
          <div className="max-w-[500px] mx-auto flex flex-col items-center gap-3 md:gap-5">
            {/* Contract Address + Copy Button */}
            <div className="flex items-center w-full gap-2 md:gap-2.5">
              <input
                type="text"
                id="contractAddress"
                value="0xa297d42fb6cd1b29dca8f61bcdad145272a64781"
                readOnly
                className="flex-1 px-2 md:px-3 py-2 md:py-3 text-xs md:text-sm border border-gray-600 rounded-lg bg-[#111] text-green-400 font-mono focus:outline-none focus:border-yellow-300"
              />
              <button
                onClick={() => {
                  const address = "0xa297d42fb6cd1b29dca8f61bcdad145272a64781";
                  navigator.clipboard.writeText(address).then(() => {
                    // Show feedback (you can use SweetAlert2 here if needed)
                    const button = document.getElementById("copyButton");
                    if (button) {
                      const originalHTML = button.innerHTML;
                      button.innerHTML = "✓";
                      button.style.backgroundColor = "#28a745";
                      setTimeout(() => {
                        button.innerHTML = originalHTML;
                        button.style.backgroundColor = "#28a745";
                      }, 2000);
                    }
                  });
                }}
                id="copyButton"
                className="p-2.5 bg-[#28a745] border-none rounded-lg cursor-pointer transition-all hover:bg-[#218838] active:scale-95"
                aria-label="Copy contract address"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                  alt="Copy"
                  width="20"
                  height="20"
                  className="block"
                />
              </button>
            </div>

            {/* Twitter/X Logo as Button */}
            <a
              href="https://twitter.com/shibacoin120"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-8 h-8 transition-transform hover:scale-110"
              aria-label="Follow us on X (Twitter)"
            >
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-logo-icon.svg"
                alt="X (Twitter)"
                className="w-full h-full object-contain block"
              />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
