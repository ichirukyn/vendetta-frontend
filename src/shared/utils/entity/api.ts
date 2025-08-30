import { RequestErrorType } from '@/shared/utils'
import { AxiosErrorDataType } from '@/shared/api'
import {ResponseQueryType} from "@/shared/types";

export const unwrapResponse = async <T>(promise: ResponseQueryType<T>, errorConfig?: RequestErrorType<T>): Promise<T> => {
  try {
    const response = await promise

    if (!response?.status) throw new Error('Error response')

    return response?.data as T // Уменьшаем вложенность 'data'
  } catch (e) {
    const error = e as AxiosErrorDataType

    // Игнорируем исключенные коды
    if (error?.code >= 300 && errorConfig?.exclude?.includes(error?.code)) return null as T

    // Все остальные ошибки пробрасываем дальше
    throw error
  }
}
