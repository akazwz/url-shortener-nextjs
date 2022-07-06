import {
	Box,
	Flex,
	Text,
	HStack,
	Spacer,
	Divider,
	BoxProps,
	useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import IconPark from '@icon-park/react/lib/all'

import { Logo } from '../../Logo'
import { LanguagesSwitch } from '../../LanguagesSwitch'
import { ColorModeToggle } from '../../ColorModeToggle'
import { FileSuccess } from '@icon-park/react'

interface SidebarProps extends BoxProps{
	onClose: () => void;
	mini: boolean
	setMini: (mini: boolean) => void
}

interface LinkProps{
	name: string;
	route: string;
	icon: string;
}

interface NavLinksProps{
	mini: boolean
}

interface SidebarFooterProps{
	mini: boolean
	setMini: (mini: boolean) => void
}

export const NavLinks = ({ mini }: NavLinksProps) => {
	const bg = useColorModeValue('gray.300', 'rgba(132,133,141,0.24)')
	const hoverBg = useColorModeValue('gray.200', 'rgba(132,133,141,0.12)')

	const { pathname, push } = useRouter()

	const LinkList: LinkProps[] = [
		{ name: 'Dashboard', route: '/dashboard', icon: 'FileSuccess' },
		{ name: 'Links', route: '/dashboard/links', icon: 'Picture' },
		{ name: 'Visits', route: '/dashboard/visits', icon: 'Like' },
		{ name: 'Analysis', route: '/dashboard/analysis', icon: 'Strongbox' },
	]

	return (
		<Box mt={3} p={1}>
			{LinkList.map((link) => (
				<Flex
					key={link.route}
					w={mini ? '60px' : '216px'}
					alignItems="center"
					h="44px"
					p="12px"
					mx={'auto'}
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
					<Box>
						{
							mini
								? <IconPark type={link.icon} size="23px" />
								: <Text fontSize="14px">{link.name}</Text>
						}
					</Box>
				</Flex>
			))}
		</Box>
	)
}

export const SidebarFooter = ({ mini, setMini }: SidebarFooterProps) => {
	const MiniControl = () => {
		return (
			<IconPark type={'Left'} size={'24px'} onClick={() => setMini(true)} />
		)
	}

	const MaxControl = () => {
		return (
			<IconPark type={'Right'} size={'24px'} onClick={() => setMini(false)} />
		)
	}

	return (
		<HStack p="24px" spacing="16px" h="75px" whiteSpace="nowrap" fontSize="sm">
			{
				mini
					? <MaxControl />
					: (
						<>
							<LanguagesSwitch />
							<ColorModeToggle />
							<MiniControl />
						</>
					)
			}
			{/*<Text>{`Made With ❤ By`}</Text>
			<NextChakraLink href="https://github.com/akazwz" isExternal>AKAZWZ</NextChakraLink>*/}
		</HStack>
	)
}

export const Sidebar = ({ onClose, mini, setMini, ...rest }: SidebarProps) => {
	return (
		<Box
			w={{ base: 'full', md: mini ? 20 : 60 }}
			pos="fixed"
			h={'full'}
			borderRightWidth={1}
			{...rest}
		>
			<Flex direction="column" h="full">
				<HStack justifyContent="center" height={'6vh'} borderBottomWidth={1}>
					<Logo size={'37px'} />
				</HStack>
				<NavLinks mini={mini} />
				<Spacer />
				<Divider />
				<SidebarFooter mini={mini} setMini={setMini} />
			</Flex>
		</Box>
	)
}
