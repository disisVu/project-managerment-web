import { yupResolver } from '@hookform/resolvers/yup'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Button, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AxiosError } from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useToast } from '~/hooks'
import { CreateProjectInput, ProjectInfoOutput, UpdateProjectInput, projectService } from '~/services/project'
import { setLoading, updateProject } from '~/store/reducers'

interface UpdateProjectModalProps {
  projectInfo: ProjectInfoOutput
  open: boolean
  handleClose: () => void
}

const schema = yup.object({
  name: yup.string().required('Project name is required'),
  timeStart: yup.string(),
  timeEnd: yup.string()
})

export function UpdateProjectModal({ projectInfo, open, handleClose }: UpdateProjectModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<UpdateProjectInput>({ resolver: yupResolver(schema) })
  const dispatch = useAppDispatch()
  const toast = useToast()

  const onSubmitUpdateProject = async (dataInput: CreateProjectInput) => {
    // console.log(dataInput)

    dispatch(setLoading(true))
    try {
      const res = await projectService.updateProject(dataInput, projectInfo.id)
      toast({ message: 'Update successful projects', status: 'success' })
      // console.log(res)
      dispatch(updateProject(res.data))
      handleClose()
    } catch (error) {
      const errorAxios = error as AxiosError
      toast({ message: errorAxios.message[0], status: 'error' })
      // console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div>
      <Modal open={open}>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmitUpdateProject)}
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
            justifyContent='space-between'
            alignItems='center'
            px='10px'
            borderRadius='4px'
          >
            <Typography variant='h4' color='white'>
              Edit Project
            </Typography>
            <IconButton sx={{ color: 'white', position: 'absolute', right: '5px' }} onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box p='30px 40px' width='35rem'>
            <TextField
              {...register('name')}
              error={Boolean(errors.name)}
              defaultValue={projectInfo.name}
              label='Name Project'
              variant='outlined'
              fullWidth
              size='small'
            />
            <Box display='flex' gap='10px' mt='15px' justifyContent='space-between'>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Start time'
                  defaultValue={projectInfo.timeStart ? dayjs(projectInfo.timeStart) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setValue('timeStart', newValue?.toISOString())
                  }}
                  format='DD/MM/YYYY'
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      sx: {
                        width: '100%'
                      }
                    }
                  }}
                />
              </DemoContainer>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label='Deadline time'
                  defaultValue={projectInfo.timeEnd ? dayjs(projectInfo.timeEnd) : null}
                  onChange={(newValue: Dayjs | null) => {
                    setValue('timeEnd', newValue?.toISOString())
                  }}
                  format='DD/MM/YYYY'
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      size: 'small',
                      sx: {
                        width: '100%'
                      }
                    }
                  }}
                />
              </DemoContainer>
            </Box>
          </Box>
          <Box textAlign='center' my='15px'>
            <Button variant='presentation' color='secondary' type='submit'>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
