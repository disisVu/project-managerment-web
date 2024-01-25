import axiosInstance, { DataResponse } from '~/api/axios'
import { ProfileUserInput, UserInfoOutput } from './dto'

export const userService = {
  getInfo: () => axiosInstance.get<UserInfoOutput>('/user/profile'),
  updateInfo: (data: ProfileUserInput) => axiosInstance.patch<DataResponse>('/user', data)
}

export * from './dto'
