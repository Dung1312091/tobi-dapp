import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "108fb42acd2ea6ecab66593e3e948204";

// 2. Create wagmiConfig
const metadata = {
  name: "Tobi Dapp",
  description: "Integration Dapp with Tobi Wallet",
  url: "http://localhost:5173/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [base] as const;
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  customWallets: [
    {
      id: "myCustomWallet",
      name: "Tobi Wallet",
      homepage: "https://telifi.xyz/",
      image_url: "https://telifi.xyz/_next/static/media/logo.b454c4f8.svg",
      desktop_link: "https://t.me/mpc_wallet_connect_bot/tobi_wallet",
    },
  ],
});

interface WalletProviderProps {}
export const WalletProvider: React.FunctionComponent<
  React.PropsWithChildren<WalletProviderProps>
> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
