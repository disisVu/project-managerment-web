import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { CardItem } from './CardItem'

export function CardBlock() {
  return (
    <Box height='fit-content' bgcolor='secondary.200' borderRadius='10px' p='7px 10px' width='270px'>
      <Box display='flex' alignItems='center' pl='10px' gap='10px'>
        <TextField
          size='small'
          color='primary'
          defaultValue='BACKLOG'
          fullWidth
          sx={{ my: '5px' }}
          inputProps={{
            style: {
              fontSize: '13px',
              fontWeight: '500'
            }
          }}
        />
        <IconButton
          sx={{
            width: '30px',
            height: '30px'
          }}
        >
          <MoreHorizRoundedIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box maxHeight='calc(100vh - 280px)' minHeight='10px' overflow='auto' px='5px'>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <CardItem key={num} />
        ))}
      </Box>
      <Box mt='5px'>
        <Button
          variant='nav'
          fullWidth
          startIcon={
            <Box display='flex' alignItems='center' gap='10px'>
              <AddRoundedIcon fontSize='small' />
              <Typography variant='subtitle1' fontWeight='500' textTransform='initial'>
                Add a task
              </Typography>
            </Box>
          }
        ></Button>
      </Box>
    </Box>
  )
}
