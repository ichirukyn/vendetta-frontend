import { queryKeys } from '@/shared/constant'
import { RequestDataType, useEntityMutation, useEntityQuery } from '@/shared/utils'
import {
  ArenaEnemyCreateType,
  ArenaEnemyUpdateType,
  createArenaEnemy,
  deleteArenaEnemy,
  fetchArenaEnemy,
  fetchArenaEnemyList,
  updateArenaEnemy,
  useArenaEnemyStore,
  useArenaStore,
} from '@/entities'

export const useArenaEnemyQuery = (ArenaEnemyId?: number) => {
  const arena = useArenaStore(state => state.entity)

  const setArenaEnemy = useArenaEnemyStore(state => state.setEntity)
  const setArenaEnemyList = useArenaEnemyStore(state => state.setEntityList)

  const ArenaEnemyFetchListQuery = useEntityQuery({
    keys: [queryKeys.arena.enemy.list],
    request: () => fetchArenaEnemyList({ id: arena?.id }),
    setter: setArenaEnemyList,
    isEnableCheck: !!arena?.id
  })

  const ArenaEnemyFetchQuery = useEntityQuery({
    keys: [queryKeys.arena.enemy.base, String(ArenaEnemyId)],
    request: () => fetchArenaEnemy({ id: arena?.id, second_id: ArenaEnemyId as number }),
    setter: setArenaEnemy,
    isEnableCheck: !!arena?.id && !!ArenaEnemyId
  })

  const ArenaEnemyCreateQuery = useEntityMutation({
    invalidateKeys: queryKeys.arena.enemy.list,
    request: (data: RequestDataType<ArenaEnemyCreateType>) => createArenaEnemy({ ...data, id: arena?.id }),
  })

  const ArenaEnemyUpdateQuery = useEntityMutation({
    invalidateKeys: [queryKeys.arena.enemy.base, queryKeys.arena.enemy.list],
    request: (data: RequestDataType<ArenaEnemyUpdateType>) => updateArenaEnemy({ ...data, id: arena?.id }),
  })

  const ArenaEnemyDeleteQuery = useEntityMutation({
    invalidateKeys: queryKeys.arena.enemy.list,
    request: (data: RequestDataType) => deleteArenaEnemy({ ...data, id: arena?.id }),
  })

  return {
    ArenaEnemyFetchListQuery,
    ArenaEnemyFetchQuery,
    ArenaEnemyCreateQuery,
    ArenaEnemyUpdateQuery,
    ArenaEnemyDeleteQuery,
  }
}
