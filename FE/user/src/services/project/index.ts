import axiosInstance, { DataResponse } from '~/api/axios'
import { CreateProjectInput, ProjectInfoOutput, UpdateProjectInput } from './dto'

export const projectService = {
  getAllByUser: () => axiosInstance.get<ProjectInfoOutput, DataResponse>('/project/user'),
  getAllByAdmin: () => axiosInstance.get<ProjectInfoOutput, DataResponse>('/project/user/permission/0'),
  getAllByMember: () => axiosInstance.get<ProjectInfoOutput, DataResponse>('/project/user/permission/1'),
  createProject: (data: CreateProjectInput) => axiosInstance.post<DataResponse>('/project', data),
  deleteProject: (id: string) => axiosInstance.delete<any, DataResponse>(`/project/${id}`),
  updateProject: (data: UpdateProjectInput, id: string) =>
    axiosInstance.patch<any, DataResponse>(`/project/${id}`, data)
}

export * from './dto'
