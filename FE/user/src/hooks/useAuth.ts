import { useCallback, useContext } from 'react'
import { AuthContext } from '~/components'
import { removeUser } from '~/store/reducers/userSlice'
import { useAppDispatch } from '.'

export function useAuth() {
  const { token, setToken } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const login = (data: string) => setToken(data)
  const logout = useCallback(() => {
    setToken('')
    dispatch(removeUser())
  }, [setToken])

  return { logout, login, isAuth: Boolean(token), token }
}
