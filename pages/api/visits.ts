import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../utils/supabaseClient'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			return await handleGetVisits(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleGetVisits = async(req: NextApiRequest, res: NextApiResponse) => {
	const { user } = await supabase.auth.api.getUser(req.headers.authorization || '')
	if (!user) {
		return res.status(401).json({
			success: false,
		})
	}
}

export default handle