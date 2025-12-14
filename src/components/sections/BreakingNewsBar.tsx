const BreakingNewsBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full max-w-full h-[50px] bg-gradient-to-r from-green-600 to-green-700 z-[9999] flex items-center pr-2.5 overflow-hidden border-b-2 border-green-800 shadow-lg">
      <div className="flex flex-nowrap whitespace-nowrap animate-scroll-continuous flex-1 order-1">
        <div className="inline-block mr-[50px] font-bold text-[15px] text-white">
          🚀 ShibaX listed at $1.9 — Early investors seize the opportunity! | 🔥
          Join the freedom finance revolution now! | 🌍 Together we rise!
        </div>
        <div className="inline-block mr-[50px] font-bold text-[15px] text-white">
          🚀 ShibaX listed at $1.9 — Early investors seize the opportunity! | 🔥
          Join the freedom finance revolution now! | 🌍 Together we rise!
        </div>
      </div>
      <div className="font-bold text-base text-white bg-green-700 px-3 py-1 ml-2.5 uppercase flex-shrink-0 rounded order-2 animate-pulse">
        BREAKING
      </div>
    </div>
  );
};

export default BreakingNewsBar;

