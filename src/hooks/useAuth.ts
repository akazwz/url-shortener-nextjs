import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { supabase } from '../../utils/supabaseClient'
import { isAuthState } from '../state/user'

export const useAuth = () => {
	const [isAuth, setIsAuth] = useRecoilState(isAuthState)

	useEffect(() => {
		const session = supabase.auth.session()
		setIsAuth(!!session)
		supabase.auth.onAuthStateChange((_event, session) => {
			setIsAuth(!!session)
		})
	}, [setIsAuth])

	const signOut = async() => {
		const { error } = await supabase.auth.signOut()
		if (!error) {
			setIsAuth(false)
		}
	}

	return {
		isAuth,
		signOut,
	}
}