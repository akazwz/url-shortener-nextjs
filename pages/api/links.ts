import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../utils/supabaseClient'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET':
			return await handleGetLinks(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleGetLinks = async(req: NextApiRequest, res: NextApiResponse) => {
	const { user, error } = await supabase.auth.api.getUser(req.headers.authorization || '')
	if (error) {
		return res.status(401).json({
			success: false,
		})
	}

	const { data: links } = await supabase
		.from('links')
		.select(`
		*,
		visits:short_id (
			count
		)
		`)
		.eq('uid', user?.id)

	const { sort_by } = req.query

	if (sort_by === 'visits_count') {
		/// sort links by visits count
		links?.sort((a, b) => {return b.visits[0].count - a.visits[0].count})
	}

	return res.status(200).json({
		success: true,
		data: {
			links,
		}
	})
}

export default handle