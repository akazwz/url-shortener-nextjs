import { NextRequest, NextResponse, userAgent } from 'next/server'

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
		'/', '/login', '/signup', '/favicon.ico'
	]

	if (whiteLists.indexOf(pathName) !== -1) {
		return NextResponse.next()
	}
	const shortId = pathName.slice(1)
	return await redirectShortId(shortId, req)
}

const redirectShortId = async(shortId: string, req: NextRequest) => {
	const host = req.nextUrl.protocol + '//' + req.nextUrl.host
	try {
		const ip = req.ip
		const geo = req.geo
		const uaInfo = userAgent(req)

		console.log(ip)
		console.log(geo)
		console.log(uaInfo)

		const res = await fetch(`${host}/api/short?short_id=${shortId}`)

		const { data } = await res.json()
		if (!data) {
			return NextResponse.redirect(`${host}/`)
		}
		const { id, url } = data

		return NextResponse.redirect(url)
	} catch (err: any) {
		console.log(err)
		return NextResponse.redirect(`${host}/`)
	}
}

export default middleware

