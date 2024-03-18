import { create } from "zustand";

type SpellFilterType = {
  type_damage?: string,
  name?: string
}

interface SpellFilter {
  filter: SpellFilterType
  setFilter: (val: SpellFilterType) => void
  clearFilter: () => void
}

const filterDefault: SpellFilterType = { type_damage: undefined, name: undefined }

export const useSpellFilter = create<SpellFilter>((set) => ({
  filter: filterDefault,
  setFilter: (filterValues) => set({ filter: filterValues }),
  clearFilter: () => set({ filter: filterDefault }),
}))
