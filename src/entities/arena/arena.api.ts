import axiosInstance from "@/shared/api/axios";
import {ArenaCreateType, ArenaType, ArenaUpdateType} from '@/entities'
import {RequestDataType, unwrapResponse} from "@/shared/utils";


export const createArena = async ({data}: RequestDataType<ArenaCreateType>): Promise<ArenaType> => {
  return await unwrapResponse(axiosInstance.post(`/arena`, data))
}

export const fetchArenaList = async (): Promise<ArenaType[]> => {
  return await unwrapResponse(axiosInstance.get('/arena'))
}

export const fetchArena = async ({id}: RequestDataType): Promise<ArenaType> => {
  return await unwrapResponse(axiosInstance.get(`/arena/${id}`))
}

export const updateArena = async ({id, data}: RequestDataType<ArenaUpdateType>): Promise<ArenaType> => {
  return await unwrapResponse(axiosInstance.put(`/arena/${id}`, data))
}

export const deleteArena = async ({id}: RequestDataType): Promise<boolean> => {
  return await unwrapResponse(axiosInstance.delete(`/arena/${id}`))
}
