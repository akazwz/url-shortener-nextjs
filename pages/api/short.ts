import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import isUrl from 'is-url'
import { nanoid } from 'nanoid'
import absoluteUrl from 'next-absolute-url'

import { supabase } from '../../utils/supabaseClient'
import { Links } from '../../types'

const handle: NextApiHandler = async(req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case 'GET':
			return await handleGetUrl(req, res)
		case 'POST':
			return await handleShortUrl(req, res)
		default:
			return res.status(405).json({
				success: false,
			})
	}
}

const handleGetUrl = async(req: NextApiRequest, res: NextApiResponse) => {
	const { short_id } = req.query

	const { data } = await supabase
		.from('links')
		.select('id,url')
		.eq('short_id', short_id)
		.single()

	if (!data) {
		return res.status(400).json({
			success: false,
		})
	}

	return res.status(200).json({
		success: true,
		data,
	})
}

const handleShortUrl = async(req: NextApiRequest, res: NextApiResponse) => {
	const { user } = await supabase.auth.api.getUser(req.headers.authorization || '')
	// uid default null
	const uid = user?.id

	const { url } = req.body
	if (!isUrl(url)) {
		return res.status(400).json({
			success: false,
			msg: 'invalid url',
		})
	}

	let ip = undefined
	const xForward = req.headers['x-forwarded-for']
	if (typeof xForward === 'string') {
		ip = xForward
	} else {
		if (xForward) {
			ip = xForward[0]
		}
	}

	const short_id = nanoid(7)
	const { origin } = absoluteUrl(req)
	const short_url = origin + '/' + short_id
	const insets = {
		url,
		ip,
		uid,
		short_id,
	}

	const { error } = await supabase
		.from<Links>('links')
		.insert(insets, {
			returning: 'minimal',
		})

	if (error) {
		return res.status(400).json({
			success: false,
		})
	}

	return res.status(201).json({
		success: true,
		data: {
			short_id,
			short_url,
		}
	})
}

export default handle