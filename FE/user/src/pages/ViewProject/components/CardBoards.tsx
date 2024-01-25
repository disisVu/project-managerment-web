import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Card, Divider, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { AxiosError } from 'axios'
import { MouseEventHandler, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bg_card3 } from '~/assets/image'
import { useAppDispatch, useAppSelector, useToast } from '~/hooks'
import { ProjectInfoOutput, projectService } from '~/services/project'
import { addNewProject, deleteProject, removeAlert, selectAlert, setAlert, setLoading } from '~/store/reducers'

interface CardBoardsProps {
  item: ProjectInfoOutput
  handleOpenModalUpdate: (item: ProjectInfoOutput) => void
}

export function CardBoards({ item, handleOpenModalUpdate }: CardBoardsProps) {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const selectAlertSlice = useAppSelector(selectAlert)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick: MouseEventHandler<HTMLButtonElement | HTMLLIElement> = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleClose: MouseEventHandler<HTMLButtonElement | HTMLLIElement> = (event) => {
    event.preventDefault()
    setAnchorEl(null)
  }

  const fetchDataDeleteItem = async () => {
    dispatch(setLoading(true))
    try {
      const res = await projectService.deleteProject(item.id)
      dispatch(deleteProject({ id: item.id }))
      toast({ message: res.message, status: 'success' })
    } catch (error) {
      const errorAxios = error as AxiosError

      toast({ message: errorAxios.message, status: 'error' })
    } finally {
      dispatch(setLoading(false))
      dispatch(removeAlert())
    }
  }

  const handleUpdateItem: MouseEventHandler<HTMLButtonElement | HTMLLIElement> = (event) => {
    handleClose(event)
    handleOpenModalUpdate(item)
  }

  const handleDuplicateItem: MouseEventHandler<HTMLButtonElement | HTMLLIElement> = async (event) => {
    handleClose(event)
    dispatch(setLoading(true))

    try {
      const res = await projectService.createProject({ name: item.name })
      toast({ message: 'Duplicate successful projects', status: 'success' })
      dispatch(addNewProject(res.data))
    } catch (error) {
      const errorAxios = error as AxiosError
      toast({ message: errorAxios.message, status: 'error' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteItem: MouseEventHandler<HTMLButtonElement | HTMLLIElement> = async (event) => {
    handleClose(event)
    dispatch(
      setAlert({
        isOpen: true,
        title: 'Are you sure?',
        content: 'You cannot undo it once deleted.',
        id: item.id
      })
    )
  }

  useEffect(() => {
    if (!selectAlertSlice.isOpen && selectAlertSlice.confirm && selectAlertSlice.id === item.id) fetchDataDeleteItem()
  }, [selectAlertSlice])
  return (
    <Card
      sx={{
        height: '10rem',
        width: '100%',
        p: '10px',
        background: `url(${bg_card3}) center/cover no-repeat`,
        ':hover': {
          cursor: 'pointer',
          opacity: '0.95'
        }
      }}
    >
      <Box
        component={Link}
        to={`/project/${item.id}/tasks`}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          borderRadius: '4px',
          p: '5px',
          textDecorationLine: 'none'
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' gap='5px'>
            <Icon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.2)'
                },
                color: 'white'
              }}
            >
              <StarRoundedIcon fontSize='small' />
            </Icon>

            <Typography
              variant='h5'
              color='white'
              sx={{ width: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {item.name}
            </Typography>
          </Box>

          <IconButton sx={{ color: 'white' }} onClick={handleClick}>
            <MoreVertRoundedIcon />
          </IconButton>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem disableRipple sx={{ gap: '10px' }} onClick={handleUpdateItem}>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem disableRipple sx={{ gap: '10px' }} onClick={handleDuplicateItem}>
              <FileCopyIcon />
              Duplicate
            </MenuItem>
            <MenuItem disableRipple sx={{ gap: '10px' }}>
              <GroupAddRoundedIcon />
              Invite members
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem disableRipple sx={{ gap: '10px', color: '#d32f2f' }} onClick={handleDeleteItem}>
              <DeleteIcon color='error' />
              Delete
            </MenuItem>
          </Menu>
        </Box>

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' alignItems='center' gap='5px'>
            <IconButton size='small' sx={{ color: 'white' }}>
              <AccessTimeFilledIcon fontSize='small' />
            </IconButton>
          </Box>
          <Box display='flex' alignItems='center' gap='5px'>
            <AvatarGroup total={item.roles.length}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
            </AvatarGroup>
            <IconButton size='small' sx={{ color: 'white' }}>
              <CircleOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
