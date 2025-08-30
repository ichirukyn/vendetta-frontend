import {AxiosResponse} from "axios";

export type QueryFnType<T, F> = (
  queryCallback: (data: F) => Promise<AxiosResponse<T>>, // Асинхронная функция запроса
  setCallback: (data: T) => void, // Функция для сохранения данных в Zustand
  queryData: F
) => Promise<T | undefined> // Возвращаемые данные или undefined в случае ошибки

// Обёртка для queryFn
export const queryFn = <T, F>(queryCallback: (data: F) => Promise<AxiosResponse<T>>, setCallback: (data: T) => void, queryData: F): Promise<T | undefined> => {
  return queryCallback(queryData)
    .then((res) => {
      if (res.status !== 200) {
        console.error('Query Error ', res.status)
        return undefined
      }

      if (res.status === 200 && res.data) {
        setCallback(res.data) // Сохраняем данные в Zustand
        return res.data
      }
      return undefined
    })
    .catch((error) => {
      console.error('Request failed', error)
      return undefined
    })
}
