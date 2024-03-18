import { AxiosResponse } from "axios";
import axiosInstance from "@/shared/api/axios";
import { SpellBranchType, SpellEffectType, SpellType } from "@/shared/types/spell";

type allSpellQueryType = {
  hidden?: boolean,
  race_id?: number
  class_id?: number,
  hero_id?: number,
}

export const fetchAllSpell = async ({ race_id, class_id, hidden, hero_id }: allSpellQueryType) => {
  const response: AxiosResponse<SpellType[]> = await axiosInstance.get(
    `/spell`,
    {
      params: { race_id, class_id, hidden, hero_id }
    }
  )
  
  return response
}

export const fetchOneSpell = async (spell_id: number) => {
  const response: AxiosResponse<SpellType> = await axiosInstance.get(
    `/spell/${ spell_id }`,
  )
  
  return response
}

export const createSpell = async (spell: SpellType) => {
  const response: AxiosResponse<SpellType> = await axiosInstance.post(
    `/spell`,
    { ...spell },
  )
  
  return response
}

export const updateSpell = async (spell: SpellType, spell_id: number) => {
  const response: AxiosResponse<SpellType> = await axiosInstance.put(
    `/spell/${ spell_id }`,
    { ...spell },
  )
  
  return response
}


// Effects
export const fetchAllSpellEffect = async (spell_id: number) => {
  const response: AxiosResponse<SpellType[]> = await axiosInstance.get(
    `/spell/${ spell_id }/effect`,
  )
  
  return response
}

export const createSpellEffect = async (effect: SpellEffectType, spell_id: number) => {
  const response: AxiosResponse<SpellType> = await axiosInstance.post(
    `/spell/${ spell_id }/effect`,
    { ...effect },
  )
  
  return response
}

export const updateSpellEffect = async (effect: SpellEffectType, effect_id: number, spell_id: number) => {
  const response: AxiosResponse<SpellType> = await axiosInstance.put(
    `/spell/${ spell_id }/effect/${ effect_id }`,
    { ...effect },
  )
  
  return response
}


export const deleteSpellEffect = async (effect_id: number, spell_id: number) => {
  const response: AxiosResponse<SpellType[]> = await axiosInstance.delete(
    `/spell/${ spell_id }/effect/${ effect_id }`,
  )
  
  return response
}


// Branch
export const fetchAllBranchSpell = async () => {
  const response: AxiosResponse<SpellBranchType[]> = await axiosInstance.get(
    `/spell/branch/`,
  )
  
  return response
}

export const fetchOneBranchSpell = async (branch_id: number) => {
  const response: AxiosResponse<SpellBranchType> = await axiosInstance.get(
    `/spell/branch/${ branch_id }`,
  )
  
  return response
}

export const createBranchSpell = async (data: SpellBranchType) => {
  const response: AxiosResponse<SpellBranchType> = await axiosInstance.post(
    `/spell/branch`,
    { ...data },
  )
  
  return response
}

export const updateBranchSpell = async (data: SpellBranchType, branch_id: number) => {
  const response: AxiosResponse<SpellBranchType> = await axiosInstance.put(
    `/spell/branch/${ branch_id }`,
    { ...data },
  )
  
  return response
}


export const deleteBranchSpell = async (branch_id: number) => {
  const response: AxiosResponse = await axiosInstance.delete(
    `/spell/branch/${ branch_id }`,
  )
  
  return response
}