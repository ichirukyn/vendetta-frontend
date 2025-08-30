import { queryKeys } from '@/shared/constant'
import { useEntityMutation, useEntityQuery } from '@/shared/utils'
import { createArena, deleteArena, fetchArena, fetchArenaList, updateArena, useArenaStore } from '@/entities'

export const useArenaQuery = (arenaId?: number) => {
  const setArena = useArenaStore(state => state.setEntity)
  const setArenaList = useArenaStore(state => state.setEntityList)

  const arenaFetchListQuery = useEntityQuery({
    keys: [queryKeys.arena.list],
    request: fetchArenaList,
    setter: setArenaList,
  })

  const arenaFetchQuery = useEntityQuery({
    keys: [queryKeys.arena.base, String(arenaId)],
    request: () => fetchArena({ id: arenaId as number }),
    setter: setArena,
    isEnableCheck: !!arenaId,
  })

  const arenaCreateQuery = useEntityMutation({
    invalidateKeys: queryKeys.arena.list,
    request: createArena,
  })

  const arenaUpdateQuery = useEntityMutation({
    invalidateKeys: [queryKeys.arena.base, queryKeys.arena.list],
    request: updateArena,
  })

  const arenaDeleteQuery = useEntityMutation({
    invalidateKeys: queryKeys.arena.list,
    request: deleteArena,
  })

  return {
    arenaFetchListQuery,
    arenaFetchQuery,
    arenaCreateQuery,
    arenaUpdateQuery,
    arenaDeleteQuery,
  }
}
