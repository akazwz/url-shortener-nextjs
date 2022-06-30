import { useEffect, useState } from 'react'
import {
	Box,
	Button,
	Center,
	HStack,
	IconButton,
	Input, Spacer, Stack,
	useClipboard,
	useColorModeValue,
	useToast,
	VStack
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { Check, Copy, Lightning } from '@icon-park/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../src/components/layout'

import { supabase } from '../utils/supabaseClient'

import type { Session } from '@supabase/supabase-js'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Auth } from '../components/Auth'
import { Account } from '../components/Account'
import isUrl from 'is-url'
import { NextChakraLink } from '../src/components/NextChakraLink'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
	}
}

const Home: NextPage = () => {
	const [url, setUrl] = useState<string>('')
	const [shortUrl, setShortUrl] = useState('')
	const [isBtnLoading, setIsBtnLoading] = useState(false)

	const { hasCopied, onCopy } = useClipboard(shortUrl)

	const inputActiveBg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)')
	const bgColor = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)')

	const toast = useToast()
	const { t } = useTranslation('common')

	const handleShort = async() => {
		setIsBtnLoading(true)
		axios.post('/api/short', {
			url: url,
		}, {
			headers: {
				authorization: await supabase.auth.session()?.access_token || ''
			},
		}).then((res) => {
			const { data } = res.data
			const { short_url } = data
			setShortUrl(short_url)
		}).catch((err) => {
			console.log(err)
		}).finally(() => {
			setIsBtnLoading(false)
		})
	}

	return (
		<Layout>
			<VStack minH="30vh" padding={3} spacing={10} mt={'100px'}>
				<HStack
					spacing={0}
					borderWidth={1}
					rounded="lg"
					backgroundColor={bgColor}
					_focusWithin={{
						backgroundColor: inputActiveBg,
					}}
					_hover={{
						backgroundColor: inputActiveBg,
					}}
					width={{ base: '350px', md: '500px', lg: '700px' }}
				>
					<Input
						backgroundColor={'transparent'}
						rounded="lg"
						border={'none'}
						variant="filled"
						size={{ base: 'md', md: 'lg' }}
						onInput={(e) => setUrl(e.currentTarget.value)}
					/>
					<IconButton
						aria-label={'search'}
						icon={<Lightning />}
						variant="ghost"
						isDisabled={!isUrl(url)}
						onClick={handleShort}
						isLoading={isBtnLoading}
					/>
				</HStack>

				{shortUrl.length > 0 ? (
					<>
						<Box
							w={{ base: 'xs', sm: 'sm', md: 'md', lg: '3xl' }}
							p={{ base: 3, md: 7 }}
							rounded="lg"
							borderStyle="dotted"
							borderWidth="3px"
						>
							<Stack
								direction={{ base: 'column', md: 'row' }}
								alignItems="center"
								textAlign="center"
							>
								<NextChakraLink href={shortUrl} color="blue.500">
									{shortUrl}
								</NextChakraLink>
								<Spacer />
								<Button
									w={{ base: '3xs', md: '25%' }}
									p={3}
									onClick={onCopy}
									leftIcon={hasCopied ? <Check fill="#7ed321" /> : <Copy />}
								>
									{hasCopied ? t('copied') : t('copy')}
								</Button>
							</Stack>
						</Box>
					</>
				) : null}
			</VStack>
		</Layout>
	)
}

export default Home
