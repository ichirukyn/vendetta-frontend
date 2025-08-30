import { EnemyType } from '@/shared/types'

export type ArenaEnemyType = {
  id: number
  enemy_id: number
  floor_id?: number
  team_id?: number
  enemy?: EnemyType
}

export type ArenaEnemyCreateType = Omit<ArenaEnemyType, 'id' | 'enemy'>

export type ArenaEnemyUpdateType = Partial<ArenaEnemyCreateType>
