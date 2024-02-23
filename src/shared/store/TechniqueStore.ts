import { TechniqueType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllTechnique } from "@/shared/api/technique";

interface TechniqueState {
  techniqueList: TechniqueType[]
  getTechniqueList: () => Promise<void>
  clearTechniqueList: () => void
}

export const useTechniqueStore = create<TechniqueState>((set) => ({
  techniqueList: [],
  getTechniqueList: async () => {
    const res = await fetchAllTechnique({ hidden: true })
    if (res.data) set({ techniqueList: res.data })
  },
  clearTechniqueList: () => set({ techniqueList: [] }),
}))
