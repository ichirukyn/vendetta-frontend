import { OptionsType, TechniqueType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllTechnique } from "@/shared/api/technique";

interface TechniqueState {
  techniqueList: TechniqueType[]
  getTechniqueList: () => Promise<void>
  clearTechniqueList: () => void
  getTechniqueOption: () => OptionsType[]
}

export const useTechniqueStore = create<TechniqueState>((set, get) => ({
  techniqueList: [],
  getTechniqueList: async () => {
    const res = await fetchAllTechnique({ hidden: true })
    if (res.data) set({ techniqueList: res.data })
  },
  getTechniqueOption: () => {
    const technique = get().techniqueList as TechniqueType[]
    return technique.map((technique) => ({ label: technique.name, value: technique.id }))
  },
  clearTechniqueList: () => set({ techniqueList: [] }),
}))
