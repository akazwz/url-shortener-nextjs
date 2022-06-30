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
	const { visits } = req.body

	console.log(visits)

	const inserts:Visits = {
		browser_name: '',
		browser_version: '',
		city: '',
		country: '',
		cpu_architecture: '',
		device_model: '',
		device_type: '',
		device_vendor: '',
		engine_name: '',
		engine_version: '',
		ip: '',
		is_bot: false,
		latitude: '',
		link_id: '',
		os_name: '',
		os_version: '',
		region: '',
		short_id: '',
		ua: ''
	}

	const { data } = await supabase
		.from<Visits>('visits')
		.insert(inserts, {
			returning: 'minimal'
		})

	console.log(data)

	res.status(201).json({
		success: true,
	})
}

export default handle