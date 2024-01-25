import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Card, FilledInput, FormControl, InputLabel } from '@mui/material'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import { AuthenBackground, AuthenForm, InputFieldCT } from '~/components'
import { useAppDispatch, useAuth, useToast } from '~/hooks'
import { authService } from '~/services'
import { LoginUserInput } from '~/services/auth/dto'
import { setLoading } from '~/store/reducers'

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
})

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginUserInput>({ resolver: yupResolver(schema) })

  const { login } = useAuth()
  const toast = useToast()
  const dispatch = useAppDispatch()

  const handleSubmitLogin = async (dataInput: LoginUserInput) => {
    dispatch(setLoading(true))
    try {
      const response = await authService.login(dataInput)
      // console.log(response)

      toast({ message: 'Login successful!', status: 'success' })
      login(response.data.accessToken)
    } catch (error) {
      const axiosError = error as AxiosError
      toast({ message: axiosError.message, status: 'error' })

      // console.log(axiosError)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onSubmitLogin = async (dataInput: LoginUserInput) => {
    handleSubmitLogin(dataInput)
  }

  return (
    <Card sx={{ display: 'flex', width: '750px', minWidth: '300px', height: '98vh' }}>
      <AuthenForm
        title='Sign In'
        formDescription='or use your account:'
        handleSubmit={handleSubmit}
        onSubmitForm={onSubmitLogin}
      >
        <Box>
          <FormControl error={Boolean(errors['username'])} sx={{ my: 1, width: '100%' }} variant='filled'>
            <InputLabel required className='MuiInputLabel-standard'>
              Username
            </InputLabel>
            <FilledInput {...register('username')} sx={{ fontSize: '16px' }} type='text' defaultValue='' />
          </FormControl>
          <InputFieldCT title='Password' nameField='password' register={register} typePassword errors={errors} />
        </Box>
      </AuthenForm>
      <AuthenBackground
        title='Welcome Back!'
        description='To keep connected with us please login with your personal info.'
        buttonContent='Sign In'
        pathRouteTo='/register'
      />
    </Card>
  )
}
