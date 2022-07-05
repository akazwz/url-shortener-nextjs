import { Heading, HStack, SimpleGrid, Skeleton, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { Click, Computer, Link, Phone } from '@icon-park/react'

export interface OverviewProps{
	loading: boolean
	links_count: number
	visits_count: number
	pc_visits_count: number
	mobile_visits_count: number
}

export const Overview = ({ overviewProps }: { overviewProps: OverviewProps }) => {
	const Loading = () => {
		return (<Skeleton w={'50px'} h={'30px'} />)
	}
	return (
		<SimpleGrid
			columns={{ base: 1, md: 2, lg: 4 }}
			gap={6}
			m={3}
		>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Links</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.links_count}</StatNumber>
				</Stat>
				<Link size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.visits_count}</StatNumber>
				</Stat>
				<Click size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>PC Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.pc_visits_count}</StatNumber>
				</Stat>
				<Computer size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Mobile Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.mobile_visits_count}</StatNumber>
				</Stat>
				<Phone size={37} />
			</HStack>
		</SimpleGrid>
	)
}

export const MostViewedLinks = () => {
	return (
		<>
			<Heading>
				Most Viewed Links
			</Heading>
		</>
	)
}