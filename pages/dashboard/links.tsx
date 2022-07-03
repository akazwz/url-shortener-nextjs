import { useEffect, useState } from 'react'
import {
	Divider,
	HStack,
	IconButton,
	Image,
	Skeleton,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Analysis, PreviewOpen } from '@icon-park/react'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import axios from 'axios'

import { DashboardLayout } from '../../src/components/dashboard/layout'
import { NextChakraLink } from '../../src/components/NextChakraLink'
import { supabase } from '../../utils/supabaseClient'

interface LinkProps{
	id: string;
	createdAt: Date;
	updatedAt: Date;
	url: string;
	shortId: string;
	visitCount: number;
}

const Links = ({ links }: { links: LinkProps[] }) => {
	const router = useRouter()
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
						boxSize="50px"
						objectFit="cover"
						src={`${link.url}/favicon.ico`}
						alt={'favicon'}
						fallback={<Skeleton width={'50px'} height={'50px'} />}
					/>
					<VStack spacing={0}>
						<Text fontSize={'sm'} fontWeight={'thin'}>
							{dayjs(link.createdAt).format('YYYY/MM/DD')}
						</Text>
						<Text fontSize={'sm'} fontWeight={'thin'}>
							{dayjs(link.createdAt).format('HH:ss')}
						</Text>
					</VStack>
				</HStack>
				<HStack spacing={7}>
					<NextChakraLink
						href={'http://localhost:5000/' + link.shortId}
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
					<Divider orientation={'vertical'} />
					<Divider orientation={'vertical'} />
					<HStack>
						<IconButton
							size={'sm'}
							aria-label={'analysis'}
							icon={<Analysis theme="outline" size="14" />}
							onClick={() => {
								router.push(`/dashboard/analysis/${link.id}`).then()
							}}
						/>
					</HStack>
				</HStack>
			</HStack>
		)
	})
	return <>{list}</>
}

const LinksSkeleton = () => {
	return (
		<VStack>
			<Skeleton width={'full'} height={'50px'} />
			<Skeleton width={'full'} height={'50px'} />
			<Skeleton width={'full'} height={'50px'} />
		</VStack>
	)
}

const LinksPage: NextPage = () => {
	const [links, setLinks] = useState<LinkProps[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		axios.get('/api/links', {
			headers: {
				authorization: supabase.auth.session()?.access_token || ''
			}
		})
			.then((res) => {
				const { data } = res.data
				const { links } = data
				const linksTemp: LinkProps[] = []
				links.map((link: any) => {
					const { count } = link.visits[0]
					console.log(count)
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
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<DashboardLayout>
			{
				loading ? < LinksSkeleton /> : <Links links={links} />
			}
		</DashboardLayout>
	)
}

export default LinksPage
