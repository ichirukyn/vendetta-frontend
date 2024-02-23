import { RaceType } from "@/shared/types";
import { create } from 'zustand'
import { fetchAllRace } from "@/shared/api/race";

interface RaceState {
  raceList: RaceType[]
  getRaceList: () => Promise<void>
  clearRaceList: () => void
}

export const useRaceStore = create<RaceState>((set) => ({
  raceList: [],
  getRaceList: async () => {
    const res = await fetchAllRace()
    if (res.data) set({ raceList: res.data })
  },
  clearRaceList: () => set({ raceList: [] }),
}))
