import { EnemyTeamType } from '@/shared/types';
import { create } from 'zustand';
import { fetchAllTeamEnemy } from "@/shared/api/team";

interface EnemyTeamState {
  enemyTeamList: EnemyTeamType[]
  enemyTeam?: EnemyTeamType
  setEnemyTeam: (enemyTeam: EnemyTeamType) => void
  getEnemyTeamList: (team_id: number) => Promise<void>
}

export const useEnemyTeamStore = create<EnemyTeamState>((set) => ({
  enemyTeamList: [],
  enemyTeam: undefined,
  getEnemyTeamList: async (team_id: number) => {
    const res = await fetchAllTeamEnemy(team_id)
    if (res.data) set({ enemyTeamList: res.data })
  },
  setEnemyTeam: (enemyTeam) => set((state) => ({ ...state, enemyTeam: enemyTeam })),
}))
