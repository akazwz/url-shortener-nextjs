import { Box, Button, HStack, Spacer, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Logo } from '../../Logo'
import { NextChakraLink } from '../../NextChakraLink'
import { useAuth } from '../../../hooks/useAuth'

const AuthedLinks = () => {
	const { t } = useTranslation('common')

	const { signOut } = useAuth()

	return (
		<HStack spacing={7}>
			<NextChakraLink href={'/dashboard'}>
				{t('header.dashboard')}
			</NextChakraLink>
			<Button
				variant={'outline'}
				borderColor={useColorModeValue('black', 'white')}
				onClick={signOut}
			>
				{t('header.signOut')}
			</Button>
		</HStack>
	)
}

const NotAuthedLinks = () => {
	const { t } = useTranslation('common')
	return (
		<HStack spacing={7}>
			<NextChakraLink href={'/login'}>{t('header.login')}</NextChakraLink>
			<NextChakraLink href={'/signup'}>
				<Button
					variant={'outline'}
					borderColor={useColorModeValue('black', 'white')}
				>
					{t('header.signup')}
				</Button>
			</NextChakraLink>
		</HStack>
	)
}

export const Header = () => {
	const { isAuth } = useAuth()

	const Links = () => {
		return (
			<>
				{
					isAuth ? <AuthedLinks /> : <NotAuthedLinks />
				}
			</>
		)
	}

	return (
		<Box
			as="header"
			mx="auto"
			maxW="7xl"
			py="3"
			px={{ base: '4', md: '8' }}
		>
			<HStack>
				<Logo size="37px" />
				<Spacer />
				<Links />
			</HStack>
		</Box>
	)
}