import { SpellBranchType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllBranchSpell } from "@/shared/api/spell";

interface SpellBranchState {
  spellBranchList: SpellBranchType[]
  getSpellBranchList: () => Promise<void>
  clearSpellBranchList: () => void
}

export const useSpellBranchStore = create<SpellBranchState>((set, get) => ({
  spellBranchList: [],
  getSpellBranchList: async () => {
    const res = await fetchAllBranchSpell()
    if (res.data) set({ spellBranchList: res.data })
  },
  clearSpellBranchList: () => set({ spellBranchList: [] }),
}))
