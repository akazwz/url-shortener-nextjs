// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse, userAgent } from 'next/server'


export const redirects = async(req: NextRequest) => {
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
	// return await redirectShortId(shortId, req)
	return NextResponse.next()
}

const redirectShortId = async(shortId: string, req: NextRequest) => {
	/*if (true) {
		const url = req.nextUrl.clone()
		url.pathname = '/'
		return NextResponse.redirect(url)
	}


	return NextResponse.redirect(linkInfo.url)*/
}