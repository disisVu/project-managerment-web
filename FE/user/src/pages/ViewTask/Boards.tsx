import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import ViewKanbanRoundedIcon from '@mui/icons-material/ViewKanbanRounded'
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined'
import { Box, Button, Icon, IconButton, TextField, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { useState } from 'react'
import { bg_card } from '~/assets/image'
import { CardBlock } from './components'

export function ViewTaskBoards() {
  const [openAddList, setOpenAddList] = useState(false)
  const handleCloseAddList = () => {
    setOpenAddList(false)
  }
  const handleOpenAddList = () => {
    setOpenAddList(true)
  }

  return (
    <Box
      width='100%'
      height='calc(100vh - 65px)'
      sx={{
        background: `url(${bg_card}) center/cover no-repeat`
      }}
    >
      <Box
        width='100%'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bgcolor='#0000003e'
        p='10px 20px'
      >
        <Box display='flex' gap='20px' alignItems='center'>
          <Box display='flex' gap='10px' alignItems='center'>
            <TextField
              size='small'
              color='secondary'
              defaultValue={`[Intern's David] Demo 1`}
              inputProps={{
                style: {
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '700'
                }
              }}
            />
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
          </Box>
          <Box display='flex' gap='5px'>
            <Button variant='presentation' startIcon={<ViewKanbanRoundedIcon />}>
              Board
            </Button>
            <Button variant='noPresentation' startIcon={<ViewListOutlinedIcon />}>
              Table
            </Button>
          </Box>
        </Box>
        <Box display='flex' gap='7px' alignItems='center'>
          <AvatarGroup max={2}>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
            <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
            <Avatar alt='Trevor Henderson' src='/static/images/avatar/5.jpg' />
          </AvatarGroup>
          <Button variant='presentation' startIcon={<GroupAddRoundedIcon />}>
            Share
          </Button>
        </Box>
      </Box>
      <Box height='calc(100vh - 150px)' p='10px' display='flex' overflow='auto' gap='10px'>
        {[0, 1].map((num) => (
          <CardBlock key={num} />
        ))}
        <Box width='270px'>
          {!openAddList ? (
            <Button
              variant='presentation'
              fullWidth
              onClick={handleOpenAddList}
              startIcon={
                <Box display='flex' alignItems='center' gap='10px'>
                  <AddRoundedIcon fontSize='small' />
                  <Typography variant='subtitle1' fontWeight='500' textTransform='initial'>
                    Add a list
                  </Typography>
                </Box>
              }
            ></Button>
          ) : (
            <Box bgcolor='secondary.200' borderRadius='10px' p='7px 10px'>
              <TextField
                size='small'
                color='primary'
                placeholder='Enter list title...'
                sx={{ my: '5px' }}
                inputProps={{
                  style: {
                    fontSize: '13px',
                    fontWeight: '500',
                    width: '210px',
                    backgroundColor: 'white',
                    borderRadius: '5px'
                  }
                }}
              />
              <Box display='flex' alignItems='center' my='5px' gap='10px'>
                <Box>
                  <Button variant='nav' color='secondary' fullWidth onClick={handleCloseAddList}>
                    Add list
                  </Button>
                </Box>
                <Box width='40px'>
                  <IconButton onClick={handleCloseAddList}>
                    <CloseRoundedIcon fontSize='small' />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
