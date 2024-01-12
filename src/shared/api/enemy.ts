import { AxiosResponse } from "axios";
import { EnemyStatsType, EnemyTechniqueType, EnemyType, EnemyWeaponType, TechniqueType } from "@/shared/types";
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


// Stats
export const fetchEnemyStats = async (enemy_id: number) => {
  const response: AxiosResponse<EnemyStatsType> = await axiosInstance.get(
    `/enemy/${ enemy_id }/stats`,
  )
  
  return response
}

export const createEnemyStats = async (enemy: EnemyStatsType, enemy_id: number) => {
  const response: AxiosResponse<EnemyStatsType> = await axiosInstance.post(
    `/enemy/${ enemy_id }/stats`,
    { ...enemy },
  )
  
  return response
}

export const updateEnemyStats = async (enemy: EnemyStatsType, enemy_id: number) => {
  const response: AxiosResponse<EnemyStatsType> = await axiosInstance.put(
    `/enemy/${ enemy_id }/stats`,
    { ...enemy },
  )
  
  return response
}


// Weapon
export const fetchEnemyWeapon = async (enemy_id: number) => {
  const response: AxiosResponse<EnemyWeaponType> = await axiosInstance.get(
    `/enemy/${ enemy_id }/weapon`,
  )
  
  return response
}

export const createEnemyWeapon = async (enemy: EnemyWeaponType, enemy_id: number) => {
  const response: AxiosResponse<EnemyWeaponType> = await axiosInstance.post(
    `/enemy/${ enemy_id }/weapon`,
    { ...enemy },
  )
  
  return response
}

export const updateEnemyWeapon = async (enemy: EnemyWeaponType, enemy_id: number) => {
  const response: AxiosResponse<EnemyWeaponType> = await axiosInstance.put(
    `/enemy/${ enemy_id }/weapon`,
    { ...enemy },
  )
  
  return response
}


// Technique
export const fetchAllEnemyTechnique = async (enemy_id: number) => {
  const response: AxiosResponse<EnemyTechniqueType[]> = await axiosInstance.get(
    `/enemy/${ enemy_id }/technique`,
  )
  
  return response
}

export const fetchOneEnemyTechnique = async (enemy_id: number, technique_id: number) => {
  const response: AxiosResponse<EnemyTechniqueType> = await axiosInstance.get(
    `/enemy/${ enemy_id }/technique/${ technique_id }`,
  )
  
  return response
}

export const createEnemyTechnique = async (enemy: EnemyTechniqueType, enemy_id: number) => {
  const response: AxiosResponse<EnemyTechniqueType> = await axiosInstance.post(
    `/enemy/${ enemy_id }/technique`,
    { ...enemy },
  )
  
  return response
}

export const updateEnemyTechnique = async (enemy: EnemyTechniqueType, enemy_id: number, technique_id: number) => {
  const response: AxiosResponse<EnemyTechniqueType> = await axiosInstance.put(
    `/enemy/${ enemy_id }/technique/${ technique_id }`,
    { ...enemy },
  )
  
  return response
}


export const deleteEnemyTechnique = async (enemy_id: number, technique_id: number) => {
  const response: AxiosResponse<TechniqueType[]> = await axiosInstance.delete(
    `/enemy/${ enemy_id }/technique/${ technique_id }`,
  )
  
  return response
}