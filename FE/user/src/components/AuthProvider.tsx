import { PropsWithChildren, createContext, useEffect } from 'react'
import { setAuthorizationToken } from '~/api/axios'

import { useLocalStorage } from '~/hooks'

interface AuthContextProps {
  token: string
  setToken: (value: string | ((val: string) => string)) => void
}

export const AuthContext = createContext<AuthContextProps>({
  token: '',
  setToken: () => null
})

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useLocalStorage('accessToken', '')

  useEffect(() => {
    setAuthorizationToken(token)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
