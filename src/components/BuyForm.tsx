import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import config from "../config";
import { useAccount, useSwitchChain } from "wagmi";
import useWeb3Functions from "../hooks/useWeb3Functions";
import Loading from "./Loading";
import { setCurrentChain } from "../store/presale";
import { useTranslation } from "react-i18next";
import { CountdownRenderProps, zeroPad } from "react-countdown";
import { formatNumber } from "../utils";
import useCurrentChain from "../hooks/useCurrentChain";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BuyWithCardModal } from "./BuyWithCardModal";
import SwitchNetworkButton from "./SwitchNetworkButton";
import useCryptoPrices from "../hooks/useCryptoPrices";
import PriceIndicator from "./PriceIndicator";
import { appKit } from "../lib/wagmi";
import "../buyform.css";

const MySwal = withReactContent(Swal);

const BuyForm = () => {
  const { t } = useTranslation();
  const chain = useCurrentChain();
  const { switchChainAsync } = useSwitchChain();
  const dispatch = useDispatch();
  const {
    buyToken,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
    loading,
  } = useWeb3Functions();
  const { prices } = useCryptoPrices();
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const balances = useSelector((state: RootState) => state.wallet.balances);
  const tokenPrices = useSelector((state: RootState) => state.presale.prices);
  const saleStatus = useSelector(
    (state: RootState) => state.presale.saleStatus
  );
  const currentPhase = useSelector((state: RootState) => state.presale.phase);
  const phasePrice = useSelector((state: RootState) => state.presale.phasePrice);

  const tokenBalance = useSelector((state: RootState) => state.wallet.balances);
  const saleToken = config.saleToken;

  const [isBuyWithCardModalOpen, setIsBuyWithCardModalOpen] = useState(false);

  const [fromToken, setFromToken] = useState<Token>(tokens[chain.id][0]);
  const toToken = useMemo(() => saleToken[chain.id] as Token, [chain]);

  const [fromValue, setFromValue] = useState<string | number>("");
  const [toValue, setToValue] = useState<string | number>("");

  const { address, isConnected } = useAccount();

  // Progress selectors (unchanged)
  const totalTokensSold = useSelector(
    (s: RootState) => s.presale.totalTokensSold
  );
  const totalTokensForSale = config.stage.total;

  const soldPercentage = useMemo(() => {
    if (!totalTokensForSale) return 0;
    const pct = (totalTokensSold / totalTokensForSale) * 100;
    return Math.max(0, Math.min(100, pct));
  }, [totalTokensSold, totalTokensForSale]);

  const fmt = (n: number | string | undefined) =>
    Number(n || 0).toLocaleString();

  const fixedNumber = (num: number, decimals = 6) =>
    +parseFloat((+num).toFixed(decimals));

  const lockedToken = useMemo(
    () => formatNumber(balances[toToken.symbol]),
    [balances]
  );

  const buttonTitle = useMemo(() => {
    if (!isConnected) return t("connect-wallet");
    if (saleStatus) return "BUY NOW";
    return "Unlock Tokens";
  }, [isConnected, saleStatus]);

  const insufficientBalance = useMemo(() => {
    if (!fromValue) return false;
    return +fromValue > tokenBalance[fromToken.symbol];
  }, [fromValue, tokenBalance]);

  // Get current phase price (in USDT per SBX token, 18 decimals format)
  // If phase price is not available, fallback to default 0.0002
  const currentShibaxPrice = phasePrice > 0 ? phasePrice : 0.0002;

  // Helper function to get USD price for a token
  // All prices come from the smart contract:
  // - For native tokens (BNB): uses contract.rate() (price in USDT with 18 decimals)
  // - For ERC20 tokens (USDT): uses contract.tokenPrices(tokenAddress) (price in USDT with 18 decimals)
  // Both are formatted with 18 decimals in fetchTokenPrices, so tokenPrices values are already correct USD prices
  const getTokenUsdPrice = (token: Token): number | null => {
    // Use contract price if available (for both BNB and USDT)
    if (tokenPrices[token.symbol] && tokenPrices[token.symbol] !== 0) {
      // tokenPrices are already formatted correctly (18 decimals) from fetchTokenPrices
      // So tokenPrices["BNB"] = BNB price in USD (e.g., 600)
      // And tokenPrices["USDT"] = USDT price in USD (e.g., 1)
      return tokenPrices[token.symbol];
    }
    
    // Fallback values if contract price not available
    if (token.symbol === "USDT") return 1;
    if (token.symbol === "BNB" && prices.bnb) return prices.bnb;
    if (token.symbol === "ETH" && prices.eth) return prices.eth;
    
    return null;
  };

  // Calculate SBX amount based on payment amount and current phase price
  const calculateSbxAmount = (paymentAmount: number, paymentToken: Token): number => {
    if (!paymentAmount || paymentAmount <= 0) return 0;
    
    const tokenUsdPrice = getTokenUsdPrice(paymentToken);
    if (tokenUsdPrice) {
      // Convert payment token to USD, then divide by current phase price to get SBX amount
      const usdValue = paymentAmount * tokenUsdPrice;
      const sbxAmount = usdValue / currentShibaxPrice;
      return sbxAmount;
    }
    return 0;
  };

  // Calculate payment amount based on SBX amount and current phase price
  const calculatePaymentAmount = (sbxAmount: number, paymentToken: Token): number => {
    if (!sbxAmount || sbxAmount <= 0) return 0;
    
    const tokenUsdPrice = getTokenUsdPrice(paymentToken);
    if (tokenUsdPrice) {
      // Convert SBX to USD using current phase price, then divide by payment token price
      const usdValue = sbxAmount * currentShibaxPrice;
      const paymentAmount = usdValue / tokenUsdPrice;
      return paymentAmount;
    }
    return 0;
  };

  const setBalance = () => {
    const balance = balances[fromToken.symbol];
    setFromValue(balance);

    const sbxAmount = calculateSbxAmount(balance, fromToken);
    if (sbxAmount > 0) {
      setToValue(fixedNumber(sbxAmount, 4));
    }
  };

  const fromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      emptyValues();
      return;
    }

    setFromValue(fixedNumber(+value));

    const sbxAmount = calculateSbxAmount(+value, fromToken);
    if (sbxAmount > 0) {
      setToValue(fixedNumber(sbxAmount, 4));
    } else {
      setToValue("");
    }
  };

  const toValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      emptyValues();
      return;
    }

    setToValue(fixedNumber(+value, 4));

    const paymentAmount = calculatePaymentAmount(+value, fromToken);
    if (paymentAmount > 0) {
      setFromValue(fixedNumber(paymentAmount));
    } else {
      setFromValue("");
    }
  };

  const emptyValues = () => {
    setFromValue("");
    setToValue("");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isConnected) {
      await appKit.open();
      return;
    }
    if (+fromValue === 0) return;

    try {
      await buyToken(fromValue, fromToken);
      emptyValues();
    } catch (error) {
      console.error("Buy token error:", error);
    }
  };

  // === EFFECTS (unchanged) ===
  useEffect(() => {
    if (!address || !chain) return () => {};
    fetchLockedBalance();
    fetchTokenBalances();
  }, [address, chain]);

  useEffect(() => {
    if (!chain || !config.chains.find((c) => c.id === chain.id))
      return () => {};
    dispatch(setCurrentChain(chain.id));
    fetchIntialData();
    emptyValues();
    if (tokens[chain.id] && tokens[chain.id][0]) {
      setFromToken(tokens[chain.id][0]);
    }
  }, [chain]);

  useEffect(() => {
    if (!isConnected || !chain) return () => {};

    if (config.chains.find((c) => c.id === chain.id)) {
      dispatch(setCurrentChain(chain?.id as number));
    } else {
      switchChainAsync?.({ chainId: config.chains[0].id });
    }
  }, [isConnected]);

  useEffect(() => {
    fetchIntialData();
  }, []);

  const renderer: React.FC<CountdownRenderProps> = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return (
        <span className="mx-auto block rounded-lg bg-white/5 px-3 py-2 text-center text-sm font-semibold text-white/80">
          Time&apos;s up!
        </span>
      );
    }

    // Progress helpers (Days uses a 30-day window as a sensible default)
    const items = [
      { label: "Days", value: Number(days), max: 30 },
      { label: "Hours", value: Number(hours), max: 24 },
      { label: "Minutes", value: Number(minutes), max: 60 },
      { label: "Seconds", value: Number(seconds), max: 60 },
    ] as const;

    const pct = (val: number, max: number) =>
      `${Math.max(0, Math.min(100, (val / max) * 100))}%`;

    return (
      <div
        role="timer"
        aria-live="polite"
        className="relative mx-auto my-2 w-[92%] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-2 md:p-2.5 shadow-[0_10px_30px_rgba(0,0,0,.25)] backdrop-blur-md"
      >
        {/* soft gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(255,255,255,.08),transparent_55%)]"
        />

        <div className="relative flex items-stretch justify-center divide-x divide-white/10">
          {items.map(({ label, value, max }) => (
            <div
              key={label}
              className="flex min-w-[60px] md:min-w-[70px] flex-col items-center px-2 md:px-3"
            >
              <div className="text-[8px] md:text-[10px] uppercase tracking-wide text-white/60 lg:text-xs">
                {label}
              </div>

              <div className="mt-0.5 select-none text-xl md:text-2xl font-semibold tabular-nums leading-none text-white lg:text-3xl">
                {zeroPad(value)}
              </div>

              {/* tiny progress pill */}
              <div className="mt-2 h-1.5 w-12 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                <div
                  className="h-full w-0 rounded-full bg-gradient-to-r from-white to-[#1DDAFF] transition-all duration-500 ease-out"
                  style={{ width: pct(value, max) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Add function to shorten address
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/15 bg-[rgba(5,10,20,0.85)] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      {/* subtle ambient glows (pure CSS shapes) */}
      <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-[#1DDAFF33] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#EA1AF733] blur-3xl" />

      {loading && <Loading className="z-50 rounded-3xl" />}

      {/* Header */}
      <div className="flex flex-col items-center justify-center rounded-t-3xl px-3 md:px-4 pb-3 md:pb-5 pt-4 md:pt-6 text-white">
        <div className="w-full">
          <div className="text-center text-white">
            <p className="mb-2 text-base md:text-xl font-semibold tracking-wide drop-shadow">
              {currentPhase > 0 ? `PHASE ${currentPhase}` : "STAGE 1"}
            </p>

            {/* Progress */}
            <div className="mt-2 md:mt-3 w-full">
              <div className="mb-1 md:mb-2 flex items-center justify-between px-1">
                <span className="text-[9px] md:text-[11px] font-medium uppercase tracking-wide text-white/70">
                  Until price increases
                </span>
                <span className="text-[10px] md:text-[12px] font-semibold text-white">
                  {soldPercentage.toFixed(1)}%
                </span>
              </div>

              <div
                className="relative h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(soldPercentage)}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${soldPercentage}%`,
                    background:
                      "linear-gradient(90deg, #1DDAFF 0%, #6b7cff 50%, #EA1AF7 100%)",
                  }}
                />
                {/* shimmer overlay */}
                <div className="progress-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 opacity-50" />
              </div>

              <div className="mt-1 md:mt-2 text-center text-[10px] md:text-xs text-white/75">
                {fmt(totalTokensSold)} {toToken?.symbol ?? "TOKEN"} /{" "}
                {fmt(totalTokensForSale)} {toToken?.symbol ?? "TOKEN"}
              </div>
            </div>
          </div>
        </div>

        {isConnected && (
          <div className="glass-chip mb-1 mt-2 md:mt-3 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-center text-xs md:text-sm font-semibold uppercase tracking-wider">
            <span>Purchased Shibax = {lockedToken}</span>
            <img
              src="/img/info-icon.svg"
              alt="info-icon"
              className="h-4 w-4 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
              onClick={() =>
                MySwal.fire({
                  iconHtml:
                    '<img src="/img/info.svg" alt="info" class="h-[80px] w-full">',
                  text: "Your total purchased tokens are all tokens purchased using the connected wallet. This includes all staked and unstaked tokens.",
                })
              }
            />
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={submit} className="px-3 md:px-4 pb-3 md:pb-5 pt-1">
        <p className="relative mb-2 md:mb-3 w-full text-center text-xs md:text-sm font-bold tracking-wider text-white">
          <span className="inline-block px-3">
            1 {toToken?.symbol ?? "Shibax"} = ${currentShibaxPrice.toFixed(6)} USD
          </span>
          <span className="separator-line before" />
          <span className="separator-line after" />
        </p>

        {saleStatus && (
          <>
            {/* Token selector */}
            <div className="grid grid-cols-3 gap-1.5 md:gap-2">
              {tokens[chain.id].map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  className={`token-pill group ${
                    fromToken.symbol === token.symbol
                      ? "token-pill--active"
                      : ""
                  }`}
                  onClick={() => setFromToken(token)}
                >
                  <img
                    src={token.image}
                    alt={token.symbol}
                    className="h-[20px] w-[20px] md:h-[26px] md:w-[26px] object-contain transition-transform group-hover:scale-105"
                  />
                  <span className="text-xs md:text-sm font-bold">{token.symbol}</span>
                </button>
              ))}
              <button
                type="button"
                className="token-pill"
                onClick={() => setIsBuyWithCardModalOpen(true)}
              >
                <img
                  src={"/img/card.svg"}
                  alt={"card"}
                  className="h-[20px] w-[20px] md:h-[26px] md:w-[26px] object-contain"
                />
                <span className="text-xs md:text-sm font-bold">CARD</span>
              </button>
            </div>

            <div className="mb-2 mt-4 md:mt-6">
              {isConnected && (
                <div className="pb-1 md:pb-2 text-center">
                  <p className="relative mx-2 text-center text-xs md:text-sm font-semibold tracking-[1.5px] text-white">
                    {`${fromToken.symbol} balance ${formatNumber(
                      balances[fromToken.symbol]
                    )}`}
                  </p>
                </div>
              )}

              {/* Inputs */}
              <div className="mt-2">
                <div className="my-2 grid gap-4 lg:grid-cols-2">
                  {/* From */}
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="truncate text-[10px] md:text-xs tracking-[1px] text-white/90">
                        {fromToken.symbol} {t("you-pay")}
                      </label>
                      <span
                        className="cursor-pointer text-[10px] md:text-xs font-bold text-white/90 underline-offset-4 hover:underline"
                        onClick={() => setBalance()}
                      >
                        Max
                      </span>
                    </div>
                    <div className="relative flex items-start">
                      <input
                        className={`neumorph-input ${
                          insufficientBalance ? "danger" : ""
                        }`}
                        type="number"
                        min={0}
                        step={0.00001}
                        placeholder="0"
                        value={fromValue}
                        onChange={fromValueChange}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <img
                          src={fromToken.image}
                          alt={fromToken.name}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* To */}
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="truncate text-[10px] md:text-xs tracking-[1px] text-white/90">
                        {toToken.symbol} {t("you-receive")}
                      </label>
                    </div>
                    <div className="relative flex items-start">
                      <input
                        className={`neumorph-input ${
                          insufficientBalance ? "danger" : ""
                        }`}
                        type="number"
                        min={0}
                        step={0.00001}
                        placeholder="0"
                        value={toValue}
                        onChange={toValueChange}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <img
                          src={toToken.image}
                          alt={toToken.name}
                          className="h-8 w-8 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Indicator */}
              {(fromToken.symbol === "BNB" || fromToken.symbol === "ETH") && (
                <div className="mt-2">
                  <PriceIndicator
                    tokenSymbol={fromToken.symbol}
                    price={
                      fromToken.symbol === "BNB"
                        ? (prices?.bnb ?? null)
                        : fromToken.symbol === "ETH"
                        ? (prices?.eth ?? null)
                        : null
                    }
                    updateInterval={30000}
                  />
                </div>
              )}

              {/* Native gas warning */}
              {isConnected && balances[chain.nativeCurrency.symbol] == 0 ? (
                <div className="text-center text-xs">
                  <p className="m-2 leading-5 text-amber-300">
                    You do not have enough {chain?.nativeCurrency.symbol} to pay
                    for this transaction.
                  </p>
                </div>
              ) : null}

              {/* CTA row */}
              <div className="my-2">
                <div className="flex flex-col md:grid md:grid-cols-2 items-stretch md:items-center gap-2 py-2">
                  <button
                    className="btn-primary btn-sheen w-full md:w-auto text-xs md:text-sm whitespace-nowrap"
                    disabled={
                      isConnected &&
                      (!fromValue ||
                        loading ||
                        insufficientBalance ||
                        !saleStatus)
                    }
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(92deg,#1DDAFF 1.73%,#EA1AF7 99.52%)",
                    }}
                  >
                    {buttonTitle}
                  </button>
                  <SwitchNetworkButton />
                </div>
              </div>
            </div>
          </>
        )}
      </form>

      {isBuyWithCardModalOpen && (
        <BuyWithCardModal
          closeModal={() => setIsBuyWithCardModalOpen(false)}
        />
      )}

      {isConnected && address && (
        <div className="border-t border-white/10 px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs text-white/60">Connected Wallet</span>
            <button
              type="button"
              onClick={() => appKit.open({ view: "Account" })}
              className="group flex items-center gap-1.5 md:gap-2 rounded-lg bg-white/5 px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              <span className="font-mono text-[10px] md:text-sm">{shortenAddress(address)}</span>
              <svg
                className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyForm;
