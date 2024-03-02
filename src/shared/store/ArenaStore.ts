import { ArenaType } from "@/shared/types";
import { create } from "zustand";
import { fetchAllArena } from "@/shared/api/arena";

interface ArenaState {
  floorList: ArenaType[]
  floor?: ArenaType
  setFloor: (floor: ArenaType) => void
  getArenaList: () => Promise<void>
  clearArenaList: () => void
}

export const useArenaStore = create<ArenaState>((set) => ({
  floorList: [],
  floor: undefined,
  getArenaList: async () => {
    const res = await fetchAllArena()
    if (res.data) {
      set((state) => {
        let floor = state.floor
        if (state.floor) {
          floor = res.data.find((floor) => floor.id === state.floor)
        }
        
        return { floorList: res.data, floor: floor }
      })
    }
  },
  setFloor: (floor) => set((state) => ({ ...state, floor: floor })),
  clearArenaList: () => set((state) => ({ ...state, floorList: [] })),
}))
