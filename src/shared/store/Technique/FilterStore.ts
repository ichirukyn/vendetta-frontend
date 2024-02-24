import { create } from "zustand";

type TechniqueFilterType = {
  race_id?: number,
  class_id?: number
}

interface RaceState {
  filter: TechniqueFilterType
  setFilter: (val: TechniqueFilterType) => void
  clearFilter: () => void
}

const filterDefault = { race_id: 0, class_id: 0 }

export const useTechniqueFilter = create<RaceState>((set) => ({
  filter: filterDefault,
  setFilter: (filterValues) => set({ filter: filterValues }),
  clearFilter: () => set({ filter: filterDefault }),
}))
