import { Box } from '@mui/material'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { HeaderComponent, SideBar } from '~/components'
import { useAppDispatch, useAuth } from '~/hooks'
import { userService } from '~/services'
import { projectService } from '~/services/project'
import { setProjects } from '~/store/reducers'
import { updateUser } from '~/store/reducers/userSlice'

export function BaseLayout() {
  const { isAuth, logout } = useAuth()
  const dispatch = useAppDispatch()

  const fetchDataGetAllProject = async () => {
    try {
      const res = await projectService.getAllByUser()
      dispatch(setProjects(res.data.slice().reverse()))
      // console.log(res)
    } catch (error) {
      // console.log(error)
    }
  }

  const handleAuth = async () => {
    try {
      const response = await userService.getInfo()
      // console.log('profile: ', response)

      dispatch(updateUser(response.data))
    } catch (error) {
      const axiosError = error as AxiosError

      // console.log(axiosError)

      if (axiosError.message === 'Unauthorized') logout()
    }
  }

  useEffect(() => {
    if (isAuth) {
      // console.log(isAuth)

      handleAuth()
      fetchDataGetAllProject()
    }
  }, [isAuth])

  if (!isAuth) return <Navigate to='/login' replace />

  return (
    <>
      <HeaderComponent />
      <Box width='100%'>
        <SideBar>
          <Outlet />
        </SideBar>
      </Box>
    </>
  )
}
