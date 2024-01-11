import { AxiosResponse } from "axios";
import { EnemyType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllEnemy = async () => {
  const response: AxiosResponse<EnemyType[]> = await axiosInstance.get(
    `/enemy`,
  )
  
  return response
}

export const fetchOneEnemy = async (enemy_id: number) => {
  const response: AxiosResponse<EnemyType> = await axiosInstance.get(
    `/enemy/${ enemy_id }`,
  )
  
  return response
}

export const createEnemy = async (enemy: EnemyType) => {
  const response: AxiosResponse<EnemyType> = await axiosInstance.post(
    `/enemy`,
    { ...enemy },
  )
  
  return response
}

export const updateEnemy = async (enemy: EnemyType, enemy_id: number) => {
  const response: AxiosResponse<EnemyType> = await axiosInstance.put(
    `/enemy/${ enemy_id }`,
    { ...enemy },
  )
  
  return response
}
