import {
	Heading,
	HStack,
	Image,
	SimpleGrid,
	Skeleton,
	Stat,
	StatLabel,
	StatNumber,
	Text,
	VStack
} from '@chakra-ui/react'
import { Click, Computer, Link, Phone, PreviewOpen } from '@icon-park/react'
import { LinkProps } from '../../../pages/dashboard/links'
import { NextChakraLink } from '../NextChakraLink'

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
			<HStack padding={7} bg={'blue.500'} rounded={'lg'} boxShadow={'md'}>
				<Stat>
					<StatLabel>Total Links</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.links_count}</StatNumber>
				</Stat>
				<Link size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'} boxShadow={'md'}>
				<Stat>
					<StatLabel>Total Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.visits_count}</StatNumber>
				</Stat>
				<Click size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'} boxShadow={'md'}>
				<Stat>
					<StatLabel>PC Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.pc_visits_count}</StatNumber>
				</Stat>
				<Computer size={37} />
			</HStack>
			<HStack padding={7} bg={'blue.500'} rounded={'lg'} boxShadow={'md'}>
				<Stat>
					<StatLabel>Mobile Visits</StatLabel>
					<StatNumber>{overviewProps.loading ? <Loading /> : overviewProps.mobile_visits_count}</StatNumber>
				</Stat>
				<Phone size={37} />
			</HStack>
		</SimpleGrid>
	)
}

interface MostViewedLinksProps{
	links: LinkProps[]
}

const Links = ({ links }: { links: LinkProps[] }) => {
	const list = links?.map((link) => {
		return (
			<HStack
				key={link.id}
				borderStyle={'dashed'}
				borderWidth={2}
				p={3}
				m={1}
				justifyContent={'space-between'}
			>
				<HStack>
					<Image
						boxSize="30px"
						objectFit="cover"
						src={`${link.url}/favicon.ico`}
						alt={'favicon'}
						fallback={<Skeleton width={'30px'} height={'30px'} />}
					/>
				</HStack>
				<HStack spacing={7}>
					<NextChakraLink
						href={'http://localhost:3000/' + link.shortId}
						color={'blue.500'}
					>
						{link.shortId}
					</NextChakraLink>
				</HStack>
				<HStack>
					<HStack>
						<PreviewOpen theme="outline" size="14" />
						<Text>{link.visitCount}</Text>
					</HStack>
				</HStack>
			</HStack>
		)
	})
	return <>{list}</>
}

export const MostViewedLinks = ({ links }: MostViewedLinksProps) => {
	return (
		<VStack
			h={'45vh'}
			spacing={3}
			rounded={'lg'}
			boxShadow={'md'}
			w={{ base: '100%', md: '300px' }}
		>
			<Heading>
				Top 5 Links
			</Heading>
			{
				links.length < 1
					? (
						<VStack spacing={5}>
							<Skeleton width={'200px'} height={'50px'} />
							<Skeleton width={'200px'} height={'50px'} />
							<Skeleton width={'200px'} height={'50px'} />
							<Skeleton width={'200px'} height={'50px'} />
							<Skeleton width={'200px'} height={'50px'} />
						</VStack>
					)
					: <Links links={links} />
			}
		</VStack>
	)
}