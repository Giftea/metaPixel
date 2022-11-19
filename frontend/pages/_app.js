import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { midnightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { AuthProvider } from "../context/AuthProvider";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: "https://rpc-mumbai.matic.today",
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Pixeed",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default MyApp;
