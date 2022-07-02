import React, { useState } from 'react'
import {
	Stack,
	Heading,
	VStack,
	FormControl,
	Input,
	FormLabel,
	Button,
	HStack,
	Text,
	Box,
	useToast,
	useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Github } from '@icon-park/react'

import { NextChakraLink } from '../src/components/NextChakraLink'
import { Logo } from '../src/components/Logo'

import type { NextPage, GetStaticProps } from 'next'
import { supabase } from '../utils/supabaseClient'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['login'])),
		},
	}
}

const Login: NextPage = () => {
	const [email, setEmail] = useState<string>('')
	const [loading, setLoading] = useState(false)

	const toast = useToast()
	const router = useRouter()
	const { t } = useTranslation('login')

	const bgColor = useColorModeValue('gray.100', 'blackAlpha.300')

	const handleLogin = async() => {
		try {
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			alert('check your email for the login link')
		} catch (err: any) {
			alert(err.message)
		} finally {
			setLoading(false)
		}
	}

	const handleLoginByGithub = async() => {
		try {
			setLoading(true)
			const { error } = await
				supabase.auth.signIn({
					provider: 'github'
				})
			if (error) throw error
		} catch (err: any) {
			alert(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Stack p={3}>
			<VStack p={{ md: 10 }} align={'center'} justify={'center'}>
				<Box as={NextChakraLink} href={'/'} mb={7}>
					<Logo size={'48px'} />
				</Box>
				<Stack
					spacing={4}
					w={'full'}
					maxW={'md'}
					p={{ base: 5, md: 10 }}
					bg={bgColor}
					rounded={'lg'}
				>
					<Heading size={'lg'} textAlign={'center'}>
						{t('login')}
					</Heading>
					<FormControl id="email">
						<FormLabel>{t('email')}</FormLabel>
						<Input
							type="email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</FormControl>

					<Stack spacing={6}>
						<Stack
							direction={{ base: 'column', sm: 'row' }}
							align={'start'}
							justify={'space-between'}
						>
							<NextChakraLink href={'/password_reset'} color={'blue.500'}>
								{t('forgetPassword')}
							</NextChakraLink>
						</Stack>
						<Button
							colorScheme={'teal'}
							variant={'solid'}
							isLoading={loading}
							onClick={handleLogin}
						>
							{t('login')}
						</Button>
						<HStack spacing="1" justify="center">
							<Text>{t('account')}</Text>
							<NextChakraLink href={'/signup'} color={'blue.500'}>
								{t('signup')}
							</NextChakraLink>
						</HStack>
					</Stack>
					<Button
						colorScheme={'blue'}
						onClick={handleLoginByGithub}
						rightIcon={<Github />}
					>
						Sign In By Github
					</Button>
				</Stack>
			</VStack>
		</Stack>
	)
}

export default Login