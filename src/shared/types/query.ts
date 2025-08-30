import { AxiosError, AxiosResponse } from 'axios'

export type RequestOrderType = 'DESC' | 'ASC'

export type RequestPaginationType<T = string> = {
  order?: T
  skip?: number
  take?: number
}

export type ResponseType<T> = {
  status: 'success' | 'error'
  data: T
}

export type ResponseQueryType<T> = Promise<AxiosResponse<ResponseType<T>>>

export type RequestIdData<T> = {
  id: string
  data: T
}

export type ResponseErrorType = {
  error: string
}

export type ErrorType = AxiosError<ResponseErrorType>
