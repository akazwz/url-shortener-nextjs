import {
	Box,
	Flex,
	Text,
	HStack,
	Spacer,
	Divider,
	useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Logo } from '../../Logo'
import { LanguagesSwitch } from '../../LanguagesSwitch'
import { ColorModeToggle } from '../../ColorModeToggle'

import type { BoxProps } from '@chakra-ui/react'

interface SidebarProps extends BoxProps{
	onClose: () => void;
}

interface LinkProps{
	name: string;
	route: string;
	icon: string;
}

export const NavLinks = () => {
	const bg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)')
	const hoverBg = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)')

	const { pathname, push } = useRouter()

	const LinkList: LinkProps[] = [
		{ name: 'Links', route: '/dashboard/links', icon: '' },
		{ name: 'Visits', route: '/dashboard/visits', icon: '' },
		{ name: 'Analysis', route: '/dashboard/analysis', icon: '' },
	]

	return (
		<Box mt={3}>
			{LinkList.map((link) => (
				<Flex
					key={link.route}
					w="216px"
					alignItems="center"
					h="44px"
					p="12px"
					mx="12px"
					mb="5px"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					bg={link.route === pathname ? bg : 'transparent'}
					_hover={{
						bg: hoverBg,
					}}
					onClick={() => {
						push(link.route).then()
					}}
				>
					<Text fontSize="14px">{link.name}</Text>
				</Flex>
			))}
		</Box>
	)
}

export const SidebarFooter = () => {
	return (
		<HStack p="24px" spacing="16px" h="75px" whiteSpace="nowrap" fontSize="sm">
			<LanguagesSwitch />
			<ColorModeToggle />
			{/*<Text>{`Made With ❤ By`}</Text>
			<NextChakraLink href="https://github.com/akazwz" isExternal>AKAZWZ</NextChakraLink>*/}
		</HStack>
	)
}

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h={'full'}
			borderRightWidth={1}
			{...rest}
		>
			<Flex direction="column" h="full">
				<HStack justifyContent="center" height={'6vh'} borderBottomWidth={1}>
					<Logo size={'37px'} />
				</HStack>
				<NavLinks />
				<Spacer />
				<Divider />
				<SidebarFooter />
			</Flex>
		</Box>
	)
}
