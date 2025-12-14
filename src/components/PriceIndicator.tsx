import { useEffect, useState } from "react";

interface PriceIndicatorProps {
  tokenSymbol: string;
  price: number | null;
  updateInterval?: number; // in milliseconds
}

const PriceIndicator: React.FC<PriceIndicatorProps> = ({
  tokenSymbol,
  price,
  updateInterval = 30000, // 30 seconds default
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Reset progress when price changes
    setProgress(100);

    const intervalDuration = updateInterval / 100; // Update 100 times during the interval
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          return 100; // Reset when complete
        }
        return prev - 1;
      });
    }, intervalDuration);

    return () => clearInterval(progressInterval);
  }, [price, updateInterval]);

  // Calculate the stroke-dashoffset for the circular progress
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 backdrop-blur-sm">
      {/* Circular progress indicator */}
      <div className="relative flex h-10 w-10 items-center justify-center">
        {/* Background circle */}
        <svg className="absolute h-10 w-10 -rotate-90 transform">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="url(#priceGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.3s linear",
            }}
          />
          <defs>
            <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1DDAFF" />
              <stop offset="100%" stopColor="#EA1AF7" />
            </linearGradient>
          </defs>
        </svg>
        {/* Icon in center */}
        <span className="relative z-10 text-xs font-bold text-white/90">$</span>
      </div>

      {/* Price display */}
      <div className="flex flex-col">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
          {tokenSymbol} Price
        </span>
        <span className="text-sm font-bold text-white">
          {price ? `$${price.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}` : "Loading..."}
        </span>
      </div>

      {/* Time indicator */}
      <div className="ml-auto flex flex-col items-end">
        <span className="text-[9px] font-medium uppercase tracking-wide text-white/50">
          Updates in
        </span>
        <span className="text-xs font-semibold text-white/70">
          {Math.ceil((progress / 100) * (updateInterval / 1000))}s
        </span>
      </div>
    </div>
  );
};

export default PriceIndicator;
