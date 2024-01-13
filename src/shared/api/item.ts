import { AxiosResponse } from "axios";
import { EventTriggerType, ItemType } from "@/shared/types";
import axiosInstance from "@/shared/api/axios";

export const fetchAllItem = async () => {
  const response: AxiosResponse<ItemType[]> = await axiosInstance.get(
    `/item`,
  )
  
  return response
}

export const fetchOneItem = async (item_id: number) => {
  const response: AxiosResponse<ItemType> = await axiosInstance.get(
    `/item/${ item_id }`,
  )
  
  return response
}

export const createItem = async (item: ItemType) => {
  const response: AxiosResponse<ItemType> = await axiosInstance.post(
    `/item`,
    { ...item },
  )
  
  return response
}

export const updateItem = async (item: ItemType, item_id: number) => {
  const response: AxiosResponse<ItemType> = await axiosInstance.put(
    `/item/${ item_id }`,
    { ...item },
  )
  
  return response
}


// Trigger
export const fetchAllEventTrigger = async (event_id: number) => {
  const response: AxiosResponse<EventTriggerType[]> = await axiosInstance.get(
    `/event/${ event_id }/trigger`,
  )
  
  return response
}

export const fetchOneEventTrigger = async (event_id: number, trigger_id: number) => {
  const response: AxiosResponse<EventTriggerType> = await axiosInstance.get(
    `/event/${ event_id }/trigger/${ trigger_id }`,
  )
  
  return response
}

export const createEventTrigger = async (event: EventTriggerType, event_id: number) => {
  const response: AxiosResponse<EventTriggerType> = await axiosInstance.post(
    `/event/${ event_id }/trigger`,
    { ...event },
  )
  
  return response
}

export const updateEventTrigger = async (event: EventTriggerType, event_id: number, trigger_id: number) => {
  const response: AxiosResponse<EventTriggerType> = await axiosInstance.put(
    `/event/${ event_id }/trigger/${ trigger_id }`,
    { ...event },
  )
  
  return response
}

export const deleteEventTrigger = async (event_id: number, trigger_id: number) => {
  const response: AxiosResponse<boolean> = await axiosInstance.delete(
    `/event/${ event_id }/trigger/${ trigger_id }`
  )
  
  return response
}
