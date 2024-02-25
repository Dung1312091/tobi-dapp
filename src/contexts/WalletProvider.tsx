import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { TobiSdk, topiHelper } from "../sdk/tobi";

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

const chains = [sepolia] as const;
const config = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
// const tobiSdk = new TobiSdk(config);
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
      // desktop_link: "http://localhost:3000/",
      // desktop_link: topiHelper.isDappRunningOnBrowser()
      //   ? "https://c03b-14-161-41-51.ngrok-free.app"
      //   : "",
      desktop_link: "https://tobi-wallet-connect-server.onrender.com",
    },
  ],
});

console.log("window.frameElement", window.frameElement);
// tobiSdk.initialize();

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
