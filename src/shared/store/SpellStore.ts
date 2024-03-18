import { OptionsType, SpellType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllSpell } from "@/shared/api/spell";

interface SpellState {
  spellList: SpellType[]
  getSpellList: () => Promise<void>
  clearSpellList: () => void
  getSpellOption: () => OptionsType[]
}

export const useSpellStore = create<SpellState>((set, get) => ({
  spellList: [],
  getSpellList: async () => {
    const res = await fetchAllSpell({})
    if (res.data) set({ spellList: res.data })
  },
  getSpellOption: () => {
    const spell = get().spellList
    return spell.map((spell) => ({ label: spell.name, value: spell.id }))
  },
  clearSpellList: () => set({ spellList: [] }),
}))
