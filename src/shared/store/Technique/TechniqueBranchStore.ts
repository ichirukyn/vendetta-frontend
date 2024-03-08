import { TechniqueBranchType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllBranchTechnique } from "@/shared/api/technique";

interface TechniqueBranchState {
  techniqueBranchList: TechniqueBranchType[]
  getTechniqueBranchList: () => Promise<void>
  clearTechniqueBranchList: () => void
}

export const useTechniqueBranchStore = create<TechniqueBranchState>((set, get) => ({
  techniqueBranchList: [],
  getTechniqueBranchList: async () => {
    const res = await fetchAllBranchTechnique()
    if (res.data) set({ techniqueBranchList: res.data })
  },
  clearTechniqueBranchList: () => set({ techniqueBranchList: [] }),
}))
