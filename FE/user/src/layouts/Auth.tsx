import { Navigate, Outlet } from 'react-router-dom'

import { Box, Grid } from '@mui/material'

import { useAuth } from '~/hooks'

export function AuthLayout() {
  const { isAuth } = useAuth()

  if (isAuth) return <Navigate to='/' replace />

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  )
}
