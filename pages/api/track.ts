import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

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
	const { geo } = req.body

	const { data } = await supabase
		.from('geo')
		.insert(geo, {
			returning: 'minimal'
		})

	console.log(data)

	res.status(201).json({
		success: true,
	})
}

export default handle