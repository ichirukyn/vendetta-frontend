import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000
})

export type AxiosErrorDataType = {
  statusCode: string
  message: string
}

const setModifiedError = (error: AxiosError) => {
  const data = error?.response?.data as AxiosErrorDataType
  
  if (data) {
    const message = Array.isArray(data.message) ? data.message.join(' ') : data.message
    
    return { message, statusCode: data.statusCode }
  }
  
  return { message: error.message, statusCode: error.code }
}

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    // Handle request error
    const modifiedError = setModifiedError(error)
    toast(modifiedError.message, { hideProgressBar: true, type: 'error', position: 'bottom-left' })
    
    return Promise.reject(modifiedError)
  }
)
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response
  },
  (error) => {
    // Handle response error
    const modifiedError = setModifiedError(error)
    toast(modifiedError.message, { hideProgressBar: true, type: 'error', position: 'bottom-left' })
  }
)

export default axiosInstance