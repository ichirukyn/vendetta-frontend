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

export const createTechniqueEffect = async (effect: TechniqueEffectType, technique_id: number) => {
  const response: AxiosResponse<TechniqueType> = await axiosInstance.post(
    `/technique/${ technique_id }/effect`,
    { ...effect },
  )
  
  return response
}