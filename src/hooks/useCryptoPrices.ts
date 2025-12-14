import { useState, useEffect, useCallback } from "react";

interface CryptoPrices {
  bnb: number | null;
  eth: number | null;
}

interface UseCryptoPricesReturn {
  prices: CryptoPrices;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useCryptoPrices = (): UseCryptoPricesReturn => {
  const [prices, setPrices] = useState<CryptoPrices>({
    bnb: null,
    eth: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Binance API - Free and fast, no API key required
      const [bnbResponse, ethResponse] = await Promise.all([
        fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"),
        fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"),
      ]);

      if (!bnbResponse.ok || !ethResponse.ok) {
        throw new Error("Failed to fetch prices from Binance");
      }

      const [bnbData, ethData] = await Promise.all([
        bnbResponse.json(),
        ethResponse.json(),
      ]);

      setPrices({
        bnb: parseFloat(bnbData.price) || null,
        eth: parseFloat(ethData.price) || null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch prices";
      setError(errorMessage);
      console.error("Error fetching crypto prices:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();

    // Refresh prices every 30 seconds
    const interval = setInterval(() => {
      fetchPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    prices,
    loading,
    error,
    refetch: fetchPrices,
  };
};

export default useCryptoPrices;