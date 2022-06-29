import { useEffect, useState } from 'react'
import { Button, Center, Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../src/components/layout'

import { supabase } from '../utils/supabaseClient'

import type { Session } from '@supabase/supabase-js'
import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { Auth } from '../components/Auth'
import { Account } from '../components/Account'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation('common')

	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		setSession(supabase.auth.session())

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	const handleShort = () => {
		axios.post('/api/short', {
			url: 'https://baidu.com'
		}, {
			headers: {
				authorization: session?.access_token || ''
			},
			withCredentials: true,
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		}).finally(() => {

		})
	}

	return (
		<Layout>
			<Center>
				{
					!session ? <Auth /> : <Account key={session.user?.id} session={session} />
				}
			</Center>
			<Button onClick={handleShort}>
				Short
			</Button>
		</Layout>
	)
}

export default Home
