import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'

import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { darkTheme } from '@rainbow-me/rainbowkit'

// import { AuthProvider } from "../context/AuthProvider";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    jsonRpcProvider({
      // rpc: (chain) => ({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_MUMBAI_RPC_URL as string,
      }),
    }),
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Pixeed',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <AuthProvider>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={darkTheme({
          accentColor: '#625DA0',
          borderRadius: 'large',
        })}
      >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
    /*  </AuthProvider>*/
  )
}

export default MyApp
