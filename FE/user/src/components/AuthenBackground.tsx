import { Link } from 'react-router-dom'

import { Box, Button, Typography } from '@mui/material'

export function AuthenBackground(_props: any) {
  const { pathRouteTo, title, description, buttonContent } = _props

  return (
    <Box
      sx={{
        width: '350px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'rgb(54,207,151) linear-gradient(90deg, rgba(54,207,151,1) 0%, rgba(36,200,195,1) 48%, rgba(19,194,194,1) 96%, rgba(8,151,156,1) 100%, rgba(4,179,168,0.47942927170868344) 100%)'
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: '0 2rem'
        }}
      >
        <Typography variant='h4' sx={{ color: 'white', fontWeight: '500' }}>
          {title}
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'white', margin: '2rem 0', fontWeight: '400' }}>
          {description}
        </Typography>
        <Link to={pathRouteTo}>
          <Button
            variant='outlined'
            sx={{
              color: 'white',
              borderColor: 'white',
              width: '80%'
            }}
          >
            {buttonContent}
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
