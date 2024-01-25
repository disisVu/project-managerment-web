import { createSelector, createSlice } from '@reduxjs/toolkit'
import { ProjectInfoOutput } from '~/services/project'
import { updateObjectInArray } from '~/utils'
import { RootState } from '../store'

export interface ProjectState {
  projects: ProjectInfoOutput[] | null
  projectsAdmin: ProjectInfoOutput[] | null
  projectsMember: ProjectInfoOutput[] | null
}

const initialState: ProjectState = {
  projects: null,
  projectsAdmin: null,
  projectsMember: null
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = [...action.payload]
    },
    setProjectsAdmin: (state, action) => {
      state.projectsAdmin = [...action.payload]
    },
    setProjectsMember: (state, action) => {
      state.projectsMember = [...action.payload]
    },
    addNewProject: (state, action) => {
      state.projects = state.projects ? [action.payload, ...state.projects] : [action.payload]

      state.projectsAdmin = state.projectsAdmin ? [action.payload, ...state.projectsAdmin] : [action.payload]
    },
    updateProject: (state, action) => {
      if (state.projects) state.projects = updateObjectInArray(state.projects, action.payload.id, action.payload)

      if (state.projectsAdmin)
        state.projectsAdmin = updateObjectInArray(state.projectsAdmin, action.payload.id, action.payload)

      if (state.projectsMember)
        state.projectsMember = updateObjectInArray(state.projectsMember, action.payload.id, action.payload)
    },
    deleteProject: (state, action) => {
      if (state.projects) state.projects = state.projects?.filter((item) => item.id !== action.payload.id)
      if (state.projectsAdmin)
        state.projectsAdmin = state.projectsAdmin?.filter((item) => item.id !== action.payload.id)
      if (state.projectsMember)
        state.projectsMember = state.projectsMember?.filter((item) => item.id !== action.payload.id)
    }
  }
})

export const { setProjects, setProjectsAdmin, setProjectsMember, addNewProject, deleteProject, updateProject } =
  projectSlice.actions

export const selectProjects = (state: RootState) => state.projectReducer.projects
export const selectProjectsAdmin = (state: RootState) => state.projectReducer.projectsAdmin
export const selectProjectsMember = (state: RootState) => state.projectReducer.projectsMember

// export const selectAllProject = (state: RootState) => {
//   state.projectReducer.projects, state.projectReducer.projectsAdmin, state.projectReducer.projectsMember
// }

export const selectAllProject = createSelector(
  [selectProjects, selectProjectsAdmin, selectProjectsMember],
  (projects, projectsAdmin, projectsMember) => {
    // Combine the data as needed
    return {
      projects,
      projectsAdmin,
      projectsMember
    }
  }
)
export default projectSlice.reducer
