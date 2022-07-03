import { NextRequest, NextResponse, userAgent } from 'next/server'
import { Visits } from './types'

const middleware = async(req: NextRequest) => {
	return await redirects(req)
}

const redirects = async(req: NextRequest) => {
	const pathName = req.nextUrl.pathname

	if (pathName.startsWith('/_next')) {
		return NextResponse.next()
	}
	if (pathName.startsWith('/api')) {
		return NextResponse.next()
	}
	const whiteLists = [
		'/', '/login', '/dashboard', '/dashboard/links', '/favicon.ico'
	]

	if (whiteLists.indexOf(pathName) !== -1) {
		return NextResponse.next()
	}
	// get short id
	const shortId = pathName.slice(1)
	// redirects
	return await redirectShortId(shortId, req)
}

const redirectShortId = async(shortId: string, req: NextRequest) => {
	const host = req.nextUrl.protocol + '//' + req.nextUrl.host
	try {
		// get link info
		const shortRes = await fetch(`${host}/api/short?short_id=${shortId}`)

		const { data } = await shortRes.json()
		// no such link
		if (!data) {
			return NextResponse.redirect(`${host}/`)
		}

		const ip = req.ip
		const geo = req.geo
		const ua = userAgent(req)

		const { id, url } = data

		const visits: Visits = {
			browser_name: ua.browser.name,
			browser_version: ua.browser.version,
			city: geo?.city,
			country: geo?.country,
			cpu_architecture: ua.cpu.architecture,
			device_model: ua.device.model,
			device_type: ua.device.type,
			device_vendor: ua.device.vendor,
			engine_name: ua.engine.name,
			engine_version: ua.engine.version,
			ip: ip,
			is_bot: ua.isBot,
			latitude: geo?.latitude,
			link_id: id,
			os_name: ua.os.name,
			os_version: ua.os.version,
			region: geo?.region,
			short_id: shortId,
			ua: ua.ua
		}

		// record visits
		await fetch(`${host}/api/track`, {
			method: 'POST',
			body: JSON.stringify({
				visits,
			})
		})
		// redirects
		return NextResponse.redirect(url)
	} catch (err: any) {
		console.log(err)
		return NextResponse.redirect(`${host}/`)
	}
}

export default middleware

