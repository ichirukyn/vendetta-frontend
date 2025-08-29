import {ArenaType} from "@/shared/types";
import {create} from "zustand";

interface ArenaState {
  floorList: ArenaType[]
  floor?: ArenaType
  setFloor: (floor: ArenaType) => void
  setFloorList: (arenaList: ArenaType[]) => void
  clearArenaList: () => void
}

export const useArenaStore = create<ArenaState>((set) => ({
  floor: undefined,
  floorList: [],
  setFloor: (floor) => set({floor}),
  setFloorList: (floorList) => set({floorList}),
  clearArenaList: () => set({floorList: []}),
}))
