import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
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
		const res = await fetch(`${host}/api/short?short_id=${shortId}`)
		if (res.status !== 200) {
			return NextResponse.redirect(`${host}/`)
		}
		const { data } = await res.json()
		const { url } = data
		return NextResponse.redirect(url)
	} catch (err: any) {
		return NextResponse.redirect(`${host}/`)
	}
}

