import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { midnightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";

const { chains, provider } = configureChains(
  [
    chain.polygonMumbai
    // chain.mainnet,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
  ],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "pixeed",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={midnightTheme({ accentColor: "#9932cc" })}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
