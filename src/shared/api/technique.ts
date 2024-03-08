import { AxiosResponse } from "axios";
import axiosInstance from "@/shared/api/axios";
import { TechniqueBranchType, TechniqueEffectType, TechniqueType } from "@/shared/types/technique";

type allTechniqueQueryType = {
  hidden?: boolean,
  race_id?: number
  class_id?: number,
  hero_id?: number,
}

export const fetchAllTechnique = async ({ race_id, class_id, hidden, hero_id }: allTechniqueQueryType) => {
  const response: AxiosResponse<TechniqueType[]> = await axiosInstance.get(
    `/technique`,
    {
      params: { race_id, class_id, hidden, hero_id }
    }
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


// Branch
export const fetchAllBranchTechnique = async () => {
  const response: AxiosResponse<TechniqueBranchType[]> = await axiosInstance.get(
    `/technique/branch/`,
  )
  
  return response
}

export const fetchOneBranchTechnique = async (branch_id: number) => {
  const response: AxiosResponse<TechniqueBranchType> = await axiosInstance.get(
    `/technique/branch/${ branch_id }`,
  )
  
  return response
}

export const createBranchTechnique = async (data: TechniqueBranchType) => {
  const response: AxiosResponse<TechniqueBranchType> = await axiosInstance.post(
    `/technique/branch`,
    { ...data },
  )
  
  return response
}

export const updateBranchTechnique = async (data: TechniqueBranchType, branch_id: number) => {
  const response: AxiosResponse<TechniqueBranchType> = await axiosInstance.put(
    `/technique/branch/${ branch_id }`,
    { ...data },
  )
  
  return response
}


export const deleteBranchTechnique = async (branch_id: number) => {
  const response: AxiosResponse = await axiosInstance.delete(
    `/technique/branch/${ branch_id }`,
  )
  
  return response
}