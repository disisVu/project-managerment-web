import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import { Box, Typography } from '@mui/material'
export function CardItem() {
  return (
    <Box
      bgcolor='white'
      borderRadius='5px'
      p='5px 10px'
      my='10px'
      sx={{
        ':hover': {
          cursor: 'pointer',
          outline: '2px solid',
          outlineColor: 'secondary.900'
        }
      }}
    >
      <Typography variant='subtitle1'>Task 1</Typography>
      <Box display='flex' gap='10px' px='5px'>
        <SubjectRoundedIcon fontSize='small' sx={{ color: 'secondary.900' }} />
        <Box display='flex' gap='5px'>
          <AttachFileRoundedIcon fontSize='small' sx={{ color: 'secondary.900', transform: 'rotate(45deg)' }} />
          <Typography variant='subtitle2'>1</Typography>
        </Box>
      </Box>
    </Box>
  )
}
