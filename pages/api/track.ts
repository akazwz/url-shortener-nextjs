import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../utils/supabaseClient'
import { Visits } from '../../types'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			return await handleTrackShortId(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleTrackShortId = async(req: NextApiRequest, res: NextApiResponse) => {
	const { visits } = JSON.parse(req.body)
	// insert
	await supabase
		.from<Visits>('visits')
		.insert(visits, {
			returning: 'minimal'
		})

	return res.status(201).json({
		success: true,
	})
}

export default handle