import config, { presaleStartTime } from "../config";
import { RootState } from "../store";
import { useSelector, useDispatch } from "react-redux";
import {
  setSaleStatus,
  setTokenPrice,
  setTotalTokensSold,
  setPhase,
  setPhasePrice,
} from "../store/presale";
import { useMemo, useState, useEffect, useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { setBalance } from "../store/wallet";
import Swal from "sweetalert2";

import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  getContract,
  http,
  parseUnits,
  zeroAddress,
} from "viem";
import { presaleAbi } from "../contracts/presaleABI";
import dayjs from "dayjs";
import useCurrentChain from "./useCurrentChain";
import { bsc } from "wagmi/chains";

const publicClients = config.chains.reduce((acc, chain) => {
  acc[chain.id] = createPublicClient({
    chain,
    batch: { multicall: true },
    transport: http(),
  });
  return acc;
}, {} as { [key: number]: ReturnType<typeof createPublicClient> });

const useWeb3Functions = () => {
  const chain = useCurrentChain();
  const [loading, setLoading] = useState(false);
  const tokens = useSelector((state: RootState) => state.presale.tokens);
  const dispatch = useDispatch();
  const { data: signer } = useWalletClient();
  const { address } = useAccount();

  const publicClient = useMemo(() => publicClients[chain.id], [chain.id]);

  const presaleContract = useMemo(() => {
    return getContract({
      address: config.presaleContract[chain.id],
      abi: presaleAbi,
      client: {
        public: publicClient,
        wallet: signer || undefined,
      },
    });
  }, [chain, publicClient, signer]);

  const fetchCurrentPhase = async () => {
    try {
      // Only fetch phase for BSC mainnet (where the updated contract with phases is deployed)
      if (chain.id !== bsc.id) return;
      
      const currentPhase = (await presaleContract.read.getCurrentPhase()) as bigint;
      dispatch(setPhase(Number(currentPhase)));
      
      // Fetch price for the current phase (getCurrentPrice returns price in USDT with 18 decimals)
      const phasePriceValue = (await presaleContract.read.getCurrentPrice()) as bigint;
      // Price is already in 18 decimals (USDT format), so we format it with 18 decimals
      const price = +formatUnits(phasePriceValue, 18);
      dispatch(setPhasePrice(price));
    } catch (error) {
      // If phase functions don't exist, silently fail (for backward compatibility)
      console.warn("Phase functions not available:", error);
    }
  };

  const fetchIntialData = async () => {
    setLoading(true);

    const [saleStatus] = await Promise.all([
      presaleContract.read.saleStatus(),
      fetchTotalTokensSold(),
      fetchTokenPrices(),
      fetchCurrentPhase(),
    ]) as [boolean, void, void, void];

    dispatch(setSaleStatus(saleStatus));

    setLoading(false);
  };

  const fetchTotalTokensSold = async () => {
    let extraAmount = 0;
    let incrase = 0;

    const totalTokensSold = (await Promise.all(
      config.chains.map((chain) =>
        publicClients[chain.id].readContract({
          address: config.presaleContract[chain.id],
          abi: presaleAbi,
          functionName: "totalTokensSold",
        })
      )
    )) as bigint[];

    try {
      const resposne = await fetch("/settings.json");
      const settings = await resposne.json();
      extraAmount = settings?.x;
      incrase = settings?.y;
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const amount = +format(totalTokensSold.reduce((a, b) => a + b, 0n)) || 0;
    const m = dayjs().diff(dayjs.unix(presaleStartTime), "minute");

    const ext = amount + incrase * Math.floor(m / 10);
    let total = (amount < ext ? ext : amount) + extraAmount;
    total = total > config.stage.total ? config.stage.total : total;
    dispatch(setTotalTokensSold(total));
  };

  const fetchLockedBalance = async () => {
    if (!address) return;

    const { symbol, decimals } = config.saleToken[chain.id];
    const buyerAmount = (await presaleContract.read.buyersDetails([address])) as [bigint, boolean];
    const balance = +formatUnits(buyerAmount[0], decimals);

    dispatch(setBalance({ symbol: symbol, balance }));
  };

  const fetchTokenBalances = async () => {
    if (!address) return;

    const balancses = await Promise.all(
      tokens[chain.id].map((token) => {
        if (token.address) {
          return publicClient.readContract({
            address: token.address,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          });
        } else {
          return publicClient.getBalance({ address });
        }
      })
    );

    tokens[chain.id].forEach((token, index) => {
      dispatch(
        setBalance({
          symbol: token.symbol,
          balance: +formatUnits(balancses[index], token.decimals),
        })
      );
    });
  };

  const fetchTokenPrices = async () => {
    const pricses = (await Promise.all(
      tokens[chain.id].map((token) => {
        if (token.address) {
          return presaleContract.read.tokenPrices([token.address]);
        } else {
          return presaleContract.read.rate();
        }
      })
    )) as bigint[];

    tokens[chain.id].forEach((token, index) => {
      // Contract stores all prices in 18 decimals (USDT format)
      // So we always format with 18 decimals, not token.decimals
      dispatch(
        setTokenPrice({
          symbol: token.symbol,
          price: +formatUnits(pricses[index], 18),
        })
      );
    });
  };

  const checkAllowance = async (
    token: Token,
    owner: Address,
    spender: Address,
    amount: bigint
  ) => {
    if (!token.address || !signer || !address) return;

    const tokenContract = getContract({
      address: token.address,
      abi: erc20Abi,
      client: {
        public: publicClient,
        wallet: signer,
      },
    });
    const allowance = await tokenContract.read.allowance([owner, spender]);

    if (allowance < amount) {
      const hash = await tokenContract.write.approve([
        spender,
        parseUnits("9999999999999999999999999999", 18),
      ]);
      await publicClient.waitForTransactionReceipt({ hash });
      Swal.fire({
        icon: "success",
        title: "Approval Successful",
        text: "Spend approved",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const buyToken = async (value: string | number, token: Token) => {
    let success = false;
    let hash;

    if (!signer || !address) return { success, txHash: hash };

    setLoading(true);

    try {
      const amount = parseUnits(`${value}`, token.decimals);

      if (token.address) {
        await checkAllowance(
          token,
          address,
          config.presaleContract[chain.id],
          amount
        );
      }

      // Use buyToken function for BSC mainnet
      const { request } = await presaleContract.simulate.buyToken(
        [token.address || zeroAddress, amount],
        { account: address, value: token.address ? 0n : amount }
      );

      hash = await signer.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      // const purchased_amount = token.address
      //   ? await presaleContract.read.getTokenAmount([token.address, amount])
      //   : await presaleContract.read.getTokenAmount([zeroAddress, amount]);

      // storeTransaction({
      //   wallet_address: address,
      //   purchased_amount: +format(purchased_amount),
      //   paid_amount: value,
      //   transaction_hash: hash,
      //   paid_with: token.symbol,
      //   chain: chain.id,
      // });

      // storeReferralTransaction({
      //   purchased_amount: +format(purchased_amount),
      //   paid: value,
      //   transaction_hash: hash,
      //   payable_token: token.symbol,
      //   chain: currentChain.id,
      // });

      // Update state first
      await Promise.all([
        fetchTokenBalances(),
        fetchLockedBalance(),
        fetchTotalTokensSold(),
        fetchCurrentPhase(),
      ]);

      // Ensure tokenSymbol is always a string
      const tokenSymbol = config.saleToken[chain.id]?.symbol || "Tokens";
      const successMessage = "You have successfully purchased " + String(tokenSymbol) + " Tokens. Thank you!";
      
      // Use SweetAlert2 instead of react-toastify to avoid React 19 compatibility issues
      try {
        Swal.fire({
          icon: "success",
          title: "Purchase Successful!",
          text: successMessage,
          timer: 5000,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Notification error:", error);
        console.log(successMessage);
      }

      success = true;
    } catch (error: any) {
      const errorMessage = 
        error?.walk?.()?.shortMessage ||
        error?.walk?.()?.message ||
        error?.message ||
        "Signing failed, please try again!";
      
      // Use SweetAlert2 instead of react-toastify to avoid React 19 compatibility issues
      try {
        Swal.fire({
          icon: "error",
          title: "Transaction Failed",
          text: String(errorMessage),
          confirmButtonText: "OK",
        });
      } catch (swalError) {
        console.error("Notification error:", swalError);
        console.error("Transaction error:", errorMessage);
      }
    }

    setLoading(false);

    return { success, txHash: hash };
  };

  const addTokenAsset = async (token: Token) => {
    if (!token.address || !signer) return;
    try {
      await signer.watchAsset({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals ?? 18,
            image: token.image.includes("http")
              ? token.image
              : `${window.location.origin}${token.image}`,
          },
        },
      } as any);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Token imported to metamask successfully",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Token import failed",
        confirmButtonText: "OK",
      });
    }
  };

  const parse = (value: string | number) =>
    parseUnits(`${value}`, config.saleToken[chain.id].decimals);

  const format = (value: bigint) =>
    formatUnits(value, config.saleToken[chain.id].decimals);

  // Set up interval to periodically fetch phase and price updates
  useEffect(() => {
    // Only set up interval for BSC mainnet
    if (chain.id !== bsc.id) return;

    // Initial fetch
    fetchCurrentPhase();
    fetchTotalTokensSold();

    // Set up interval to fetch phase and price every 10 seconds
    // This ensures users see updated phase/price as tokens are sold
    const interval = setInterval(() => {
      fetchCurrentPhase();
      fetchTotalTokensSold(); // Also update total sold as it affects phase calculation
    }, 100000); // 10 seconds interval

    // Cleanup interval on unmount or chain change
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain.id]);

  return {
    loading,
    parse,
    format,
    buyToken,
    addTokenAsset,
    fetchIntialData,
    fetchLockedBalance,
    fetchTokenBalances,
  };
};

export default useWeb3Functions;
