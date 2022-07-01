import { useEffect } from 'react'

import { supabase } from '../../utils/supabaseClient'
import { useRecoilState } from 'recoil'
import { isAuthState } from '../state/user'

export const useAuth = () => {
	const [isAuth, setIsAuth] = useRecoilState(isAuthState)

	const session = supabase.auth.session()

	const signOut = async() => {
		await supabase.auth.signOut()
		setIsAuth(false)
	}

	useEffect(() => {
		setIsAuth(!!session)
	}, [session, setIsAuth])

	return {
		isAuth,
		signOut,
	}
}