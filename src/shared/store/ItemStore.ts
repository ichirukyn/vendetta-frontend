import { create } from 'zustand'
import { ItemType, OptionsType } from "@/shared/types";
import { fetchAllItem } from "@/shared/api/item";

interface ItemState {
  itemList: ItemType[]
  getItemList: () => Promise<void>
  clearItemList: () => void
  getItemOption: () => OptionsType[]
}

export const useItemStore = create<ItemState>((set, get) => ({
  itemList: [],
  getItemList: async () => {
    const res = await fetchAllItem()
    if (res.data) set({ itemList: res.data })
  },
  getItemOption: () => {
    const items = get().itemList
    return items.map((item) => ({ label: item.name, value: item.id }))
  },
  clearItemList: () => set({ itemList: [] }),
}))
