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

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from '@supabase/supabase-js'

import { supabase } from '../../utils/supabaseClient'

export const UserMenu = () => {
	const bgColor = useColorModeValue('white', 'black')

	// for server-side and client side not same
	const [user, setUser] = useState<User | null>(null)

	const router = useRouter()

	useEffect(() => {
		const u = supabase.auth.user()
		setUser(u)
		if (!u) {
			router.push('/login').then()
		}
	}, [router, user])

	return (
		<Box>
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
		</Box>
	)
}
