import axiosInstance from '@/shared/api/axios.ts'
import { ArenaEnemyCreateType, ArenaEnemyType, ArenaEnemyUpdateType } from '@/entities'
import { RequestDataType, unwrapResponse } from '@/shared/utils'

export const createArenaEnemy = async ({ data, id }: RequestDataType<ArenaEnemyCreateType>): Promise<ArenaEnemyType> => {
  return await unwrapResponse(axiosInstance.post(`/arena/${id}/enemy`, data))
}

export const fetchArenaEnemyList = async ({ id }: RequestDataType): Promise<ArenaEnemyType[]> => {
  return await unwrapResponse(axiosInstance.get(`/arena/${id}/enemy`))
}

export const fetchArenaEnemy = async ({ id, second_id }: RequestDataType): Promise<ArenaEnemyType> => {
  return await unwrapResponse(axiosInstance.get(`/arena/${id}/enemy/${second_id}`))
}

export const updateArenaEnemy = async ({ id, data, second_id }: RequestDataType<ArenaEnemyUpdateType>): Promise<ArenaEnemyType> => {
  return await unwrapResponse(axiosInstance.put(`/arena/${id}/enemy/${second_id}`, data))
}

export const deleteArenaEnemy = async ({ id, second_id }: RequestDataType): Promise<boolean> => {
  return await unwrapResponse(axiosInstance.delete(`/arena/${id}/enemy/${second_id}`))
}
