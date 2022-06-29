import { useEffect, useState } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
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

	return (
		<Layout>
			<Center>
				{
					!session ? <Auth /> : <Account key={session.user?.id} session={session} />
				}
			</Center>
		</Layout>
	)
}

export default Home
