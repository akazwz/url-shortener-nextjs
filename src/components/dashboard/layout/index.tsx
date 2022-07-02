import { ReactNode } from 'react'
import {
	Box,
	VStack,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	HStack,
	useColorModeValue,
	useDisclosure,
	Drawer,
} from '@chakra-ui/react'

import { DashboardHeader } from './Header'
import { NavLinks, Sidebar } from './Sidebar'
import { LanguagesSwitch } from '../../LanguagesSwitch'
import { ColorModeToggle } from '../../ColorModeToggle'

interface IProps{
	children: ReactNode;
}

export const DashboardLayout = ({ children }: IProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const drawerBgColor = useColorModeValue('white', 'black')

	return (
		<Box minH="100vh">
			<Sidebar
				onClose={onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				size={'full'}
				placement={'left'}
			>
				<DrawerContent backgroundColor={drawerBgColor}>
					<DrawerHeader>
						<DrawerCloseButton />
					</DrawerHeader>
					<DrawerBody>
						<VStack>
							<HStack>
								<LanguagesSwitch />
								<ColorModeToggle />
							</HStack>
							<NavLinks />
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<DashboardHeader onOpen={onOpen} height={'6vh'} />
			<Box as="main" ml={{ base: 0, md: 60 }} p={3}>
				{children}
			</Box>
		</Box>
	)
}
