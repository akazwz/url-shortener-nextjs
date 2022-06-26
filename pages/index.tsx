import { Center, Heading } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../src/components/layout'

import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'

export const getStaticProps: GetStaticProps = async({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale || 'en', ['common'])),
		},
	}
}

const Home: NextPage = () => {
	const { t } = useTranslation('common')

	return (
		<Layout>
			<Center>
				<Heading>
					{t('home')}
				</Heading>
			</Center>
		</Layout>
	)
}

export default Home
