import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react'

export const Auth = () => {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')

	const handleLogin = async(email: string) => {
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

	return (
		<VStack>
			<Heading>Supabase + Next.js</Heading>
			<Input
				type="email"
				placeholder="email"
				value={email}
				onChange={(event) => {
					setEmail(event.target.value)
				}}
			/>
			<Button
				isLoading={loading}
				isDisabled={loading}
				onClick={() => {
					handleLogin(email).then()
				}}
			>
				Send magic link
			</Button>
		</VStack>
	)
}