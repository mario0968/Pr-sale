import { useMemo } from "react";
import config from "../config";
import { useChainId } from "wagmi";

export default function useCurrentChain() {
  const chainId = useChainId();
  return useMemo(
    () => config.chains.find((item) => item.id == chainId) || config.chains[0],
    [chainId]
  );
}
