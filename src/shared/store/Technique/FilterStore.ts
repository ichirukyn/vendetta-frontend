import { create } from "zustand";

type TechniqueFilterType = {
  race_id?: string,
  class_id?: string
}

interface RaceState {
  filter: TechniqueFilterType
  setFilter: (val: TechniqueFilterType) => void
  clearFilter: () => void
}

const filterDefault = { race_id: undefined, class_id: undefined }

export const useTechniqueFilter = create<RaceState>((set) => ({
  filter: filterDefault,
  setFilter: (filterValues) => set({ filter: filterValues }),
  clearFilter: () => set({ filter: filterDefault }),
}))
