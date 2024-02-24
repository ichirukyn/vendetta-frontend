import { EnemyType } from '@/shared/types';
import { create } from 'zustand';
import { fetchAllEnemy } from '@/shared/api/enemy';

interface EnemyState {
  enemyList: EnemyType[]
  enemy?: EnemyType
  setEnemy: (enemy: EnemyType) => void
  getEnemyList: () => Promise<void>
  clearEnemyList: () => void
}

export const useEnemyStore = create<EnemyState>((set) => ({
  enemyList: [],
  enemy: undefined,
  getEnemyList: async () => {
    const res = await fetchAllEnemy()
    if (res.data) set({ enemyList: res.data })
  },
  setEnemy: (enemy) => set((state) => ({ ...state, enemy: enemy })),
  clearEnemyList: () => set((state) => ({ ...state, enemyList: [] })),
}))
