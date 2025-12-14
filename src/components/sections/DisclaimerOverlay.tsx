import { useState, useEffect } from "react";

const DisclaimerOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the disclaimer
    const hasSeenDisclaimer = localStorage.getItem("shibax_disclaimer_seen");
    if (!hasSeenDisclaimer) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("shibax_disclaimer_seen", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[10000] p-5">
      <div className="bg-white rounded-xl relative max-w-[500px] w-full shadow-[0_0_30px_rgba(255,215,0,0.5)] overflow-hidden">
        <img
          src="https://i.ibb.co/n80kTdXS/IMG-20250917-WA0092.jpg"
          alt="Disclaimer"
          className="w-full h-auto block"
        />
        <button
          className="absolute top-2.5 right-2.5 bg-black/80 text-white border-none rounded-full w-9 h-9 cursor-pointer font-bold text-xl leading-9 text-center transition-all duration-300 hover:bg-yellow-300 hover:text-black hover:rotate-90"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DisclaimerOverlay;

