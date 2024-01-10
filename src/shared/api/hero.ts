import { AxiosResponse } from "axios";
import { HeroType } from "@/shared/types/hero";
import axiosInstance from "@/shared/api/axios";

export const fetchAllHero = async () => {
  const response: AxiosResponse<HeroType[]> = await axiosInstance.get(
    `/hero`,
  )
  
  return response
}

export const fetchOneHero = async (hero_id: number) => {
  const response: AxiosResponse<HeroType> = await axiosInstance.get(
    `/hero/${ hero_id }`,
  )
  
  return response
}

export const createHero = async (hero: HeroType) => {
  const response: AxiosResponse<HeroType> = await axiosInstance.post(
    `/hero`,
    { ...hero },
  )
  
  return response
}

export const updateHero = async (hero: HeroType, hero_id: number) => {
  const response: AxiosResponse<HeroType> = await axiosInstance.put(
    `/hero/${ hero_id }`,
    { ...hero },
  )
  
  return response
}
