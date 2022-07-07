import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET':
			return await handleGetOverview(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleGetOverview = async(req: NextApiRequest, res: NextApiResponse) => {
	const { user, error } = await supabase.auth.api.getUser(req.headers.authorization || '')
	if (error) {
		return res.status(401).json({
			success: false,
		})
	}
	const { data } = await supabase
		.from('links')
		.select('id')
		.eq('uid', user?.id)

	const links_count = data?.length || 0

	const ids: any[] = []

	data?.map((link) => {
		ids.push(link.id)
	})

	const { data: visits } = await supabase
		.from('visits')
		.select(`id, latitude, longitude`,)
		.in('link_id', ids)
		.neq('ip', null)
		.neq('latitude', null)
		.neq('longitude', null)

	const { count: visits_count } = await supabase
		.from('visits')
		.select('id', { count: 'exact', head: true })
		.in('link_id', ids)

	const pcOsNameList = ['Windows', 'Mac']
	const { count: pc_visits_count } = await supabase
		.from('visits')
		.select('id', { count: 'exact', head: true })
		.in('link_id', ids)
		.in('os_name', pcOsNameList)

	const mobileOsNameList = ['Android', 'IOS']
	const { count: mobile_visits_count } = await supabase
		.from('visits')
		.select('id', { count: 'exact', head: true })
		.in('link_id', ids)
		.in('os_name', mobileOsNameList)

	return res.status(200).json({
		success: true,
		data: {
			links_count,
			visits_count,
			visits,
			pc_visits_count,
			mobile_visits_count,
		}
	})
}

export default handle