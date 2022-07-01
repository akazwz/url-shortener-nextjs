import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'

import theme from '../src/theme'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</RecoilRoot>
	)
}

export default appWithTranslation(MyApp)