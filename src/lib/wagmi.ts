import { Chain, bsc } from "wagmi/chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createAppKit } from "@reown/appkit";

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string;
if (!projectId) throw new Error("Missing VITE_REOWN_PROJECT_ID");

// Use only BSC mainnet for both local and production
export const chains = [bsc] as [Chain, ...Chain[]];

// Create the WagmiAdapter FIRST
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: chains,
});

// Export the wagmi config from the adapter
export const wagmiConfig = wagmiAdapter.wagmiConfig;

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: chains,
  metadata: {
    name: "Shibax Presale",
    description: "Shibax",
    url: "https://www.shibaxpresal.net/",
    icons: ["https://www.shibaxpresal.net/img/logo.png"],
  },
  features: {
    analytics: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-z-index": 9999,
  },
});
