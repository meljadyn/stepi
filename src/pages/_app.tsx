import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
// import theme from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </ChakraProvider>
  )
}
