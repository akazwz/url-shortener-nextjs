import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import { nanoid } from 'nanoid'
import { supabase } from '../../utils/supabaseClient'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'POST':
			return await handleShortUrl(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleShortUrl = async(req: NextApiRequest, res: NextApiResponse) => {
	const { url } = req.body
	if (!isUrl(url)) {
		return res.status(400).json({
			success: false,
			msg: 'invalid url',
		})
	}

	const insets = {
		url,
		short_id: nanoid(7),
		ip: req.socket.remoteAddress
	}

	return res.status(201).json({
		success: true,
		insets,
	})
}

export default handle