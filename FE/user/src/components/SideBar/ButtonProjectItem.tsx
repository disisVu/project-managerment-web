import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { Box, Button, Icon, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { bg_card } from '~/assets/image'
import { ProjectInfoOutput } from '~/services/project'

interface ButtonProjectItemProps {
  item: ProjectInfoOutput
}

export function ButtonProjectItem({ item }: ButtonProjectItemProps) {
  return (
    <Button
      variant='nav'
      component={Link}
      to={`/project/${item.id}/tasks`}
      fullWidth
      sx={{ borderRadius: '0', textAlign: 'start', placeContent: 'flex-start', px: '20px' }}
      startIcon={
        <Box display='flex' gap='5px' alignItems='center'>
          <Box component='img' src={bg_card} alt='no image' height='20px' borderRadius='2px'></Box>
          <Typography
            variant='subtitle1'
            sx={{
              textTransform: 'initial',
              lineHeight: 1.8,
              width: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {item.name}
          </Typography>
        </Box>
      }
      endIcon={
        <Icon
          sx={{
            height: '25px',
            width: '25px',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s ease',

            '&:hover': {
              transform: 'scale(1.2)'
            }
          }}
        >
          <StarRoundedIcon fontSize='small' />
        </Icon>
      }
    ></Button>
  )
}
