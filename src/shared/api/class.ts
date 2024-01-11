import { AxiosResponse } from "axios";
import { ClassType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllClass = async () => {
  const response: AxiosResponse<ClassType[]> = await axiosInstance.get(
    `/class`,
  )
  
  return response
}

export const fetchOneClass = async (class_id: number) => {
  const response: AxiosResponse<ClassType> = await axiosInstance.get(
    `/class/${ class_id }`,
  )
  
  return response
}

export const createClass = async (class_: ClassType) => {
  const response: AxiosResponse<ClassType> = await axiosInstance.post(
    `/class`,
    { ...class_ },
  )
  
  return response
}

export const updateClass = async (class_: ClassType, class_id: number) => {
  const response: AxiosResponse<ClassType> = await axiosInstance.put(
    `/class/${ class_id }`,
    { ...class_ },
  )
  
  return response
}
