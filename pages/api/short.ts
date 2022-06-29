import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import { nanoid } from 'nanoid'

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

	let ip = null
	const xForward = req.headers['x-forwarded-for']
	if (typeof xForward === 'string') {
		ip = xForward
	} else {
		if (xForward) {
			ip = xForward[0]
		}
	}

	const insets = {
		url,
		ip,
		short_id: nanoid(7),
	}

	return res.status(201).json({
		success: true,
		insets,
	})
}

export default handle