import { HStack, SimpleGrid, Stat, StatLabel, StatNumber, } from '@chakra-ui/react'
import { Link, Click, Computer, Phone } from '@icon-park/react'

import { DashboardLayout } from '../../src/components/dashboard/layout'

const Overview = () => {
	return (
		<SimpleGrid
			columns={{ base: 1, md: 2, lg: 4 }}
			gap={6}
			m={3}
		>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Links</StatLabel>
					<StatNumber>37</StatNumber>
				</Stat>
				<Link size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Total Visits</StatLabel>
					<StatNumber>539</StatNumber>
				</Stat>
				<Click size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>PC Visits</StatLabel>
					<StatNumber>39</StatNumber>
				</Stat>
				<Computer size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'}>
				<Stat>
					<StatLabel>Mobile Visits</StatLabel>
					<StatNumber>500</StatNumber>
				</Stat>
				<Phone size={37} />
			</HStack>
		</SimpleGrid>
	)
}

const DashboardIndex = () => {
	return (
		<DashboardLayout>
			<Overview />
		</DashboardLayout>
	)
}

export default DashboardIndex