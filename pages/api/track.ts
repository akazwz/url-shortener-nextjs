import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

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
	const {} = req.body
	res.status(201).json({
		success: true,
	})
}

export default handle