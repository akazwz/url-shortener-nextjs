// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse, userAgent } from 'next/server'
import prisma from '../../prisma/client'

import type { Prisma } from '@prisma/client/edge'

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
	return await redirectShortId(shortId, req)
}

const redirectShortId = async(shortId: string, req: NextRequest) => {
	const linkInfo = await prisma.linkInfo.findUnique({
		where: {
			shortId,
		}
	})

	if (!linkInfo) {
		const url = req.nextUrl.clone()
		url.pathname = '/'
		return NextResponse.redirect(url)
	}

	await createVisitInfo(linkInfo.id, req)

	return NextResponse.redirect(linkInfo.url)
}

const createVisitInfo = async(linkInfoId: string, req: NextRequest) => {
	const ua = userAgent(req)
	const geo = req.geo

	const geoInfo: Prisma.GeoInfoCreateInput = {
		country: geo?.country,
		city: geo?.city,
		latitude: geo?.latitude,
		longitude: geo?.longitude,
		region: geo?.region,
	}

	const uaInfo: Prisma.UaInfoCreateInput = {
		isBot: ua.isBot,
		ua: ua.ua,
		browserName: ua.browser.name,
		browserVersion: ua.browser.version,
		deviceModel: ua.device.model,
		deviceType: ua.device.type,
		deviceVendor: ua.device.vendor,
		engineName: ua.engine.name,
		engineVersion: ua.engine.version,
		osName: ua.os.name,
		osVersion: ua.os.version,
		cpuArchitecture: ua.cpu.architecture,
	}

	await prisma.visitInfo.create({
		data: {
			ip: req.ip,
			link: {
				connect: {
					id: linkInfoId
				}
			},
			geo: {
				create: geoInfo,
			},
			ua: {
				create: uaInfo,
			}
		}
	})
}