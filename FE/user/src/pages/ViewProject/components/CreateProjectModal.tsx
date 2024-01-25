import { yupResolver } from '@hookform/resolvers/yup'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Button, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useToast } from '~/hooks'
import { CreateProjectInput, projectService } from '~/services/project'
import { addNewProject, setLoading } from '~/store/reducers'

interface CreateProjectModalProps {
  open: boolean
  handleClose: () => void
}

const schema = yup.object({
  name: yup.string().required('Project name is required')
})

export function CreateProjectModal({ open, handleClose }: CreateProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateProjectInput>({ resolver: yupResolver(schema) })
  const dispatch = useAppDispatch()
  const toast = useToast()

  const onSubmitCreateProject = async (dataInput: CreateProjectInput) => {
    dispatch(setLoading(true))
    try {
      const res = await projectService.createProject(dataInput)
      toast({ message: 'Create successful projects', status: 'success' })
      dispatch(addNewProject(res.data))
      handleClose()
    } catch (error) {
      const errorAxios = error as AxiosError
      toast({ message: errorAxios.message, status: 'error' })
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Modal open={open}>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmitCreateProject)}
          position='absolute'
          top='50%'
          left='50%'
          bgcolor='background.paper'
          borderRadius='5px'
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Box
            height='45px'
            bgcolor='secondary.dark'
            display='flex'
            justifyContent='center'
            alignItems='center'
            px='10px'
            borderRadius='4px'
            position='relative'
          >
            <Typography variant='h4' color='white'>
              Create Project
            </Typography>
            <IconButton sx={{ color: 'white', position: 'absolute', right: '5px' }} onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box p='30px 40px'>
            <TextField
              {...register('name')}
              error={Boolean(errors.name)}
              label='Name Project'
              variant='outlined'
              fullWidth
              size='small'
            />
          </Box>
          <Box textAlign='center' my='10px'>
            <Button variant='presentation' color='secondary' type='submit'>
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
