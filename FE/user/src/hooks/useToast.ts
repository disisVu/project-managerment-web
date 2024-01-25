import { useContext } from 'react'

import { ToastContext } from '~/components'

export function useToast() {
  return useContext(ToastContext)
}
