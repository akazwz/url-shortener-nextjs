import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'

import { DashboardLayout } from '../../src/components/dashboard/layout'
import { supabase } from '../../utils/supabaseClient'
import { OverviewProps, Overview } from '../../src/components/dashboard'

const MyMap = dynamic(() => import('../../src/components/dashboard/Map'), {
	ssr: false,
})

const DashboardIndex = () => {
	const [points, setPoints] = useState<[number, number][]>()
	const [overview, setOverview] = useState<OverviewProps>({
		links_count: 0,
		visits_count: 0,
		pc_visits_count: 0,
		mobile_visits_count: 0,
		loading: true,
	})
	useEffect(() => {
		const setOverViewData = () => {
			axios.get('/api/overview', {
				headers: {
					authorization: supabase.auth.session()?.access_token || ''
				}
			})
				.then((res) => {
					const { data } = res.data
					setOverview(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
		setOverViewData()
	}, [])

	return (
		<DashboardLayout>
			<Overview overviewProps={overview} />
			<MyMap points={points} />
		</DashboardLayout>
	)
}

export default DashboardIndex