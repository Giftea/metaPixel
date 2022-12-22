import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { midnightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { AuthProvider } from "../context/AuthProvider";
import { ApolloProvider } from "@apollo/client";
import {client }from "../apollo-client";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const { chains, provider } = configureChains(
  [chain.polygonMumbai],

  [infuraProvider({ infuraId }), publicProvider()]
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
          <ApolloProvider client={client}>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </AuthProvider>
  );
}

export default MyApp;
