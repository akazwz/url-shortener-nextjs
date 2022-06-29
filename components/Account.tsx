import { useEffect, useState } from 'react'
import { Box, Button, FormLabel, Heading, Input } from '@chakra-ui/react'

import { supabase } from '../utils/supabaseClient'

import type { Session } from '@supabase/supabase-js'

interface AccountProps{
	session: Session
}

interface ProfileUpdateProps{
	username: string
	website: string
	avatar_url: string
}

export const Account = ({ session }: AccountProps) => {
	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState<string>('')
	const [website, setWebsite] = useState<string>('')
	const [avatar_url, setAvatarUrl] = useState<string>('')

	const getProfile = async() => {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const { data, error, status } = await supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user?.id)
				.single()

			if (error && status !== 406) {
				throw error
			}

			if (data) {
				setUsername(data.username)
				setWebsite(data.website)
				setAvatarUrl(data.avatar_url)
			}
		} catch (err: any) {
			alert(err.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getProfile().then()
	}, [session])

	const updateProfile = async({ username, website, avatar_url }: ProfileUpdateProps) => {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const updates = {
				id: user?.id,
				username,
				website,
				avatar_url,
			}

			const { error } = await supabase.from('profiles').upsert(updates, {
				returning: 'minimal',
			})

			if (error) {
				throw error
			}
		} catch (err: any) {
			alert(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Box>
				{
					loading
						? <Heading>Loading...</Heading>
						: (
							<Box>
								<Box>
									<FormLabel htmlFor="email">Email:</FormLabel>
									<Input id="email" value={session.user?.email} disabled />
								</Box>
								<Box>
									<FormLabel htmlFor="username">Username:</FormLabel>
									<Input
										id="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
									/>
								</Box>
								<Box>
									<FormLabel htmlFor="website">Website:</FormLabel>
									<Input
										id="website"
										type="website"
										value={website}
										onChange={(e) => setWebsite(e.target.value)}
									/>
								</Box>
								<Button
									isLoading={loading}
									isDisabled={loading}
									onClick={() => updateProfile({ username, website, avatar_url })}
								>
									Update
								</Button>
							</Box>
						)
				}
			</Box>
		</>
	)
}
