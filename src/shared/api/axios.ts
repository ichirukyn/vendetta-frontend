import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const axiosInstance = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL}` })

export type AxiosErrorDataType = {
  status: string
  message: string
  code: number
}

const setModifiedError = (error: AxiosError): AxiosErrorDataType => {
  const data = error?.response?.data as AxiosErrorDataType

  if (data) {
    const message = Array.isArray(data.message) ? data.message.join(' ') : data.message
    return { message, status: data.status, code: error.status || 400 }
  }

  return { message: error.message, status: error.code || error.message || '', code: error.status || 400 }
}

axiosInstance.interceptors.request.use(
  config => {
    // const token = useTokenStore.getState().access
    // if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    // Handle request error
    const modifiedError = setModifiedError(error)
    toast(modifiedError.message, { hideProgressBar: true, type: 'error', position: 'bottom-left' })

    return Promise.reject(modifiedError)
  },
)
axiosInstance.interceptors.response.use(
  response => {
    // Do something with the response data
    return response
  },
  error => {
    // if (error.response.status === 401) {
    //   useTokenStore.getState().setIsInvalidToken(true)
    // }

    // Handle response error
    const modifiedError = setModifiedError(error)
    toast(modifiedError.message, { hideProgressBar: true, type: 'error', position: 'bottom-left' })

    return Promise.reject(modifiedError)
  },
)

export default axiosInstance
