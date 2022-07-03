import {
	Avatar,
	Box,
	VStack,
	Menu,
	MenuButton,
	MenuList,
	HStack,
	Divider,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../utils/supabaseClient'

export const UserMenu = () => {
	const bgColor = useColorModeValue('white', 'black')

	const router = useRouter()

	const user = supabase.auth.user()

	useEffect(() => {
		if (!user) {
			router.push('/login').then()
		}
	}, [router, user])

	return (
		<>
			<Menu>
				<MenuButton as={Box} variant={'ghost'}>
					<Avatar src={''} size="sm" />
				</MenuButton>
				<MenuList backgroundColor={bgColor}>
					<VStack justifyContent="center" p={3} spacing={3}>
						<HStack>
							<Text>{user?.email}</Text>
						</HStack>
						<Divider />
						<HStack>
							<Text>{user?.role}</Text>
						</HStack>
					</VStack>
				</MenuList>
			</Menu>
		</>
	)
}
