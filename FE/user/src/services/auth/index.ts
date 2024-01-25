import axiosInstance, { DataResponse } from '~/api/axios'
import { CreateUserInput, LoginUserInput } from './dto'

export const authService = {
  login: (data: LoginUserInput) => axiosInstance.post<any, DataResponse>('/auth/login', data),
  register: (data: CreateUserInput) => {
    return axiosInstance.post('/auth/register', data)
  }
}
