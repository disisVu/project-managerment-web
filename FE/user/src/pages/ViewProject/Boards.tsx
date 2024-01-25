import AddIcon from '@mui/icons-material/Add'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/hooks'
import { PermissionProject, ProjectInfoOutput, projectService } from '~/services/project'
import { selectAllProject, setLoading, setProjects, setProjectsAdmin, setProjectsMember } from '~/store/reducers'
import { CardBoards, CreateProjectModal, UpdateProjectModal } from './components'

export function ViewProjectBoards() {
  const [filterBy, setFilterBy] = useState('2')
  const dispatch = useAppDispatch()
  const { projects, projectsAdmin, projectsMember } = useAppSelector(selectAllProject)

  const [data, setData] = useState<ProjectInfoOutput[] | null>([])
  const [searchInput, setSearchInput] = useState('')

  const currentTableData: ProjectInfoOutput[] = useMemo(() => {
    if (data && data) {
      const newData = data.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))
      return newData
    }
    return []
  }, [searchInput, data])

  const [openModalCreate, setOpenModalCreate] = useState(false)
  const handleOpenModalCreate = () => setOpenModalCreate(true)
  const handleCloseModalCreate = () => setOpenModalCreate(false)

  const [itemUpdate, setItemUpdate] = useState<ProjectInfoOutput>()
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const handleOpenModalUpdate = (item: ProjectInfoOutput) => {
    setItemUpdate(item)
    setOpenModalUpdate(true)
  }
  const handleCloseModalUpdate = () => setOpenModalUpdate(false)

  const handleChangeFilter = (event: SelectChangeEvent) => {
    const value = event.target.value
    setFilterBy(value as string)
    // console.log(value)

    if (Number(value) === PermissionProject.ADMINISTRATOR) fetchDataGetAllProjectAdmin()
    else if (Number(value) === PermissionProject.MEMBER) fetchDataGetAllProjectMember()
    else fetchDataGetAllProject()
  }

  const handleChangeSearchInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchInput(event.target.value)
  }

  const fetchDataGetAllProject = async () => {
    if (projects) {
      setData(projects)
      return
    }

    dispatch(setLoading(true))
    try {
      const res = await projectService.getAllByUser()
      setData(res.data.slice().reverse())
      dispatch(setProjects(res.data.slice().reverse()))
      // console.log(res)
    } catch (error) {
      // console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchDataGetAllProjectAdmin = async () => {
    if (projectsAdmin) {
      setData(projectsAdmin)
      return
    }

    dispatch(setLoading(true))
    try {
      const res = await projectService.getAllByAdmin()
      setData(res.data.slice().reverse())
      dispatch(setProjectsAdmin(res.data.slice().reverse()))
    } catch (error) {
    } finally {
      dispatch(setLoading(false))
    }
  }

  const fetchDataGetAllProjectMember = async () => {
    if (projectsMember) {
      setData(projectsMember)
      return
    }

    dispatch(setLoading(true))
    try {
      const res = await projectService.getAllByMember()
      setData(res.data.slice().reverse())
      dispatch(setProjectsMember(res.data.slice().reverse()))

      // console.log(res)
    } catch (error) {
      // console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    if (Number(filterBy) === PermissionProject.ADMINISTRATOR) fetchDataGetAllProjectAdmin()
    else if (Number(filterBy) === PermissionProject.MEMBER) 
            fetchDataGetAllProjectMember()
  }, [projectsAdmin, projectsMember])

  useEffect(() => {
    fetchDataGetAllProject()
  }, [projects])

  return (
    <Box width='100%' p='0px 20px'>
      <Box position='sticky' top='0' bgcolor='white' zIndex={1200}>
        <Box width='100%' display='flex' justifyContent='space-between' alignItems='center'>
          <Box width='35%' display='flex' alignItems='center' gap='10px' mt='10px'>
            <Typography variant='h4'>Your Project</Typography>

            <Button variant='presentation' color='secondary' startIcon={<AddIcon />} onClick={handleOpenModalCreate}>
              Create
            </Button>
          </Box>
        </Box>
        <Box display='flex' gap='20px' mt='20px'>
          <TextField
            size='small'
            placeholder='Search project'
            value={searchInput}
            onChange={handleChangeSearchInput}
            sx={{ width: '30%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchOutlinedIcon />
                </InputAdornment>
              )
            }}
          />
          <Box width='15%'>
            <FormControl fullWidth>
              <InputLabel>Filter by role</InputLabel>
              <Select size='small' value={filterBy} label='Filter by role' onChange={handleChangeFilter}>
                <MenuItem value={2}>All</MenuItem>
                <MenuItem value={0}>Administrator</MenuItem>
                <MenuItem value={1}>Member</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Divider sx={{ my: '10px' }} />
      </Box>

      <Grid container spacing={2}>
        {currentTableData?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <CardBoards item={item} handleOpenModalUpdate={handleOpenModalUpdate} />
          </Grid>
        ))}
      </Grid>

      {openModalCreate && <CreateProjectModal open={openModalCreate} handleClose={handleCloseModalCreate} />}
      {openModalUpdate && itemUpdate && (
        <UpdateProjectModal projectInfo={itemUpdate} open={openModalUpdate} handleClose={handleCloseModalUpdate} />
      )}
    </Box>
  )
}
