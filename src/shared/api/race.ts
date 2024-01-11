import { AxiosResponse } from "axios";
import { ClassType, RaceType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllRace = async () => {
  const response: AxiosResponse<RaceType[]> = await axiosInstance.get(
    `/race`,
  )
  
  return response
}

export const fetchOneRace = async (race_id: number) => {
  const response: AxiosResponse<RaceType> = await axiosInstance.get(
    `/race/${ race_id }`,
  )
  
  return response
}

export const createRace = async (race: RaceType) => {
  const response: AxiosResponse<RaceType> = await axiosInstance.post(
    `/race`,
    { ...race },
  )
  
  return response
}

export const updateRace = async (race: RaceType, race_id: number) => {
  const response: AxiosResponse<RaceType> = await axiosInstance.put(
    `/race/${ race_id }`,
    { ...race },
  )
  
  return response
}


// Class

export const fetchAllClassByRace = async (race_id: number) => {
  const response: AxiosResponse<ClassType[]> = await axiosInstance.get(
    `/race/${ race_id }/class`,
  )
  
  return response
}
