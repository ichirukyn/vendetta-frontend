import { TeamType } from '@/shared/types';
import { create } from 'zustand';
import { fetchAllTeam } from '@/shared/api/team';

interface TeamState {
  teamList: TeamType[]
  team?: TeamType
  setTeam: (team: TeamType) => void
  getTeamList: () => Promise<void>
  clearTeamList: () => void
}

export const useTeamStore = create<TeamState>((set) => ({
  teamList: [],
  team: undefined,
  getTeamList: async () => {
    const res = await fetchAllTeam(true)
    if (res.data) set({ teamList: res.data })
  },
  setTeam: (team) => set((state) => ({ ...state, team: team })),
  clearTeamList: () => set((state) => ({ ...state, teamList: [] })),
}))
