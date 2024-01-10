import { AxiosResponse } from "axios";
import axiosInstance from "@/shared/api/axios";
import { TechniqueEffectType, TechniqueType } from "@/shared/types/technique";

export const fetchAllTechnique = async () => {
  const response: AxiosResponse<TechniqueType[]> = await axiosInstance.get(
    `/technique`,
  )
  
  return response
}

export const fetchOneTechnique = async (technique_id: number) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.get(
    `/technique/${ technique_id }`,
  )
  
  return response
}

export const createTechnique = async (technique: TechniqueType) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.post(
    `/technique`,
    { ...technique },
  )
  
  return response
}

export const updateTechnique = async (technique: TechniqueType, technique_id: number) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.put(
    `/technique/${ technique_id }`,
    { ...technique },
  )
  
  return response
}


// Effects
export const fetchAllTechniqueEffect = async (technique_id: number) => {
  const response: AxiosResponse<TechniqueType[]> = await axiosInstance.get(
    `/technique/${ technique_id }/effect`,
  )
  
  return response
}

export const createTechniqueEffect = async (effect: TechniqueEffectType, technique_id: number) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.post(
    `/technique/${ technique_id }/effect`,
    { ...effect },
  )
  
  return response
}

export const updateTechniqueEffect = async (effect: TechniqueEffectType, effect_id: number, technique_id: number) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.put(
    `/technique/${ technique_id }/effect/${ effect_id }`,
    { ...effect },
  )
  
  return response
}


export const deleteTechniqueEffect = async (effect_id: number, technique_id: number) => {
  const response: AxiosResponse<TechniqueType[]> = await axiosInstance.delete(
    `/technique/${ technique_id }/effect/${ effect_id }`,
  )
  
  return response
}