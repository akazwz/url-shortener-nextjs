import { useEffect, useState } from 'react'
import axios from 'axios'

import { DashboardLayout } from '../../src/components/dashboard/layout'
import { supabase } from '../../utils/supabaseClient'
import { OverviewProps, Overview, MostViewedLinks } from '../../src/components/dashboard'

const DashboardIndex = () => {
	const [overview, setOverview] = useState<OverviewProps>({
		links_count: 0,
		visits_count: 0,
		pc_visits_count: 0,
		mobile_visits_count: 0,
		loading: true,
	})
	useEffect(() => {
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
	}, [])

	return (
		<DashboardLayout>
			<Overview overviewProps={overview} />
			<MostViewedLinks />
		</DashboardLayout>
	)
}

export default DashboardIndex