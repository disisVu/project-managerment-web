import { Logout } from '@mui/icons-material'
import AdbIcon from '@mui/icons-material/Adb'
import { Divider, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAuth } from '~/hooks'
import { selectUserProfile } from '~/store/reducers'

export function HeaderComponent() {
  const { logout } = useAuth()
  const userInfo = useAppSelector(selectUserProfile)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ backgroundColor: 'white' }}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Box component={Link} to='/' sx={{ display: 'flex', alignItems: 'center', textDecorationLine: 'none' }}>
              <AdbIcon sx={{ display: { md: 'flex' }, mr: 1, color: 'secondary.dark' }} />
              <Typography
                variant='h6'
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  letterSpacing: '.2rem'
                }}
              >
                GoMaP
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ width: '25px', height: '25px' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box sx={{ p: '6px 16px', width: '15rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar sx={{ width: '30px', height: '30px', backgroundColor: 'primary' }} />
                <Box>
                  <Typography variant='subtitle1'>
                    {userInfo?.user?.firstName + ' ' + userInfo?.user?.lastName}
                  </Typography>
                  <Typography variant='subtitle1'>{userInfo?.user?.email}</Typography>
                </Box>
              </Box>
              <Divider />
              <MenuItem component={Link} to='/profile'>
                <Typography variant='h6'>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logout} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant='h6'>Logout</Typography>
                <Logout sx={{ width: '20px', height: '20px', color: 'secondary.600' }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
