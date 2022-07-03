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
		.select('id', { count: 'exact', head: true })
		.eq('uid', user?.id)

	return res.status(200).json({
		success: true,
		data,
	})
}