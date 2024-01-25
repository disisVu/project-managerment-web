import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Card, FilledInput, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AxiosError } from 'axios'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthenBackground, AuthenForm, InputFieldCT } from '~/components'
import { useAppDispatch, useToast } from '~/hooks'
import { authService } from '~/services'
import { CreateUserInput } from '~/services/auth/dto'
import { gender } from '~/services/user'
import { setLoading } from '~/store/reducers'

const schema = yup.object({
  email: yup.string().email('This field must be a Email').required('Email is required'),
  phone: yup
    .string()
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Phone number is invalid')
    .required('Phone number is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string(),
  gender: yup.string(),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  repassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password is required')
})

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CreateUserInput>({ resolver: yupResolver(schema) })

  const toast = useToast()
  const dispatch = useAppDispatch()
  const [selected, setSelected] = useState('')
  const navigate = useNavigate()

  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value)
  }

  const handleSubmitRegister = async (dataInput: CreateUserInput) => {
    dispatch(setLoading(true))
    try {
      await authService.register(dataInput)

      navigate('/login')
      toast({ message: 'Register successful! You can login now.', status: 'success' })
    } catch (error) {
      const axiosError = error as AxiosError

      toast({ message: axiosError.message, status: 'error' })
      // console.log(axiosError)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const onSubmitRegister = async (dataInput: CreateUserInput): Promise<void> => {
    // console.log(dataInput)

    handleSubmitRegister(dataInput)
  }

  return (
    <Card sx={{ display: 'flex', width: '750px', minWidth: '300px', height: '98vh' }}>
      <AuthenForm
        title='Sign Up'
        formDescription='or use your email for registration:'
        isSignUp
        handleSubmit={handleSubmit}
        onSubmitForm={onSubmitRegister}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <FormControl error={Boolean(errors['firstName'])} sx={{ my: 1, width: '100%' }} variant='filled'>
              <InputLabel required className='MuiInputLabel-standard'>
                First Name
              </InputLabel>
              <FilledInput {...register('firstName')} sx={{ fontSize: '16px' }} type='text' defaultValue='' />
            </FormControl>
            <FormControl error={Boolean(errors['lastName'])} sx={{ my: 1, width: '100%' }} variant='filled'>
              <InputLabel required className='MuiInputLabel-standard'>
                Last Name
              </InputLabel>
              <FilledInput {...register('lastName')} sx={{ fontSize: '16px' }} type='text' defaultValue='' />
            </FormControl>
          </Box>

          <FormControl error={Boolean(errors['email'])} sx={{ my: 1, width: '100%' }} variant='filled'>
            <InputLabel required className='MuiInputLabel-standard'>
              Email
            </InputLabel>
            <FilledInput {...register('email')} sx={{ fontSize: '16px' }} type='text' defaultValue='' />
          </FormControl>
          <FormControl error={Boolean(errors['phone'])} sx={{ my: 1, width: '100%' }} variant='filled'>
            <InputLabel required className='MuiInputLabel-standard'>
              Phone Number
            </InputLabel>
            <FilledInput {...register('phone')} sx={{ fontSize: '16px' }} type='text' defaultValue='' />
          </FormControl>
          <Box sx={{ display: 'flex', gap: '36px' }}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Date of birth'
                defaultValue={null}
                onChange={(newValue: Dayjs | null) => {
                  // console.log(newValue?.toISOString())
                  setValue('dob', newValue?.toISOString())
                }}
                format='DD/MM/YYYY'
                slotProps={{
                  textField: {
                    variant: 'filled',
                    sx: {
                      width: '100%'
                    }
                  }
                }}
              />
            </DemoContainer>
            <FormControl variant='filled' sx={{ minWidth: 130, my: 1 }}>
              <InputLabel id='demo-simple-select-filled-label'>Gender</InputLabel>
              <Select
                value={selected}
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                {...register('gender')}
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {gender.map((item) => {
                  return (
                    <MenuItem key={item.value} value={item.value}>
                      {item.title}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <InputFieldCT title='Password' nameField='password' register={register} typePassword errors={errors} />
            <InputFieldCT title='Re-password' nameField='repassword' register={register} typePassword errors={errors} />
          </Box>
        </Box>
      </AuthenForm>
      <AuthenBackground
        title='Hello, Friend!'
        description='Enter your personal details and start journey with us.'
        buttonContent='Sign Up'
        pathRouteTo='/login'
      />
    </Card>
  )
}
