import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'

import theme from '../src/theme'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default appWithTranslation(MyApp)