import { UserInfoOutput } from '../user/dto'

export enum PermissionProject {
  ADMINISTRATOR,
  MEMBER
}

export enum StatusProject {
  ON_TIME = 'ON_TIME',
  RISK = 'RISK',
  PROGRESS_SLOW = 'PROGRESS_SLOW',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export const statusProject = [
  {
    value: StatusProject.ON_TIME,
    title: 'On time'
  },
  {
    value: StatusProject.RISK,
    title: 'Risk'
  },
  {
    value: StatusProject.PROGRESS_SLOW,
    title: 'Progress slow'
  },
  {
    value: StatusProject.ON_HOLD,
    title: 'On hold'
  },
  {
    value: StatusProject.CANCELLED,
    title: 'Cancelled'
  },
  {
    value: StatusProject.COMPLETED,
    title: 'Completed'
  }
]

export interface UserRoleProjectOutput {
  id: string
  permission: number
  user: UserInfoOutput
}

export interface ProjectInfoOutput {
  id: string
  name: string
  status: string
  timeStart: string
  timeEnd: string
  roles: UserRoleProjectOutput[]
}

export interface CreateProjectInput {
  name: string
}

export interface UpdateProjectInput {
  name: string
  timeStart?: string
  timeEnd?: string
  status?: StatusProject
}
