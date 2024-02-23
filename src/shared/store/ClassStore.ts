import { ClassType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllClass } from "@/shared/api/class";

interface ClassState {
  classList: ClassType[]
  getClassList: () => Promise<void>
  clearClassList: () => void
}

export const useClassStore = create<ClassState>((set) => ({
  classList: [],
  getClassList: async () => {
    const res = await fetchAllClass()
    if (res.data) set({ classList: res.data })
  },
  clearClassList: () => set({ classList: [] }),
}))
