import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import GitHubIcon from '@mui/icons-material/GitHub'
import GoogleIcon from '@mui/icons-material/Google'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { PropsWithChildren } from 'react'

import { useAppSelector } from '~/hooks'
import { selectLoading } from '~/store/reducers'

interface AuthenFormProps {
  isSignUp?: boolean
  handleSubmit: any
  onSubmitForm: (dataInput: any) => Promise<void>
  title: string
  formDescription: string
}

export function AuthenForm(props: AuthenFormProps & PropsWithChildren) {
  const { isSignUp, title, formDescription, handleSubmit, onSubmitForm, children } = props

  const select = useAppSelector(selectLoading)

  return (
    <Box sx={{ width: '800px', minWidth: '500px', overflow: 'auto' }}>
      <Box
        sx={{
          textAlign: 'center',
          padding: '1rem 4rem'
        }}
      >
        <Box>
          <Typography
            variant='h4'
            color='primary'
            sx={{
              fontWeight: '600'
            }}
          >
            {title}
          </Typography>

          <Box>
            <Grid container spacing={1} justifyContent='center' margin='1.2rem 0'>
              <Grid>
                <Button
                  variant='presentation'
                  color='secondary'
                  sx={{ borderRadius: '5rem', padding: '.7rem', minWidth: '0' }}
                >
                  <FacebookOutlinedIcon className='icon-btn' />
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant='presentation'
                  color='secondary'
                  sx={{ borderRadius: '5rem', padding: '.7rem', minWidth: '0' }}
                >
                  <GoogleIcon className='icon-btn' />
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant='presentation'
                  color='secondary'
                  sx={{ borderRadius: '5rem', padding: '.7rem', minWidth: '0' }}
                >
                  <GitHubIcon className='icon-btn' />
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Typography variant='subtitle1' sx={{ fontWeight: '500', margin: '0.5rem 0' }}>
            {formDescription}
          </Typography>
        </Box>
        <Box component='form' onSubmit={handleSubmit(onSubmitForm)}>
          {children}
          <Box>
            <Box sx={{ textAlignLast: 'center' }}>
              {!isSignUp && (
                <div>
                  <Button
                    variant='text'
                    sx={{
                      margin: '.5rem 0'
                    }}
                  >
                    Forgot your password?
                  </Button>
                </div>
              )}
              <div>
                <LoadingButton
                  type='submit'
                  loading={select.isLoading}
                  loadingPosition='center'
                  variant='contained'
                  disabled={select.isLoading}
                  sx={{ width: '100%', marginTop: '.4rem' }}
                >
                  <span>{title}</span>
                </LoadingButton>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
