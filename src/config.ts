import {
  bsc,
  bscTestnet,
  mainnet,
  polygon,
  arbitrum,
  avalanche,
  base,
  optimism,
  Chain,
  sepolia,
} from "viem/chains";

export const presaleStartTime = 1693432800;

export const chains = [bsc] as [Chain, ...Chain[]];

const config = {
  chains: chains,
  whitepaper: "",
  telegram: "https://t.me/",
  twitter: "https://twitter.com/",

  chainDetails: {
    [mainnet.id]: {
      name: "Ethereum",
      img: "/img/tokens/eth.svg",
    },
    [sepolia.id]: {
      name: "Ethereum",
      img: "/img/tokens/eth.svg",
    },
    [bsc.id]: {
      name: "BSC",
      img: "/img/tokens/bnb.svg",
    },
    [bscTestnet.id]: {
      name: "BSC Testnet",
      img: "/img/tokens/bnb.svg",
    },
    [polygon.id]: {
      name: "Polygon",
      img: "/img/tokens/polygon.svg",
    },
    [arbitrum.id]: {
      name: "Arbitrum",
      img: "/img/tokens/arbitrum.svg",
    },
    [avalanche.id]: {
      name: "Avalanche",
      img: "/img/tokens/avalanche.svg",
    },
    [base.id]: {
      name: "Base",
      img: "/img/tokens/base.svg",
    },
    [optimism.id]: {
      name: "Optimism",
      img: "/img/tokens/optimism.svg",
    },
  } as {
    [key: number]: {
      name: string;
      img: string;
    };
  },

  stage: {
    name: "Stage 1",
    total: 6000000000, // total sale amount
    endTime: 1788420751, // sale end time in unix timestamp
  },

  presaleContract: {
    // [mainnet.id]: "",
    [sepolia.id]: "0x4c4a8122494d09df395b924da313d3a81522b551",
    [bsc.id]: "0x76d63881008b2126C6c2058659037206fc2459c3",
    [polygon.id]: "0x876A87A48c91E054ad9656709784Ae13FA265FEB",
    [arbitrum.id]: "0x876A87A48c91E054ad9656709784Ae13FA265FEB",
    [avalanche.id]: "0x876A87A48c91E054ad9656709784Ae13FA265FEB",
    [base.id]: "0x876A87A48c91E054ad9656709784Ae13FA265FEB",
    [optimism.id]: "0x876A87A48c91E054ad9656709784Ae13FA265FEB",
    [bscTestnet.id]: "0x4c4a8122494d09df395b924da313d3a81522b551",
  } as { [key: number]: Address }, // presale contract address

  saleToken: {
    [mainnet.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [bsc.id]: {
      symbol: "SBX", // token symbol
      name: "Shibax", // token name
      image: "/img/token_img.jpeg", // token image
      decimals: 18, // token decimals
    },
    [bscTestnet.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [polygon.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [arbitrum.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [avalanche.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [base.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [optimism.id]: {
      symbol: "SQUISHY", // token symbol
      name: "Squishy", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
    [sepolia.id]: {
      symbol: "BLS", // token symbol
      name: "Block", // token name
      image: "/img/tokens/squishy.jpeg", // token image
      decimals: 18, // token decimals
    },
  } as { [key: number]: Token },

  displayPrice: {
    [mainnet.id]: "USDT",
    [bsc.id]: "USDT",
    [polygon.id]: "USDT",
    [arbitrum.id]: "USDT",
    [avalanche.id]: "USDT",
    [base.id]: "USDT",
    [optimism.id]: "USDT",
    [bscTestnet.id]: "USDT",
    [sepolia.id]: "USDT",
  } as { [key: number]: string },

  whitelistedTokens: {
    [mainnet.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Ethereum",
        image:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg",
        decimals: 18,
      },
      {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        symbol: "USDT",
        name: "Tether USD",
        image:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdt.svg",
        decimals: 6,
      },
      /* {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USDC",
        image: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg",
        decimals: 6,
      },
      {
        address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
        symbol: "BUSD",
        name: "BUSD",
        image: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg",
        decimals: 18,
      },*/
    ],
    [sepolia.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Ethereum",
        image:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/eth.svg",
        decimals: 18,
      },
      {
        address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
        symbol: "USDT",
        name: "Tether USD",
        image:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdt.svg",
        decimals: 6,
      },
      /* {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USDC",
        image: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg",
        decimals: 6,
      },
      {
        address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
        symbol: "BUSD",
        name: "BUSD",
        image: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/bnb.svg",
        decimals: 18,
      },*/
    ],
    [bsc.id]: [
      {
        address: null,
        symbol: "BNB",
        name: "Binance Coin",
        image: "/img/tokens/bnb.svg",
        decimals: 18,
      },
      {
        address: "0x55d398326f99059ff775485246999027b3197955",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 18,
      },
    ],
    [polygon.id]: [
      {
        address: null,
        symbol: "MATIC",
        name: "MATIC",
        image: "/img/tokens/polygon.svg",
        decimals: 18,
      },
      {
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 6,
      },
    ],
    [arbitrum.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "Arbitrum One",
        image: "/img/tokens/arbitrum.svg",
        decimals: 18,
      },
      {
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 6,
      },
    ],
    [avalanche.id]: [
      {
        address: null,
        symbol: "AVAX",
        name: "Avalanche",
        image: "/img/tokens/avalanche.svg",
        decimals: 18,
      },
      {
        address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 6,
      },
    ],
    [base.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "BASE",
        image: "/img/tokens/base.svg",
        decimals: 18,
      },
      {
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        symbol: "USDC",
        name: "USDC",
        image:
          "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg",
        decimals: 6,
      },
    ],
    [optimism.id]: [
      {
        address: null,
        symbol: "ETH",
        name: "OP Mainnet",
        image: "/img/tokens/optimism.svg",
        decimals: 18,
      },
      {
        address: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 6,
      },
    ],
    [bscTestnet.id]: [
      {
        address: null,
        symbol: "TBNB",
        name: "Test Binance Coin",
        image: "/img/tokens/bnb.svg",
        decimals: 18,
      },
      {
        address: "0x221c5B1a293aAc1187ED3a7D7d2d9aD7fE1F3FB0",
        symbol: "USDT",
        name: "Tether USD",
        image: "/img/tokens/usdt.svg",
        decimals: 18,
      },
    ],
  } as { [key: number]: Token[] },
};

export default config;
