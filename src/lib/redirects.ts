// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse, userAgent } from 'next/server'
import { supabase } from '../utils/supabaseClient'

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
	return await redirectShortId(shortId)
}

const redirectShortId = async(shortId: string) => {
	const { data, error } = await supabase
		.from('link_info')
		.insert([
			{ url: 'https://baidu.com', short_id: shortId }
		])
	console.log(data)
}