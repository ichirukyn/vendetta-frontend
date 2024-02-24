import { AxiosResponse } from "axios";
import { ArenaType, FloorEnemyType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllArena = async () => {
  const response: AxiosResponse<ArenaType[]> = await axiosInstance.get(
    `/arena`,
  )
  
  return response
}

export const fetchOneArena = async (arena_id: number) => {
  const response: AxiosResponse<ArenaType> = await axiosInstance.get(
    `/arena/${ arena_id }`,
  )
  
  return response
}

export const createArena = async (arena: ArenaType) => {
  const response: AxiosResponse<ArenaType> = await axiosInstance.post(
    `/arena`,
    { ...arena },
  )
  
  return response
}

export const updateArena = async (arena: ArenaType, arena_id: number) => {
  const response: AxiosResponse<ArenaType> = await axiosInstance.put(
    `/arena/${ arena_id }`,
    { ...arena },
  )
  
  return response
}

export const deleteArena = async (arena_id: number) => {
  const response: AxiosResponse<ArenaType> = await axiosInstance.delete(
    `/arena/${ arena_id }`,
  )
  
  return response
}


// FloorEnemy
export const fetchAllArenaEnemy = async (arena_id: number) => {
  const response: AxiosResponse<FloorEnemyType[]> = await axiosInstance.get(
    `/arena/${ arena_id }`,
  )
  
  return response
}

export const fetchOneArenaEnemy = async (arena_id: number, enemy_id: number) => {
  const response: AxiosResponse<FloorEnemyType> = await axiosInstance.get(
    `/arena/${ arena_id }/enemy/${ enemy_id }`,
  )
  
  return response
}

export const createArenaEnemy = async (arena_id: number, enemy: FloorEnemyType) => {
  const response: AxiosResponse<FloorEnemyType> = await axiosInstance.post(
    `/arena/${ arena_id }/enemy`,
    { ...enemy },
  )
  
  return response
}

export const updateArenaEnemy = async (arena_id: number, enemy_id: number, enemy: FloorEnemyType) => {
  const response: AxiosResponse<FloorEnemyType> = await axiosInstance.put(
    `/arena/${ arena_id }/enemy/${ enemy_id }`,
    { ...enemy },
  )
  
  return response
}

export const deleteArenaEnemy = async (arena_id: number, enemy_id: number) => {
  const response: AxiosResponse<FloorEnemyType> = await axiosInstance.delete(
    `/arena/${ arena_id }/enemy/${ enemy_id }`,
  )
  
  return response
}
