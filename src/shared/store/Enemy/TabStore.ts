import { create } from 'zustand';

interface EnemyTabState {
  tabIndex: number
  setTabIndex: (tabIndex: number) => void
}

export const useEnemyTabStore = create<EnemyTabState>((set) => ({
  tabIndex: 0,
  setTabIndex: (tabIndex) => set((state) => ({ ...state, tabIndex: tabIndex })),
}))
