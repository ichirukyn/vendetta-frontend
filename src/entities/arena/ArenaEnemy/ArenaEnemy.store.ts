import { create } from 'zustand'
import { createEntityStoreState, EntityStoreType } from '@/shared/utils'
import { ArenaEnemyType } from '@/entities'

type ArenaEnemyStoreType = EntityStoreType<ArenaEnemyType> & {}

export const useArenaEnemyStore = create<ArenaEnemyStoreType>(set => ({
  ...createEntityStoreState<ArenaEnemyType>()(set),
}))
