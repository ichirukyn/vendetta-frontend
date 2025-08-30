import { create } from 'zustand'
import { createEntityStoreState, EntityStoreType } from '@/shared/utils'
import { ArenaType } from '@/entities'

type ArenaStoreType = EntityStoreType<ArenaType> & {}

export const useArenaStore = create<ArenaStoreType>(set => ({
  ...createEntityStoreState<ArenaType>()(set),
}))
