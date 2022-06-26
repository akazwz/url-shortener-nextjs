import { Box, HStack, Spacer } from '@chakra-ui/react'

import { Logo } from '../../Logo'
import { ColorModeToggle } from '../../ColorModeToggle'

export const Header = () => {
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
			</HStack>
		</Box>
	)
}