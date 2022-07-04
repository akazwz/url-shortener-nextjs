import { HStack, SimpleGrid, Stat, StatLabel, StatNumber, } from '@chakra-ui/react'
import { Link, Click, Computer, Phone } from '@icon-park/react'

import { DashboardLayout } from '../../src/components/dashboard/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { supabase } from '../../utils/supabaseClient'

interface OverviewProps{
	links_count: number
	visits_count: number
	pc_visits_count: number
	mobile_visits_count: number
}

const Overview = ({ overviewProps }: { overviewProps: OverviewProps }) => {
	return (
		<SimpleGrid
			columns={{ base: 1, md: 2, lg: 4 }}
			gap={6}
			m={3}
		>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Links</StatLabel>
					<StatNumber>{overviewProps.links_count}</StatNumber>
				</Stat>
				<Link size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Visits</StatLabel>
					<StatNumber>{overviewProps.visits_count}</StatNumber>
				</Stat>
				<Click size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>PC Visits</StatLabel>
					<StatNumber>{overviewProps.pc_visits_count}</StatNumber>
				</Stat>
				<Computer size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Mobile Visits</StatLabel>
					<StatNumber>{overviewProps.mobile_visits_count}</StatNumber>
				</Stat>
				<Phone size={37} />
			</HStack>
		</SimpleGrid>
	)
}

const DashboardIndex = () => {
	const [overview, setOverview] = useState<OverviewProps>({
		links_count: 0,
		visits_count: 0,
		pc_visits_count: 0,
		mobile_visits_count: 0
	})
	useEffect(() => {
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
	}, [])

	return (
		<DashboardLayout>
			<Overview overviewProps={overview} />
		</DashboardLayout>
	)
}

export default DashboardIndex