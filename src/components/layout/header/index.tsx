import { Box, Button, HStack, Skeleton, Spacer, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Logo } from '../../Logo'
import { supabase } from '../../../../utils/supabaseClient'
import { NextChakraLink } from '../../NextChakraLink'

const AuthedLinks = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<NextChakraLink href={'/dashboard'}>
				{t('header.dashboard')}
			</NextChakraLink>
			<Button
				variant={'outline'}
				borderColor={useColorModeValue('black', 'white')}
				onClick={() => {
				}}
			>
				{t('header.signOut')}
			</Button>
		</>
	)
}

const LoadingLinks = () => {
	return (
		<>
			<Skeleton height={'25px'} width={'50px'} />
			<Skeleton height={'25px'} width={'50px'} />
		</>
	)
}

const NotAuthedLinks = () => {
	const { t } = useTranslation('common')
	return (
		<>
			<NextChakraLink href={'/login'}>{t('header.login')}</NextChakraLink>
			<NextChakraLink href={'/signup'}>
				<Button
					variant={'outline'}
					borderColor={useColorModeValue('black', 'white')}
				>
					{t('header.signup')}
				</Button>
			</NextChakraLink>
		</>
	)
}

export const Header = () => {
	const user = supabase.auth.user()
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
				{
					user ? <AuthedLinks /> : <NotAuthedLinks />
				}
			</HStack>
		</Box>
	)
}