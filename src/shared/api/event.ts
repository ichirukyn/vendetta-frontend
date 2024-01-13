import { AxiosResponse } from "axios";
import { EventType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllEvent = async () => {
  const response: AxiosResponse<EventType[]> = await axiosInstance.get(
    `/event`,
  )
  
  return response
}

export const fetchOneEvent = async (event_id: number) => {
  const response: AxiosResponse<EventType> = await axiosInstance.get(
    `/event/${ event_id }`,
  )
  
  return response
}

export const createEvent = async (event: EventType) => {
  const response: AxiosResponse<EventType> = await axiosInstance.post(
    `/event`,
    { ...event },
  )
  
  return response
}

export const updateEvent = async (event: EventType, event_id: number) => {
  const response: AxiosResponse<EventType> = await axiosInstance.put(
    `/event/${ event_id }`,
    { ...event },
  )
  
  return response
}
