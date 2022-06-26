import { redirects } from './src/lib/redirects'

// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
	return await redirects(req)
}

