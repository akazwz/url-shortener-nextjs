import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

import { DashboardLayout } from '../../src/components/dashboard/layout'
import { supabase } from '../../utils/supabaseClient'
import { OverviewProps, Overview, MostViewedLinks } from '../../src/components/dashboard'
import { LinkProps } from './links'
import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { VisitsPoint } from '../../src/components/dashboard/Map'

const MyMap = dynamic(() => import('../../src/components/dashboard/Map'), {
	ssr: false,
})

const DashboardIndex = () => {
	const [points, setPoints] = useState<VisitsPoint[]>([])
	const [overview, setOverview] = useState<OverviewProps>({
		links_count: 0,
		visits_count: 0,
		pc_visits_count: 0,
		mobile_visits_count: 0,
		loading: true,
	})

	const [links, setLinks] = useState<LinkProps[]>([])

	useEffect(() => {
		const setOverViewData = () => {
			axios.get('/api/overview', {
				headers: {
					authorization: supabase.auth.session()?.access_token || ''
				}
			})
				.then((res) => {
					const { data } = res.data
					setOverview(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
		setOverViewData()

		const setMostViewedLinks = () => {
			axios.get('/api/links', {
				params: { sort_by: 'visits_count' },
				headers: {
					authorization: supabase.auth.session()?.access_token || ''
				}
			})
				.then((res) => {
					const { data } = res.data
					const { links } = data
					const linksTemp: LinkProps[] = []
					links.slice(0, 5).map((link: any) => {
						const { count } = link.visits[0]
						linksTemp.push({
							id: link.id,
							createdAt: link.created_at,
							updatedAt: link.updated_at,
							url: link.url,
							shortId: link.short_id,
							visitCount: count,
						})
					})
					setLinks(linksTemp)
				})
				.catch((err) => {
					console.log(err)
				})
		}

		setMostViewedLinks()
	}, [])

	return (
		<DashboardLayout>
			<Overview overviewProps={overview} />
			<Stack
				mt={6}
				mb={6}
				ml={3}
				mr={3}
				spacing={3}
				direction={{ base: 'column', md: 'row' }}
			>
				<MostViewedLinks links={links} />
				<Box
					w="100%"
					rounded="lg"
					boxShadow="md"
					overflow="hidden"
				>
					<MyMap points={points} />
				</Box>
			</Stack>
		</DashboardLayout>
	)
}

export default DashboardIndex