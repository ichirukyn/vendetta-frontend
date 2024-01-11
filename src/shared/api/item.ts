import { AxiosResponse } from "axios";
import { ItemType } from "@/shared/types";
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
