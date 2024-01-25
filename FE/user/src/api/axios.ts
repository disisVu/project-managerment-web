import axios from 'axios'

export interface DataResponse<T> {
  status: string
  message: string
  data: T
}

export interface ErrorResponseData {
  message: string
  statusCode: number
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
})

const storedToken: string | null = localStorage.getItem('accessToken')
const token: string | null = typeof storedToken === 'string' ? JSON.parse(storedToken) : null

axiosInstance.defaults.headers.common['authorization'] = 'foo bar'
axiosInstance.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data ?? response
  },
  (error) => {
    return Promise.reject(error?.response?.data ?? error)
  }
)

export function setAuthorizationToken(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common['authorization']
  }
}

export default axiosInstance
