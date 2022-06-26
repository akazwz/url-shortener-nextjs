// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse, userAgent } from 'next/server'

import prisma from '../../prisma/client'

export const redirects = async(req: NextRequest) => {
	const pathName = req.nextUrl.pathname
	const ua = userAgent(req)
	const geo = req.geo
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
	return  await redirectShortId(shortId)
}

const redirectShortId = async(shortId: string) => {
	const linkInfo = await prisma.linkInfo.findUnique({
		where: {
			shortId,
		}
	})
	if (!linkInfo) {
		return NextResponse.next()
	}
	const url = linkInfo.url
	return NextResponse.redirect(url)
}